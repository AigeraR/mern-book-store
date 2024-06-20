const orderController = require('../controllers/orderController');
const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/authMiddleware');

// Order Routes
router.post('/order/placeOrder', protect, orderController.placeOrder);
router.get('/order/viewOrders', protect, orderController.viewOrders);
router.get('/order/viewOrder/:orderId', protect, orderController.viewOrder);
router.put('/order/cancelOrder/:orderId', protect, orderController.cancelOrder);

module.exports = router;