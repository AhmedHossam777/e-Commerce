const multer = require('multer');
const AppError = require('../utils/AppError');

const multerOptions = () => {
  const multerStorage = multer.memoryStorage();
  const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
      return cb(null, true);
    } else {
      return cb(new AppError('Please upload an image', 400), false);
    }
  };

  const upload = multer({ storage: multerStorage, fileFilter: multerFilter });
  return upload;
};

const uploadSingleImage = (fieldName) => multerOptions().single(fieldName);

const uploadMixOfImages = (arrayOfFields) => multerOptions().fields(arrayOfFields);

module.exports = { uploadSingleImage, uploadMixOfImages };
