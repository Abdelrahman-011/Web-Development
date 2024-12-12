const express = require('express');
const router = express.Router();
const { addToCart, getCartItems } = require('../controllers/cartController');

// POST /api/cart/add
router.post('/add', addToCart);

// GET /api/cart/:userId
router.get('/:userId', getCartItems);

module.exports = router;
