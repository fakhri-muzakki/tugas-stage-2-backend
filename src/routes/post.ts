import { Router } from 'express';
import {
  createPost,
  getPosts,
  deletePost,
  updatePost,
  getCommentsPost,
  getCommentSummary,
} from '../controllers/post';

const router = Router();

router.get('/', getPosts);
router.post('/', createPost);
router.delete('/:id', deletePost);
router.put('/:id', updatePost);

router.get('/:id/comments', getCommentsPost);
router.get('/comments-summary', getCommentSummary);

export default router;
