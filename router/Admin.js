const express = require('express');
const router = express.Router();
const Restaurant = require('../models/Restaurant');
router.post('/restaurants', async (req, res) => {
  try {
    const {
      name,
      address,
      phone,
      cuisine,
      email,
      openingHours,
      rating,
      image
    } = req.body;

    if (!name || !address || !phone || !cuisine || !email || !openingHours || !rating) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newRestaurant = new Restaurant({
      name,
      address,
      phone,
      cuisine,
      email,
      openingHours,
      rating,
      image
    });

    const savedRestaurant = await newRestaurant.save();
    res.status(201).json(savedRestaurant);
  } catch (err) {
    console.error('Error adding restaurant:', err);
    res.status(500).json({ message: 'Server error while adding restaurant' });
  }
});
router.get('/list', async (req, res) => {
  try {
    const restaurants = await Restaurant.find().sort({ createdAt: -1 });
    res.json(restaurants);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch restaurants' });
  }
});
router.get('/list/:id', async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) return res.status(404).json({ message: 'Not found' });
    res.json(restaurant);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching restaurant' });
  }
});
module.exports = router;
