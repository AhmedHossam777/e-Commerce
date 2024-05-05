const asyncWrapper = require('express-async-handler');
const slugify = require('slugify');
const AppError = require('../utils/AppError');
const SubCategory = require('../models/SubCategory');
const Category = require('../models/Category');
const Product = require('../models/Product');
const Brand = require('../models/Brand');
const ApiFeatures = require('../utils/ApiFeatures');

const sharp = require('sharp');

const { uploadMixOfImages } = require('../middlewares/uploadImageMiddleware');

const { v4: uuidv4 } = require('uuid');

const {
  deleteOne,
  updateOne,
  getOne,
  createOne,
  getAll,
} = require('./factoryHandlers');

const uploadProductImages = uploadMixOfImages([
  { name: 'images', maxCount: 5 },
  { name: 'imageCover', maxCount: 1 },
]);

const resizeCoverImage = async (req, res, next) => {
  if (!req.files.imageCover) {
    return next();
  }
  const filename = `product-Cover-${uuidv4()}-${Date.now()}.jpeg`;
  console.log(filename);
  console.log(req.files.imageCover.buffer);

  await sharp(req.files.imageCover[0].buffer)
    .resize(600, 600)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`uploads/products/imageCover/${filename}`);

  req.body.imageCover = filename; // save image into DB

  next();
};

const resizeImages = (req, res, next) => {
  if (!req.files) {
    return next();
  }

  req.body.images = [];

  req.files.images.forEach((file) => {
    const filename = `product-${uuidv4()}-${Date.now()}.jpeg`;

    sharp(file.buffer)
      .resize(600, 600)
      .toFormat('jpeg')
      .jpeg({ quality: 90 })
      .toFile(`uploads/products/${filename}`);

    req.body.images.push(filename); // save image into DB
  });

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
  uploadProductImages,
  resizeCoverImage,
  resizeImages,
};
