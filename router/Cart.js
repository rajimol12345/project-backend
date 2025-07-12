// backend/routes/cartRoutes.js
const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart'); // your cart model

// Get cart by userId
router.get('/cart/:userId', async (req, res) => {
  try {
    const items = await Cart.find({ userId: req.params.userId }).populate('menuId');
    res.status(200).json(items);
  } catch (error) {
    console.error('Error fetching cart:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete a cart item
router.delete('/cart/item/:id', async (req, res) => {
  try {
    const deleted = await Cart.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Item not found' });
    res.status(200).json({ message: 'Item removed' });
  } catch (error) {
    console.error('Error removing cart item:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
