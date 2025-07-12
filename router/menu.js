const express = require('express');
const router = express.Router();
const Menu = require('../models/Menu');
const mongoose = require('mongoose');
router.post('/addmenu', async (req, res) => {
  try {
    const { name, price, description, image, restaurantId } = req.body;

    const newMenu = new Menu({
      name,
      price,
      description,
      image,
      restaurantId
    });

    const savedMenu = await newMenu.save();
    res.status(201).json(savedMenu);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add menu' });
  }
});
// ========== GET MENU FOR A RESTAURANT ==========
router.get('/:restaurantId', async (req, res) => {
  const { restaurantId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(restaurantId)) {
    return res.status(400).json({ message: 'Invalid restaurantId format' });
  }

  try {
    const menus = await Menu.find({ restaurantId });
    res.status(200).json(menus);
  } catch (error) {
    console.error('Error fetching menu:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});
// GET all menus with restaurant details
router.get('/admin/menus', async (req, res) => {
  try {
    const menus = await Menu.find().populate('restaurant', 'name');
    res.status(200).json(menus);
  } catch (error) {
    console.error('Error fetching menus:', error);
    res.status(500).json({ error: 'Failed to fetch menus' });
  }
});

router.delete('/admin/menus/:id', async (req, res) => {
  try {
    const deletedMenu = await Menu.findByIdAndDelete(req.params.id);
    if (!deletedMenu) {
      return res.status(404).json({ error: 'Menu not found' });
    }
    res.status(200).json({ message: 'Menu deleted successfully' });
  } catch (error) {
    console.error('Error deleting menu:', error);
    res.status(500).json({ error: 'Failed to delete menu' });
  }
});

module.exports = router;
