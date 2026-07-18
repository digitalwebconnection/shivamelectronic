import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  category: {
    type: String, // references Category slug, e.g., 'connectors'
    required: true,
    trim: true,
    lowercase: true,
  },
  brand: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
    default: 5.0,
  },
  image: {
    type: String, // Cloudinary Image URL
    required: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  specifications: {
    type: [String],
    default: [],
  },
  isRecent: {
    type: Boolean,
    default: false,
  },
  isHot: {
    type: Boolean,
    default: false,
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Create a virtual 'id' mapping from '_id' for frontend compatibility
productSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

const Product = mongoose.model('Product', productSchema);

export default Product;
