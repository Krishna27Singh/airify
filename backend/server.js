const app = require("./app");
const connectDB = require("./config/db");

const PORT = process.env.PORT || 8000;


const bodyParser = require('body-parser');
const User = require('./models/User'); 
const axios = require('axios');
const cron = require('node-cron');
const nodemailer = require('nodemailer');
const passport = require('passport');
const session = require('express-session');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const cors = require('cors');
require('dotenv').config();
const authRoute = require('./routes/auth');
require('./config/passport'); 
const reportRoutes = require('./routes/reportRoutes');

app.use(cors({
  origin: 'http://localhost:8080', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

connectDB();

app.use(session({
  secret: process.env.COOKIE_KEY || "Sj7h2vF9gD*sk@1L!x9v3QeXlA0tZqBz",
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 24 * 60 * 60 * 1000 } 
}));

app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());


app.use('/auth', authRoute);
app.use('/api', reportRoutes);

async function getAQIData(lat, lon) {
  const waqiApiToken = process.env.WAQI_API_TOKEN;
  const url = `https://api.waqi.info/feed/geo:${lat};${lon}/?token=${waqiApiToken}`;

  try {
      const response = await axios.get(url);
      if (response.data.status === 'ok') {
          return response.data.data;
      } else {
          throw new Error('Failed to fetch AQI data');
      }
  } catch (error) {
      console.error('Error fetching AQI data:', error.message);
      return null;
  }
}

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
  },
});

async function sendEmail(user, aqiData) {
  const {
    aqi,
    dominentpol,
    iaqi,
    city,
    forecast,
    time,
    attributions,
    debug,
  } = aqiData;

  const iaqiDetails = Object.entries(iaqi || {})
    .map(([pollutant, data]) => `<li><strong>${pollutant.toUpperCase()}:</strong> ${data.v || "N/A"}</li>`)
    .join("");

  const weatherDetails = iaqi.temp
    ? `<p><strong>Temperature:</strong> ${iaqi.temp.v} °C</p>`
    : `<p><strong>Temperature:</strong> Not available</p>`;
  const humidityDetails = iaqi.h
    ? `<p><strong>Humidity:</strong> ${iaqi.h.v}%</p>`
    : `<p><strong>Humidity:</strong> Not available</p>`;
  const pressureDetails = iaqi.p
    ? `<p><strong>Pressure:</strong> ${iaqi.p.v} hPa</p>`
    : `<p><strong>Pressure:</strong> Not available</p>`;
  const windDetails = iaqi.w
    ? `<p><strong>Wind:</strong> ${iaqi.w.v} m/s</p>`
    : `<p><strong>Wind:</strong> Not available</p>`;

  const forecastDetails = forecast?.daily
    ? Object.entries(forecast.daily)
        .map(([pollutant, data]) => {
          const pollutantForecast = data
            .map(
              (entry) =>
                `<li>${entry.day}: <strong>Min:</strong> ${entry.min}, <strong>Max:</strong> ${entry.max}</li>`
            )
            .join("");
          return `<li><strong>${pollutant.toUpperCase()}</strong>: <ul>${pollutantForecast}</ul></li>`;
        })
        .join("")
    : "<p>No forecast data available.</p>";

  const emailBody = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #ddd; padding: 20px; border-radius: 10px;">
      <h1 style="color: #4CAF50; text-align: center;">🌍 Daily Air Quality Report</h1>
      <p>Hi <strong>${user.name}</strong>,</p>
      <p>Here is your daily air quality update for your location: <strong>${city?.name || "Unknown Location"}</strong>.</p>

      <h2 style="color: #FF5722;">Current AQI</h2>
      <p><strong>AQI:</strong> ${aqi}</p>
      <p><strong>Dominant Pollutant:</strong> ${dominentpol || "Unknown"}</p>

      <h2 style="color: #2196F3;">Individual Pollutants</h2>
      <ul style="list-style: none; padding: 0;">
        ${iaqiDetails || "<li>No data available</li>"}
      </ul>

      <h2 style="color: #9C27B0;">Weather Details</h2>
      ${weatherDetails}
      ${humidityDetails}
      ${pressureDetails}
      ${windDetails}

      <h2 style="color: #009688;">Forecast</h2>
      <ul style="list-style: none; padding: 0;">
        ${forecastDetails}
      </ul>

      <p><strong>Data Time:</strong> ${time?.s || "Unknown"}</p>
      <p style="font-size: 12px; color: gray;">Stay safe and take necessary precautions if the air quality is poor. 💨</p>
      <hr>
      <footer style="text-align: center; font-size: 12px; color: gray;">
        Sent by Airify - Your Personal AQI Assistant
        <br>
        <p>Source: ${attributions?.map(attr => attr.url).join(", ") || "Not Available"}</p>
      </footer>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: '🌍 Your Daily Air Quality and Weather Report',
      html: emailBody,
    });
    console.log(`Email sent to ${user.email}`);
  } catch (error) {
    console.error(`Error sending email to ${user.email}:`, error.message);
  }
}


cron.schedule('30 11 * * *', async () => {
  console.log('Cron job triggered at', new Date().toLocaleString());
  const users = await User.find();
  console.log('Users fetched for AQI email:', users);

  for (const user of users) {
      const { latitude, longitude } = user.location || {};
      console.log(`Processing user: ${user.email}, Location: ${latitude}, ${longitude}`);

      if (!latitude || !longitude) {
          console.error(`Invalid location for user: ${user.email}`);
          continue;
      }

      try {
          const aqiData = await getAQIData(latitude, longitude);
          if (!aqiData) {
              console.log(`No AQI data for user: ${user.email}`);
              continue;
          }

          console.log(`AQI data for ${user.email}:`, aqiData);
          await sendEmail(user, aqiData);
      } catch (error) {
          console.error(`Error processing user ${user.email}:`, error);
      }
  }
});




app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
