const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');

// Get cart items
router.get('/', async (req, res) => {
    try {
        const cartItems = await Cart.find().populate('productId');
        res.json(cartItems);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Add item to cart
router.post('/', async (req, res) => {
    const { productId, quantity } = req.body;

    try {
        const cartItem = new Cart({ productId, quantity });
        await cartItem.save();
        res.status(201).json(cartItem);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Remove item from cart
router.delete('/:id', async (req, res) => {
    try {
        const cartItem = await Cart.findById(req.params.id);
        if (!cartItem) return res.status(404).json({ message: 'Item not found' });

        await cartItem.remove();
        res.json({ message: 'Item removed from cart' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;