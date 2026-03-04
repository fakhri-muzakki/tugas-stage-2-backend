import { Router } from 'express';
import productRoutes from './product';
import userRoutes from './user';
import orderRoutes from './order';

const router = Router();

router.use('/products', productRoutes);
router.use('/users', userRoutes);
router.use('/orders', orderRoutes);

export default router;
