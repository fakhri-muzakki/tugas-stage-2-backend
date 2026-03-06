import { Router } from 'express';
import {
  createUser,
  deleteUser,
  getUsers,
  updateUser,
} from '../controllers/user';
import { verifyRole, verifyToken } from '../middlewares/auth';

const router = Router();

router.get('/', verifyToken, verifyRole('ADMIN'), getUsers);
// router.get('/', verifyToken, getUsers);
router.post('/', createUser);
router.delete('/:id', deleteUser);
router.put('/:id', updateUser);

export default router;
