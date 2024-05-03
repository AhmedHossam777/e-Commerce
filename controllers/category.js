const asyncWrapper = require('express-async-handler');
const slugify = require('slugify');
const AppError = require('../utils/AppError');
const ApiFeatures = require('../utils/ApiFeatures');
const { v4: uuidv4 } = require('uuid');

const multer = require('multer');

// Disk storage
const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/categories');
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split('/')[1]; // image/jpeg/png/...
    const filename = `category-${uuidv4()}-${Date.now()}.${ext}`;
    cb(null, filename);
  }
});

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    return cb(null, true);
  } else {
    return cb(new AppError('Please upload an image', 400), false);
  }
};

const upload = multer({ storage: multerStorage, fileFilter: multerFilter });

const uploadCategoryImage = upload.single(`image`);

const {
  deleteOne,
  updateOne,
  getOne,
  createOne,
  getAll
} = require('./factoryHandlers');

const Category = require('../models/Category');

const getCategories = getAll(Category);

const createCategory = createOne(Category);

const getCategory = getOne(Category);

const updateCategory = updateOne(Category);

const deleteCategory = deleteOne(Category);

module.exports = {
  getCategories,
  createCategory,
  getCategory,
  updateCategory,
  deleteCategory,
  uploadCategoryImage
};
