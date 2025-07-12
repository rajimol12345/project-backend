const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true }, // changed to Number
  description: { type: String, required: true },
  image: { type: String, required: true }, // base64
  restaurantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant',
    required: true,
  }
}, { timestamps: true });

module.exports = mongoose.model('Menu', menuSchema);
