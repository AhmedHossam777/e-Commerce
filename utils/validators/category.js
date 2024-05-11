const { check } = require('express-validator');
const {
  validationMiddleware,
} = require('../../middlewares/validationMiddleware');
const { default: slugify } = require('slugify');

const getCategoryValidator = [
  check('id').isMongoId().withMessage('invalid mongo id'),
  validationMiddleware,
];

const createCategoryValidator = [
  check('name')
    .notEmpty()
    .withMessage('category name is required')
    .isLength({ min: 3 })
    .withMessage('Too short category name')
    .isLength({ max: 32 })
    .withMessage('Too long category name')
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
  validationMiddleware,
];

const updateCategoryValidator = [
  check('id').isMongoId().withMessage('invalid mongo id'),
  check('name')
    .optional()
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
  validationMiddleware,
];

const deleteCategoryValidator = [
  check('id').isMongoId().withMessage('invalid mongo id'),
  validationMiddleware,
];

module.exports = {
  getCategoryValidator,
  updateCategoryValidator,
  deleteCategoryValidator,
  createCategoryValidator,
};
