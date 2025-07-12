const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  phone: {
    type: String,
    match: /^[0-9]{10,15}$/,
  },
  password: {
    type: String,
    required: true,
  },
  profilePic: {
    type: String, // base64 image string or URL
    default: '',
  },
  deliveryAddress: {
    type: String,
    default: '',
    trim: true,
  }
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
