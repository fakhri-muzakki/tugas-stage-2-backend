import { Router } from 'express';
import { transferPoint } from '../controllers/transfer';

const router = Router();

router.post('/', transferPoint);

export default router;
