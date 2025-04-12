const express = require('express');
const router = express.Router();

// Footer details
router.get('/footer', (req, res) => {
    res.json({
        address: "Industrial Estate, Pokhara-10",
        phone: "+977 9898989898",
        email: "mio@dairyproducts.com",
        hours: "6:00 AM - 6:00 PM",
    });
});

// Payment methods
router.get('/payment-methods', (req, res) => {
    res.json([
        { name: 'Esewa', image: 'images/esewa.jpg' },
        { name: 'Visa', image: 'images/visa.png' },
        { name: 'Mastercard', image: 'images/Mastercard.png' },
        { name: 'IME Pay', image: 'images/ime.png' },
    ]);
});

module.exports = router;