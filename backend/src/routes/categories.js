import express from 'express';
import { protectAdmin } from '../middleware/auth.js';
import * as categoriesController from '../controllers/categories.controller.js';

const router = express.Router();

router.get('/', categoriesController.getAll);
router.post('/', protectAdmin, categoriesController.create);
router.put('/:id', protectAdmin, categoriesController.update);
router.delete('/:slug', protectAdmin, categoriesController.remove);

export default router;
