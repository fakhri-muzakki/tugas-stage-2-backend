import multer from 'multer';
import { AppError } from '../errors/AppError';

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
  fileFilter(req, file, cb) {
    if (!file.mimetype.startsWith('image/')) {
      cb(new AppError('File must be an image', 400));
      return;
    }
    cb(null, true);
  },
});

export default upload;
