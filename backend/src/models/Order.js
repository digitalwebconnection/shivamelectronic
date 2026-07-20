import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: false
  },
  productName: {
    type: String,
    required: true,
    trim: true
  },
  brand: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    trim: true
  },
  price: {
    type: Number,
    default: 0
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
    default: 1
  },
  image: {
    type: String
  }
});

const orderSchema = new mongoose.Schema({
  orderId: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    index: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false
  },
  customerName: {
    type: String,
    required: true,
    trim: true
  },
  customerEmail: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  customerPhone: {
    type: String,
    required: true,
    trim: true
  },
  customerAddress: {
    type: String,
    required: true,
    trim: true
  },
  customerNote: {
    type: String,
    default: '',
    trim: true
  },
  items: [orderItemSchema],
  totalQuantity: {
    type: Number,
    required: true,
    default: 0
  },
  totalAmount: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ['Pending', 'Confirmed', 'Cancelled'],
    default: 'Pending',
    required: true
  },
  paymentMethod: {
    type: String,
    default: 'Cash on Delivery'
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Create virtual 'id' mapping from '_id' for frontend compatibility
orderSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

const Order = mongoose.model('Order', orderSchema);

export default Order;
