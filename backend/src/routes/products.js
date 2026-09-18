import express from 'express';
import { upload } from '../upload/cloudinaryUploader.js';
import { protectAdmin } from '../middleware/auth.js';
import { validateCreateProduct } from '../validators/products.validator.js';
import * as productsController from '../controllers/products.controller.js';

const router = express.Router();

router.get('/', productsController.getAll);

router.post(
  '/',
  protectAdmin,
  upload.single('image'),
  validateCreateProduct,
  productsController.create
);

router.put(
  '/:id',
  protectAdmin,
  upload.single('image'),
  productsController.update
);

router.put(
  '/:id/toggle-hot',
  protectAdmin,
  productsController.toggleHot
);

router.delete(
  '/:id',
  protectAdmin,
  productsController.remove
);

export default router;
export { upload }; // Export multer upload config for edge cases
