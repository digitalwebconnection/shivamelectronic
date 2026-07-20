import express from 'express';
import multer from 'multer';
import Product from '../models/Product.js';
import { uploadToCloudinary } from '../config/cloudinary.js';
import { protectAdmin } from '../middleware/auth.js';

const router = express.Router();

// Set up multer memory storage for buffer upload
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB file size limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only images (jpg, jpeg, png, webp) are allowed'), false);
    }
  }
});

/**
 * Helper to normalize specifications input
 */
const parseSpecifications = (specs) => {
  if (!specs) return [];
  if (Array.isArray(specs)) return specs;
  if (typeof specs === 'string') {
    // If it looks like a JSON array
    if (specs.trim().startsWith('[')) {
      try {
        return JSON.parse(specs);
      } catch (e) {
        // Fall back to splitting by newline or comma
      }
    }
    // Fall back: split by newlines or commas, filter empty lines
    return specs
      .split(/[\r\n,]+/)
      .map(s => s.trim())
      .filter(s => s.length > 0);
  }
  return [];
};

/**
 * @route   GET /api/products
 * @desc    Get all products
 * @access  Public
 */
router.get('/', async (req, res) => {
  try {
    const products = await Product.find({}).sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error.message);
    res.status(500).json({ message: 'Server error fetching products' });
  }
});

/**
 * @route   POST /api/products
 * @desc    Create a new product with image upload
 * @access  Private/Admin
 */
router.post('/', protectAdmin, upload.single('image'), async (req, res) => {
  try {
    const { name, category, brand, rating, description, specifications, isRecent, isHot } = req.body;

    // Check required fields
    if (!name || !category || !brand || !description) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    if (!req.file) {
      return res.status(400).json({ message: 'Please upload a product image' });
    }

    // Check hot deals limit
    if (isHot === 'true' || isHot === true) {
      const hotCount = await Product.countDocuments({ isHot: true });
      if (hotCount >= 2) {
        return res.status(400).json({ message: 'Only exactly 2 products can be selected as Super Hot Deals. Please deselect another product first.' });
      }
    }

    // Upload image to Cloudinary
    const uploadResult = await uploadToCloudinary(req.file.buffer);

    const product = new Product({
      name,
      category: category.toLowerCase(),
      brand,
      rating: rating ? parseFloat(rating) : 5.0,
      image: uploadResult.secure_url,
      description,
      specifications: parseSpecifications(specifications),
      isRecent: isRecent === 'true' || isRecent === true,
      isHot: isHot === 'true' || isHot === true
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    console.error('Error creating product:', error.message);
    res.status(500).json({ message: error.message || 'Server error creating product' });
  }
});

/**
 * @route   PUT /api/products/:id
 * @desc    Update a product (image optional)
 * @access  Private/Admin
 */
router.put('/:id', protectAdmin, upload.single('image'), async (req, res) => {
  try {
    const { name, category, brand, rating, description, specifications, isRecent, isHot } = req.body;

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Check hot deals limit if isHot is being enabled
    if (isHot !== undefined && (isHot === 'true' || isHot === true)) {
      const hotCount = await Product.countDocuments({ isHot: true, _id: { $ne: req.params.id } });
      if (hotCount >= 2) {
        return res.status(400).json({ message: 'Only exactly 2 products can be selected as Super Hot Deals. Please deselect another product first.' });
      }
    }

    // Update simple fields if they exist in request body
    if (name) product.name = name;
    if (category) product.category = category.toLowerCase();
    if (brand) product.brand = brand;
    if (rating) product.rating = parseFloat(rating);
    if (description) product.description = description;
    if (specifications !== undefined) {
      product.specifications = parseSpecifications(specifications);
    }
    if (isRecent !== undefined) product.isRecent = isRecent === 'true' || isRecent === true;
    if (isHot !== undefined) product.isHot = isHot === 'true' || isHot === true;

    // Handle optional image update
    if (req.file) {
      const uploadResult = await uploadToCloudinary(req.file.buffer);
      product.image = uploadResult.secure_url;
    }

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } catch (error) {
    console.error('Error updating product:', error.message);
    res.status(500).json({ message: 'Server error updating product' });
  }
});

/**
 * @route   PUT /api/products/:id/toggle-hot
 * @desc    Toggle product isHot status (max 2)
 * @access  Private/Admin
 */
router.put('/:id/toggle-hot', protectAdmin, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const newIsHot = !product.isHot;

    if (newIsHot) {
      const hotCount = await Product.countDocuments({ isHot: true, _id: { $ne: product._id } });
      if (hotCount >= 2) {
        return res.status(400).json({ message: 'Only exactly 2 products can be selected as Super Hot Deals. Please deselect another product first.' });
      }
    }

    product.isHot = newIsHot;
    await product.save();
    res.json(product);
  } catch (error) {
    console.error('Error toggling hot status:', error.message);
    res.status(500).json({ message: 'Server error toggling hot status' });
  }
});

/**
 * @route   DELETE /api/products/:id
 * @desc    Delete a product
 * @access  Private/Admin
 */
router.delete('/:id', protectAdmin, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    await Product.deleteOne({ _id: product._id });
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error.message);
    res.status(500).json({ message: 'Server error deleting product' });
  }
});

export default router;
export { upload }; // Export multer upload config for edge cases
