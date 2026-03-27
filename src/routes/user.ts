import { Router } from 'express';
import {
  createUser,
  deleteUser,
  getUsers,
  updateUser,
  uploadProfilePicture,
} from '../controllers/user';
import { verifyRole, verifyToken } from '../middlewares/auth';
import upload from '../configs/multer';
import { validate } from '../middlewares/validate';
import { uploadSchema } from '../validations/user';
import { limiter } from '../middlewares/ratelimit';

const router = Router();

// router.get('/', verifyToken, verifyRole('ADMIN'), getUsers);
router.get('/', limiter, getUsers);
// router.get('/', verifyToken, getUsers);
router.post('/', createUser);
router.delete('/:id', deleteUser);
router.put('/:id', updateUser);

router.post(
  '/upload-profile-picture',
  upload.single('image'),
  validate(uploadSchema, 'body'),
  uploadProfilePicture
);

export default router;
