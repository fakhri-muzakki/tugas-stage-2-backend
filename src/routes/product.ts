import { Router } from 'express';
import {
  createProduct,
  deleteProduct,
  getProduct,
  updateProduct,
} from '../controllers/product';

const router = Router();

router.get('/', getProduct);
router.post('/', createProduct);
router.delete('/:id', deleteProduct);
router.put('/:id', updateProduct);

export default router;
