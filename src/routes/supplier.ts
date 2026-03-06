import { Router } from 'express';
import {
  addStock,
  login,
  register,
  updateStock,
} from '../controllers/supplier';
import { verifyToken } from '../middlewares/auth';
import { validate } from '../middlewares/validate';
import { loginSchema, registerSchema } from '../validations/auth';

const router = Router();

router.post('/stock', verifyToken, addStock);
router.put('/stock', verifyToken, updateStock);
// router.post('/stock', addStock);
// router.put('/stock', updateStock);

router.post('/register', validate(registerSchema, 'body'), register);
router.post('/login', validate(loginSchema, 'body'), login);

export default router;
