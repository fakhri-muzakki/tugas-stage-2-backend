import { Router } from 'express';
import {
  createPost,
  getPosts,
  deletePost,
  updatePost,
} from '../controllers/post';

const router = Router();

router.get('/', getPosts);
router.post('/', createPost);
router.delete('/:id', deletePost);
router.put('/:id', updatePost);

export default router;
