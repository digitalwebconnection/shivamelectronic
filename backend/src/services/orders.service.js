import Order from '../models/Order.js';
import { AppError } from '../errors/AppError.js';
import { ORDER_STATUSES } from '../constants/index.js';

export const placeOrder = async (data) => {
  const { id, orderId, customerName, customerEmail, customerPhone, customerAddress, customerNote, items, totalAmount, paymentMethod, user } = data;

  if (!customerName || !customerPhone || !customerAddress || !items || !Array.isArray(items) || items.length === 0) {
    throw new AppError('Please provide all required order details and at least one item.', 400);
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
      image: p.image || item.image || '',
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
    paymentMethod: paymentMethod || 'Cash on Delivery',
  });

  return newOrder.save();
};

export const getMyOrders = async (user) => {
  const query = {};
  if (user.id) {
    query.$or = [{ user: user.id }, { customerEmail: user.email }];
  } else {
    query.customerEmail = user.email;
  }
  return Order.find(query).sort({ createdAt: -1 });
};

export const getAllOrders = async () => {
  return Order.find({}).sort({ createdAt: -1 });
};

export const updateOrderStatus = async (id, status) => {
  if (!status || !ORDER_STATUSES.includes(status)) {
    throw new AppError(`Invalid order status. Allowed: ${ORDER_STATUSES.join(', ')}`, 400);
  }
  const order = await Order.findById(id);
  if (!order) throw new AppError('Order not found', 404);
  order.status = status;
  return order.save();
};

export const deleteOrder = async (id) => {
  const order = await Order.findById(id);
  if (!order) throw new AppError('Order not found', 404);
  await Order.deleteOne({ _id: order._id });
  return { message: 'Order deleted successfully' };
};
