const { check } = require('express-validator');
const {
  validationMiddleware,
} = require('../../middlewares/validationMiddleware');

const getCategoryValidator = [
  check('id').isMongoId().withMessage('invalid mongo id'),
  validationMiddleware,
];


const updateCategoryValidator = [
  check('id').isMongoId().withMessage('invalid mongo id'),
  validationMiddleware,
];

const deleteCategoryValidator = [
  check('id').isMongoId().withMessage('invalid mongo id'),
  validationMiddleware,
];


module.exports = { getCategoryValidator, updateCategoryValidator, deleteCategoryValidator };
