const express = require('express');
const multer = require('multer');

const {
  getCategoryValidator,
  updateCategoryValidator,
  deleteCategoryValidator,
} = require('../utils/validators/category');

const {
  getCategories,
  createCategory,
  getCategory,
  updateCategory,
  deleteCategory,
} = require('../controllers/category');

const upload = multer({ dest: 'uploads/categories' });

const subCategoriesRoute = require('./subCategory');

const router = express.Router();

router.route('/').get(getCategories).post(createCategory);
router
  .route('/:id')
  .get(getCategoryValidator, getCategory)
  .patch(updateCategoryValidator, updateCategory)
  .delete(deleteCategoryValidator, deleteCategory);

router.use('/:parent/subCategories', subCategoriesRoute);

module.exports = router;
