const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  age: { type: Number, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  location: {latitude: Number, longitude: Number,},
});

module.exports = mongoose.model("User", UserSchema);
