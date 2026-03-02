import { Router } from 'express';
import {
  createOrder,
  deleteOrder,
  getOrders,
  updateOrder,
} from '../controllers/order';

const router = Router();

router.get('/', getOrders);
router.post('/', createOrder);
router.delete('/:id', deleteOrder);
router.put('/:id', updateOrder);

export default router;
