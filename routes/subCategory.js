const express = require('express');

const {
  getAllSubCategoryValidation,
  getSubCategoryValidation,
  createSubCategoryValidation,
  updateSubCategoryValidation,
  deleteSubCategoryValidation,
} = require('../utils/validators/subCategory');

const {
  createSubCategory,
  getAllSubCategory,
  getSubCategory,
  updateSubCategory,
  deleteSubCategory,
} = require('../controllers/subCategory');

// mergeParams: allow us to access params on other routers
// Ex: we wanna access the categoryId from the category router
const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(getAllSubCategoryValidation, getAllSubCategory)
  .post(createSubCategoryValidation, createSubCategory);

router
  .route('/:id')
  .get(getSubCategoryValidation, getSubCategory)
  .patch(updateSubCategoryValidation, updateSubCategory)
  .delete(deleteSubCategoryValidation, deleteSubCategory);

module.exports = router;
