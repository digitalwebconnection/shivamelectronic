import express from 'express';
import Category from '../models/Category.js';
import { protectAdmin } from '../middleware/auth.js';

const router = express.Router();

/**
 * @route   GET /api/categories
 * @desc    Get all categories
 * @access  Public
 */
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find({}).sort({ name: 1 });
    res.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error.message);
    res.status(500).json({ message: 'Server error fetching categories' });
  }
});

/**
 * @route   POST /api/categories
 * @desc    Create a new category
 * @access  Private/Admin
 */
router.post('/', protectAdmin, async (req, res) => {
  const { name, slug, description, icon, featured } = req.body;

  if (!name || !slug) {
    return res.status(400).json({ message: 'Name and slug are required fields' });
  }

  try {
    // Check if slug is unique
    const categoryExists = await Category.findOne({ slug: slug.toLowerCase() });
    if (categoryExists) {
      return res.status(400).json({ message: 'A category with this slug already exists' });
    }

    const category = new Category({
      name,
      slug: slug.toLowerCase(),
      description,
      icon: icon || 'Cpu',
      featured: featured || [],
    });

    const createdCategory = await category.save();
    res.status(201).json(createdCategory);
  } catch (error) {
    console.error('Error creating category:', error.message);
    res.status(500).json({ message: 'Server error creating category' });
  }
});

/**
 * @route   DELETE /api/categories/:slug
 * @desc    Delete a category
 * @access  Private/Admin
 */
router.delete('/:slug', protectAdmin, async (req, res) => {
  try {
    const category = await Category.findOne({ slug: req.params.slug.toLowerCase() });

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    await Category.deleteOne({ _id: category._id });
    res.json({ message: 'Category deleted successfully' });
  } catch (error) {
    console.error('Error deleting category:', error.message);
    res.status(500).json({ message: 'Server error deleting category' });
  }
});

export default router;
