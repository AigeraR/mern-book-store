const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const { protect, admin } = require('../middleware/authMiddleware');

// Cart Routes
const { addCartItem, updateCartItem } = require('../controllers/cartController');

router.post('/addCartItem', addCartItem);
router.put('/updateCartItem/:id', updateCartItem);
router.post('/addToCart/:bookId', protect, cartController.addToCart);
router.get('/viewCart', protect, cartController.viewCart);
router.put('/updateCartItem/:itemId', protect, cartController.updateCartItem);
router.delete('/removeCartItem/:itemId', protect, cartController.removeCartItem);
router.delete('/clearCart', protect, cartController.clearCart);

module.exports = router;
