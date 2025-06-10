require('dotenv').config();
const axios = require('axios');
const nodemailer = require('nodemailer');
const cron = require('node-cron');
const mongoose = require('mongoose');
const User = require('./models/User'); 

const { WAQI_API_TOKEN, EMAIL_USER, EMAIL_PASS, MONGO_URI } = process.env;

const AQI_THRESHOLDS = {
    notifyUsers: 100, 
    notifyAuthorities: 150, 
};

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB."))
    .catch(err => console.error("MongoDB connection error:", err));

async function fetchAirQuality(lat, lon) {
    const apiUrl = `https://api.waqi.info/feed/geo:${lat};${lon}/?token=${WAQI_API_TOKEN}`;
    try {
        const response = await axios.get(apiUrl);
        const data = response.data.data;
        return {
            aqi: data.aqi,
            location: data.city.name,
        };
    } catch (error) {
        console.error("Error fetching air quality data:", error.message);
        return null;
    }
}

function evaluateAirQuality(aqi) {
    if (aqi >= AQI_THRESHOLDS.notifyAuthorities) {
        return "critical";
    } else if (aqi >= AQI_THRESHOLDS.notifyUsers) {
        return "alert";
    } else {
        return "safe";
    }
}

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
    },
});

function sendEmail(to, subject, htmlContent) {
    const mailOptions = {
        from: EMAIL_USER, 
        to,               
        subject,          
        html: htmlContent 
    };

    return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error("Error sending email:", error.message);
                reject(error); 
            } else {
                console.log("Email sent successfully:", info.response);
                resolve(info); 
            }
        });
    });
}


function notifyUsers(userEmail, aqi, location) {
    const tips = [
        "Limit outdoor activities, especially strenuous exercise.",
        "Use an N95 mask if you need to go outside.",
        "Keep windows and doors closed to prevent indoor air pollution.",
        "Use an air purifier to maintain better indoor air quality.",
    ];

    const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 20px auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px; background-color: #f9f9f9;">
        <h2 style="text-align: center; color: #d9534f;">🌬️ BreatheSafe Alert</h2>
        <p style="font-size: 16px; color: #333;">
            <strong>Attention:</strong> BreatheSafe has detected a spike in air pollution levels in your area.
        </p>
        <div style="background-color: #d9534f; color: #fff; padding: 10px; border-radius: 5px; text-align: center; margin: 20px 0;">
            <h3 style="margin: 0;">Air Quality Index (AQI): ${aqi}</h3>
            <p style="margin: 0; font-size: 14px;">Location: ${location}</p>
        </div>
        <p style="font-size: 16px; color: #333;">
            This AQI level indicates unhealthy air quality. It is strongly advised to take precautions to minimize exposure to pollution.
        </p>
        <h4 style="color: #5cb85c; margin-top: 20px;">🚨 Tips to Stay Safe:</h4>
        <ul style="font-size: 14px; color: #555; line-height: 1.5;">
            ${tips.map(tip => `<li>${tip}</li>`).join('')}
        </ul>
        <hr style="margin: 20px 0; border: none; border-top: 1px solid #e0e0e0;" />
        <p style="font-size: 14px; color: #666; text-align: center;">
            Stay informed and stay safe with <strong>BreatheSafe</strong>. Together, we can combat air pollution.
        </p>
        <p style="font-size: 12px; color: #999; text-align: center;">
            Need more details? Visit <a href="https://github.com/Krishna27Singh/airify" style="color: #337ab7;">BreatheSafe</a>.
        </p>
    </div>
    `;

    return sendEmail(userEmail, "🌬️ BreatheSafe Alert: AQI Spike Detected", htmlContent);
}


function notifyAuthorities(aqi, location) {
    const message = `🚨 Critical Air Quality Alert: AQI in ${location} has reached ${aqi}. Immediate action is required.`;
    return sendEmail("ccb.cpcb@nic.in", "Critical Air Quality Alert", message);
}

cron.schedule('0 */6 * * *', async () => {
    console.log("Starting AQI checks...");

    try {
        const users = await User.find({});
        console.log(`Found ${users.length} users.`);

        for (const user of users) {
            const { email, location } = user;
            const { latitude, longitude } = location || {};

            console.log(`Processing user: ${email}, Location: ${latitude}, ${longitude}`);

            if (!latitude || !longitude) {
                console.error(`Invalid location for user: ${email}`);
                continue;
            }

            const aqiData = await fetchAirQuality(latitude, longitude);
            if (!aqiData) {
                console.log(`No AQI data for user: ${email}`);
                continue;
            }

            const { aqi, location: locationName } = aqiData;
            console.log(`AQI data for ${email}: AQI=${aqi}, Location=${locationName}`);

            const airQualityStatus = evaluateAirQuality(aqi);
            if (airQualityStatus === "alert") {
                await notifyUsers(email, aqi, locationName);
            } else if (airQualityStatus === "critical") {
                await notifyAuthorities(aqi, locationName);
                await notifyUsers(email, aqi, locationName);
            }
        }
    } catch (error) {
        console.error("Error during AQI checks:", error.message);
    }
});
