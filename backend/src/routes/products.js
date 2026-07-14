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
    const { name, category, brand, price, rating, description, specifications, isNew, isHot } = req.body;

    // Check required fields
    if (!name || !category || !brand || !price || !description) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    if (!req.file) {
      return res.status(400).json({ message: 'Please upload a product image' });
    }

    // Upload image to Cloudinary
    const uploadResult = await uploadToCloudinary(req.file.buffer);

    const product = new Product({
      name,
      category: category.toLowerCase(),
      brand,
      price: parseFloat(price),
      rating: rating ? parseFloat(rating) : 5.0,
      image: uploadResult.secure_url,
      description,
      specifications: parseSpecifications(specifications),
      isNew: isNew === 'true' || isNew === true,
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
    const { name, category, brand, price, rating, description, specifications, isNew, isHot } = req.body;

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Update simple fields if they exist in request body
    if (name) product.name = name;
    if (category) product.category = category.toLowerCase();
    if (brand) product.brand = brand;
    if (price) product.price = parseFloat(price);
    if (rating) product.rating = parseFloat(rating);
    if (description) product.description = description;
    if (specifications !== undefined) {
      product.specifications = parseSpecifications(specifications);
    }
    if (isNew !== undefined) product.isNew = isNew === 'true' || isNew === true;
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
