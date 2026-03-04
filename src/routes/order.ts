import { Router } from 'express';
import {
  createOrder,
  deleteOrder,
  getOrders,
  getOrdersSummary,
  updateOrder,
} from '../controllers/order';

const router = Router();

router.get('/', getOrders);
router.get('/summary', getOrdersSummary);
router.post('/', createOrder);
router.delete('/:id', deleteOrder);
router.put('/:id', updateOrder);

export default router;
