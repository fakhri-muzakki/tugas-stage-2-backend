import { Router } from 'express';
import { addStock } from '../controllers/supplier';

const router = Router();

router.post('/stock', addStock);

export default router;
