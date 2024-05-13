const {
  validationMiddleware,
} = require('../../middlewares/validationMiddleware');

const { check } = require('express-validator');

const getAllSubCategoryValidation = [
  check('categoryId')
    .optional()
    .isMongoId()
    .withMessage('invalid category id format'),
  validationMiddleware,
];

const getSubCategoryValidation = [
  check('id').isMongoId().withMessage('invalid subCategory id format'),
  validationMiddleware,
];

const createSubCategoryValidation = [
  check('parent')
    .isMongoId()
    .withMessage('invalid category id format')
    .notEmpty()
    .withMessage('parent category is required'),

  check('name').notEmpty().withMessage('subCategory name is required'),
  validationMiddleware,
];

const updateSubCategoryValidation = [
  check('id').isMongoId().withMessage('invalid subCategory id format'),
  validationMiddleware,
];

const deleteSubCategoryValidation = [
  check('id').isMongoId().withMessage('invalid subCategory id format'),
  validationMiddleware,
];

module.exports = {
  getAllSubCategoryValidation,
  getSubCategoryValidation,
  createSubCategoryValidation,
  updateSubCategoryValidation,
  deleteSubCategoryValidation,
};
