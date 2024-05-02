const AppError = require('../utils/AppError');
const Brand = require('../models/Brand');
const asyncWrapper = require('express-async-handler');
const slugify = require('slugify');
const ApiFeatures = require('../utils/ApiFeatures');

const {
  deleteOne,
  updateOne,
  getOne,
  createOne,
  getAll,
} = require('./factoryHandlers');

const getAllBrands = getAll(Brand);

const getBrand = getOne(Brand);

const createBrand = createOne(Brand);

const updateBrand = updateOne(Brand);

const deleteBrand = deleteOne(Brand);

module.exports = {
  createBrand,
  getAllBrands,
  getBrand,
  updateBrand,
  deleteBrand,
};
