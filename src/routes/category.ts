import { Router } from 'express';
import {
  createCategory,
  getCategories,
  deleteCategory,
  updateCategory,
} from '../controllers/category';

const router = Router();

router.get('/', getCategories);
router.post('/', createCategory);
router.delete('/:id', deleteCategory);
router.put('/:id', updateCategory);

export default router;
