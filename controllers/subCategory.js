const asyncWrapper = require('express-async-handler');
const slugify = require('slugify');
const AppError = require('../utils/AppError');
const SubCategory = require('../models/SubCategory');
const Category = require('../models/Category');
const ApiFeatures = require('../utils/ApiFeatures');

const {
  deleteOne,
  updateOne,
  getOne,
  getAll,
  createOne,
} = require('./factoryHandlers');

const createSubCategory = createOne(SubCategory, Category);

const getAllSubCategory = getAll(SubCategory, Category);

const getSubCategory = getOne(SubCategory);

const updateSubCategory = updateOne(SubCategory);

const deleteSubCategory = deleteOne(SubCategory);

module.exports = {
  createSubCategory,
  getAllSubCategory,
  getSubCategory,
  deleteSubCategory,
  updateSubCategory,
};
