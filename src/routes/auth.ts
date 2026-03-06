import { Router } from 'express';
import { login, register } from '../controllers/auth';
import { validate } from '../middlewares/validate';
import { loginSchema, registerSchema } from '../validations/auth';

const router = Router();

router.post('/register', validate(registerSchema, 'body'), register);
router.post('/login', validate(loginSchema, 'body'), login);

export default router;
