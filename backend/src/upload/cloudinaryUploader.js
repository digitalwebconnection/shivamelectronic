import multer from 'multer';
import { uploadToCloudinary } from '../config/cloudinary.js';
import { MAX_FILE_SIZE } from '../constants/index.js';

/**
 * Multer memory storage configuration.
 */
const storage = multer.memoryStorage();

export const upload = multer({
  storage,
  limits: { fileSize: MAX_FILE_SIZE },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only images (jpg, jpeg, png, webp) are allowed'), false);
    }
  },
});

/**
 * Upload a file buffer to Cloudinary and return the result.
 */
export const uploadImage = async (fileBuffer) => {
  return uploadToCloudinary(fileBuffer);
};
