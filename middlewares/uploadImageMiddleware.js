const multer = require('multer');
const AppError = require('../utils/AppError');

const uploadSingleImage = (field) => {
  const multerStorage = multer.memoryStorage();
  const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
      return cb(null, true);
    } else {
      return cb(new AppError('Please upload an image', 400), false);
    }
  };

  const upload = multer({ storage: multerStorage, fileFilter: multerFilter });
  return upload.single(field);
};

const uploadMixOfImages = (field) => {
  const multerStorage = multer.memoryStorage();
  const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
      return cb(null, true);
    } else {
      return cb(new AppError('Please upload a valid image', 400), false); // Updated error message
    }
  };

  const upload = multer({ storage: multerStorage, fileFilter: multerFilter });
  return upload.fields(field);
};

module.exports = { uploadSingleImage, uploadMixOfImages };
