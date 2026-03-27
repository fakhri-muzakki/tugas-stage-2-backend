import { Router } from 'express';
import {
  createProduct,
  getProducts,
  deleteProduct,
  updateProduct,
  uploadImage,
} from '../controllers/product';
import { validate } from '../middlewares/validate';
import { createProductSchema, uploadImageSchema } from '../validations/product';
import upload from '../configs/multer';
import { limiter } from '../middlewares/ratelimiter';

const router = Router();

router.get('/', limiter, getProducts);
router.post('/', validate(createProductSchema, 'body'), createProduct);
router.delete('/:id', deleteProduct);
router.put('/:id', updateProduct);

router.post(
  '/upload-image',
  upload.single('image'),
  validate(uploadImageSchema, 'body'),
  uploadImage
);
export default router;
