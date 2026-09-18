import Product from '../models/Product.js';
import { uploadImage } from '../upload/cloudinaryUploader.js';
import { HOT_DEALS_MAX } from '../constants/index.js';
import { AppError } from '../errors/AppError.js';

/**
 * Parse specifications input into an array.
 */
const parseSpecifications = (specs) => {
  if (!specs) return [];
  if (Array.isArray(specs)) return specs;
  if (typeof specs === 'string') {
    if (specs.trim().startsWith('[')) {
      try { return JSON.parse(specs); } catch (e) { /* fall through */ }
    }
    return specs.split(/[\r\n,]+/).map(s => s.trim()).filter(s => s.length > 0);
  }
  return [];
};

export const getAllProducts = async () => {
  return Product.find({}).sort({ createdAt: -1 });
};

export const createProduct = async (data, file) => {
  const { name, category, brand, description, rating, specifications, isRecent, isHot } = data;

  if (!name || !category || !brand || !description) {
    throw new AppError('Please provide all required fields', 400);
  }
  if (!file) {
    throw new AppError('Please upload a product image', 400);
  }

  if (isHot === 'true' || isHot === true) {
    const hotCount = await Product.countDocuments({ isHot: true });
    if (hotCount >= HOT_DEALS_MAX) {
      throw new AppError(`Only exactly ${HOT_DEALS_MAX} products can be selected as Super Hot Deals.`, 400);
    }
  }

  const uploadResult = await uploadImage(file.buffer);

  const product = new Product({
    name,
    category: category.toLowerCase(),
    brand,
    rating: rating ? parseFloat(rating) : 5.0,
    image: uploadResult.secure_url,
    description,
    specifications: parseSpecifications(specifications),
    isRecent: isRecent === 'true' || isRecent === true,
    isHot: isHot === 'true' || isHot === true,
  });

  return product.save();
};

export const updateProduct = async (id, data, file) => {
  const { name, category, brand, rating, description, specifications, isRecent, isHot } = data;
  const product = await Product.findById(id);
  if (!product) throw new AppError('Product not found', 404);

  if (isHot !== undefined && (isHot === 'true' || isHot === true)) {
    const hotCount = await Product.countDocuments({ isHot: true, _id: { $ne: id } });
    if (hotCount >= HOT_DEALS_MAX) {
      throw new AppError(`Only exactly ${HOT_DEALS_MAX} products can be selected as Super Hot Deals.`, 400);
    }
  }

  if (name) product.name = name;
  if (category) product.category = category.toLowerCase();
  if (brand) product.brand = brand;
  if (rating) product.rating = parseFloat(rating);
  if (description) product.description = description;
  if (specifications !== undefined) product.specifications = parseSpecifications(specifications);
  if (isRecent !== undefined) product.isRecent = isRecent === 'true' || isRecent === true;
  if (isHot !== undefined) product.isHot = isHot === 'true' || isHot === true;

  if (file) {
    const uploadResult = await uploadImage(file.buffer);
    product.image = uploadResult.secure_url;
  }

  return product.save();
};

export const toggleHotStatus = async (id) => {
  const product = await Product.findById(id);
  if (!product) throw new AppError('Product not found', 404);

  const newIsHot = !product.isHot;
  if (newIsHot) {
    const hotCount = await Product.countDocuments({ isHot: true, _id: { $ne: product._id } });
    if (hotCount >= HOT_DEALS_MAX) {
      throw new AppError(`Only exactly ${HOT_DEALS_MAX} products can be selected as Super Hot Deals.`, 400);
    }
  }

  product.isHot = newIsHot;
  return product.save();
};

export const deleteProduct = async (id) => {
  const product = await Product.findById(id);
  if (!product) throw new AppError('Product not found', 404);
  await Product.deleteOne({ _id: product._id });
  return { message: 'Product deleted successfully' };
};
