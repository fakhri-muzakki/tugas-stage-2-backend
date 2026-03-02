import { Router } from 'express';
import { createPost, deletePost, getPost } from '../controllers/post';

const router = Router();

router.get('/', getPost);
router.post('/', createPost);
router.delete('/:id', deletePost);

export default router;
