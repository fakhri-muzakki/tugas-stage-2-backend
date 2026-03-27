// import multer from 'multer';
// import path from 'path';
// import { AppError } from '../errors/AppError';

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, path.join(process.cwd(), 'src/public/uploads'));
//   },
//   filename: function (req, file, cb) {
//     const filename = file.originalname.replace(/\s+/g, '-');
//     const uniqueName = `${Date.now()}-${filename}`;
//     cb(null, uniqueName);
//   },
// });

// const upload = multer({
//   storage,
//   limits: {
//     fieldNameSize: 5 * 1024 * 1024,
//   },
//   fileFilter(req, file, cb) {
//     if (!file.mimetype.startsWith('image/')) {
//       cb(new AppError('file must be image', 400));
//       return;
//     }

//     cb(null, true);
//   },
// });

// export default upload;

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
