import { Router } from 'express';
import {
  createProduct,
  getProducts,
  deleteProduct,
  updateProduct,
} from '../controllers/product';
import { validate } from '../middlewares/validate';
import { createProductSchema } from '../validations/product';

const router = Router();

router.get('/', getProducts);
router.post('/', validate(createProductSchema, 'body'), createProduct);
router.delete('/:id', deleteProduct);
router.put('/:id', updateProduct);

export default router;
