import express from 'express';
import { protectAdmin, protect } from '../middleware/auth.js';
import { validatePlaceOrder } from '../validators/orders.validator.js';
import * as ordersController from '../controllers/orders.controller.js';

const router = express.Router();

router.post('/', validatePlaceOrder, ordersController.place);
router.get('/my', protect, ordersController.getMy);
router.get('/', protectAdmin, ordersController.getAll);
router.put('/:id/status', protectAdmin, ordersController.updateStatus);
router.delete('/:id', protectAdmin, ordersController.remove);

export default router;
