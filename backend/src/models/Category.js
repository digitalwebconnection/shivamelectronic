import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  icon: {
    type: String,
    default: 'Cpu',
    trim: true,
  }
}, {
  timestamps: true
});

const Category = mongoose.model('Category', categorySchema);

export default Category;
