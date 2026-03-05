import { Router } from 'express';
import productRoutes from './product';
import userRoutes from './user';
import orderRoutes from './order';
import transferRoutes from './transfer';
import supplierRoutes from './supplier';

const router = Router();

router.use('/products', productRoutes);
router.use('/users', userRoutes);
router.use('/orders', orderRoutes);
router.use('/transfer-point', transferRoutes);
router.use('/suppliers', supplierRoutes);

export default router;
