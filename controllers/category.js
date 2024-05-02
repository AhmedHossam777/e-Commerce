const asyncWrapper = require('express-async-handler');
const slugify = require('slugify');
const AppError = require('../utils/AppError');
const ApiFeatures = require('../utils/ApiFeatures');

const {
  deleteOne,
  updateOne,
  getOne,
  createOne,
  getAll,
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
};
