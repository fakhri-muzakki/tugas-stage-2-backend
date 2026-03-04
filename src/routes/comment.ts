import { Router } from 'express';
import {
  createComment,
  deleteComment,
  getComments,
  updateComment,
} from '../controllers/comment';

const router = Router();

router.get('/', getComments);
router.post('/', createComment);
router.delete('/:id', deleteComment);
router.put('/:id', updateComment);

export default router;
