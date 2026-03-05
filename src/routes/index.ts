import { Router } from 'express';
import productRoutes from './product';
import userRoutes from './user';
import orderRoutes from './order';
import transferRoutes from './transfer';

const router = Router();

router.use('/products', productRoutes);
router.use('/users', userRoutes);
router.use('/orders', orderRoutes);
router.use('/transfer-point', transferRoutes);

export default router;
