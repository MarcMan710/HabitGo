// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  // You can add more user-related fields here, such as:
  // profilePicture: { type: String, default: '' },
  // bio: { type: String, default: '' },
  // settings: { type: Object, default: {} },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
