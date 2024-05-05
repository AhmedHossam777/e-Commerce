const asyncWrapper = require('express-async-handler');
const slugify = require('slugify');
const AppError = require('../utils/AppError');
const SubCategory = require('../models/SubCategory');
const Category = require('../models/Category');
const Product = require('../models/Product');
const Brand = require('../models/Brand');
const ApiFeatures = require('../utils/ApiFeatures');

const sharp = require('sharp');

const { uploadSingleImage } = require('../middlewares/uploadImageMiddleware');

const { v4: uuidv4 } = require('uuid');

const {
  deleteOne,
  updateOne,
  getOne,
  createOne,
  getAll,
} = require('./factoryHandlers');

const uploadProductCoverImage = uploadSingleImage('imageCover');

const resizeImage = (req, res, next) => {
  if (!req.file) {
    return next();
  }
  const filename = `imageCover-${uuidv4()}-${Date.now()}.jpeg`;

  sharp(req.file.buffer)
    .resize(600, 600)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`uploads/products/imageCover/${filename}`);

  req.body.imageCover = filename; // save image into DB

  next();
};

const getAllProduct = getAll(Product);

const getProduct = getOne(Product);

const updateProduct = updateOne(Product);

const deleteProduct = deleteOne(Product);

const createProduct = asyncWrapper(async (req, res, next) => {
  req.body.slug = slugify(req.body.title);

  const category = await Category.findById(req.body.category);
  if (!category) {
    return next(new AppError('there is no category with that id', 404));
  }
  if (req.body.subCategory) {
    const subCategory = await SubCategory.findById(req.body.subCategory);
    if (!subCategory) {
      return next(new AppError('there is no subCategory with that id', 404));
    }

    if (JSON.stringify(category._id) !== JSON.stringify(subCategory.category)) {
      return next(new AppError('subCategory is not belong to that category'));
    }
  }

  if (req.body.brand) {
    const brand = await Brand.findById(req.body.brand);
    if (!brand) {
      return next(new AppError('there is no brand with that id'));
    }
  }

  const product = await Product.create(req.body);

  res.status(201).json({
    status: 'success',
    product,
  });
});

module.exports = {
  createProduct,
  getAllProduct,
  getProduct,
  updateProduct,
  deleteProduct,
  uploadProductCoverImage,
  resizeImage,
};
