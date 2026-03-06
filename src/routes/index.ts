import { Router } from 'express';
import postRoutes from './post';
import authRoutes from './auth';
import userRoutes from './user';
import categoryRoutes from './category';
import commentRoutes from './comment';

const router = Router();

router.use('/auth', authRoutes);
router.use('/posts', postRoutes);
router.use('/users', userRoutes);
router.use('/comments', commentRoutes);
router.use('/categories', categoryRoutes);

export default router;
