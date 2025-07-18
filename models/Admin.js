const mongoose = require('mongoose');

const RestaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  address: {
    type: String,
    required: true,
    trim: true
  },
  phone: {
    type: String,
    required: true,
    match: /^[0-9]{10,15}$/
  },
  cuisine: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    match: /^\S+@\S+\.\S+$/
  },
  openingHours: {
    type: String,
    required: true,
    trim: true
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    default: 4
  },
  image: {
    type: String, // base64 or image URL
    default: ''
  }
}, { timestamps: true });

module.exports = mongoose.model('Restaurant', RestaurantSchema);
