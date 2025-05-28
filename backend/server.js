const app = require("./app");
const connectDB = require("./config/db");

const PORT = 1000;

connectDB();

const passport = require('passport');
const session = require('express-session');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const cors = require('cors');
require('dotenv').config();
const authRoute = require('./routes/auth');
require('./config/passport'); 


connectDB();

app.use(session({
  secret: process.env.COOKIE_KEY || "Sj7h2vF9gD*sk@1L!x9v3QeXlA0tZqBz",
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 24 * 60 * 60 * 1000 } // 1 day
}));


app.use(cors({
  origin: process.env.CLIENT_URL,
  methods: 'GET,POST,PUT,DELETE',
  credentials: true
}));

app.use(passport.initialize());
app.use(passport.session());


app.use('/auth', authRoute);


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
