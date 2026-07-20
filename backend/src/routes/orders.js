import express from 'express';
import Order from '../models/Order.js';
import { protectAdmin } from '../middleware/auth.js';

const router = express.Router();

/**
 * @route   POST /api/orders
 * @desc    Place a new order
 * @access  Public
 */
router.post('/', async (req, res) => {
  try {
    const {
      id,
      orderId,
      customerName,
      customerEmail,
      customerPhone,
      customerAddress,
      customerNote,
      items,
      totalAmount,
      paymentMethod,
      user
    } = req.body;

    if (!customerName || !customerPhone || !customerAddress || !items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: 'Please provide all required order details and at least one item.' });
    }

    const generatedOrderId = orderId || id || `ORD-${Math.floor(100000 + Math.random() * 900000)}`;

    const formattedItems = items.map(item => {
      const p = item.product || {};
      return {
        productId: p._id || p.id || undefined,
        productName: p.name || item.productName || 'Unknown Product',
        brand: p.brand || item.brand || 'Generic',
        category: p.category || item.category || '',
        price: p.price !== undefined ? p.price : (item.price || 0),
        quantity: item.quantity || 1,
        image: p.image || item.image || ''
      };
    });

    const totalQuantity = formattedItems.reduce((sum, item) => sum + item.quantity, 0);
    const calculatedTotal = totalAmount !== undefined ? totalAmount : formattedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    const newOrder = new Order({
      orderId: generatedOrderId,
      user: user?._id || user?.id || undefined,
      customerName,
      customerEmail: customerEmail || user?.email || 'N/A',
      customerPhone,
      customerAddress,
      customerNote: customerNote || '',
      items: formattedItems,
      totalQuantity,
      totalAmount: calculatedTotal,
      status: 'Pending',
      paymentMethod: paymentMethod || 'Cash on Delivery'
    });

    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    console.error('Error placing order:', error.message);
    res.status(500).json({ message: error.message || 'Server error placing order' });
  }
});

/**
 * @route   GET /api/orders
 * @desc    Get all orders for admin
 * @access  Private/Admin
 */
router.get('/', protectAdmin, async (req, res) => {
  try {
    const orders = await Order.find({}).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error.message);
    res.status(500).json({ message: 'Server error fetching orders' });
  }
});

/**
 * @route   PUT /api/orders/:id/status
 * @desc    Update order status (Pending, Confirmed, Cancelled)
 * @access  Private/Admin
 */
router.put('/:id/status', protectAdmin, async (req, res) => {
  try {
    const { status } = req.body;
    const allowedStatuses = ['Pending', 'Confirmed', 'Cancelled'];

    if (!status || !allowedStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid order status. Allowed values: Pending, Confirmed, Cancelled' });
    }

    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    order.status = status;
    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } catch (error) {
    console.error('Error updating order status:', error.message);
    res.status(500).json({ message: 'Server error updating order status' });
  }
});

/**
 * @route   DELETE /api/orders/:id
 * @desc    Delete an order
 * @access  Private/Admin
 */
router.delete('/:id', protectAdmin, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    await Order.deleteOne({ _id: order._id });
    res.json({ message: 'Order deleted successfully' });
  } catch (error) {
    console.error('Error deleting order:', error.message);
    res.status(500).json({ message: 'Server error deleting order' });
  }
});

export default router;
