
// module.exports = router;

const express = require('express');
const router = express.Router();
const { createOrder, getOrders, getOrderById, trackOrder, buyProduct, updateOrderStatus, cancelOrder } = require('../controllers/orderController');
const { protect } = require('../middlewares/authMiddleware');

router.post('/', protect, createOrder);
router.get('/', protect, getOrders);
router.get('/:id', protect, getOrderById);
router.get('/track/:id', protect, trackOrder);
router.post('/buy', protect, buyProduct); // Add protect middleware
router.put('/:id/status', protect, updateOrderStatus); // New route for updating order status
router.put('/:orderId/cancel', protect, cancelOrder);

module.exports = router;
