import Category from '../models/Category.js';
import { AppError } from '../errors/AppError.js';

export const getAllCategories = async () => {
  return Category.find({}).sort({ name: 1 });
};

export const createCategory = async ({ name, slug, icon }) => {
  if (!name || !slug) throw new AppError('Name and slug are required fields', 400);
  const exists = await Category.findOne({ slug: slug.toLowerCase() });
  if (exists) throw new AppError('A category with this slug already exists', 400);
  const category = new Category({ name, slug: slug.toLowerCase(), icon: icon || 'Cpu' });
  return category.save();
};

export const updateCategory = async (id, { name, icon }) => {
  if (!name) throw new AppError('Category name is required', 400);
  const category = await Category.findById(id);
  if (!category) throw new AppError('Category not found', 404);
  category.name = name;
  category.slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  if (icon) category.icon = icon;
  return category.save();
};

export const deleteCategory = async (slug) => {
  const category = await Category.findOne({ slug: slug.toLowerCase() });
  if (!category) throw new AppError('Category not found', 404);
  await Category.deleteOne({ _id: category._id });
  return { message: 'Category deleted successfully' };
};
