const {
  validationMiddleware,
} = require('../../middlewares/validationMiddleware');

const { check } = require('express-validator');

const getProductValidation = [
  check('id').isMongoId().withMessage('invalid mongo id format'),
  validationMiddleware,
];

const updateProductValidation = [
  check('id').isMongoId().withMessage('invalid mongo id format'),
  validationMiddleware,
];

const deleteProductValidation = [
  check('id').isMongoId().withMessage('invalid mongo id format'),
  validationMiddleware,
];

const createProductValidation = [
  check('title')
    .notEmpty()
    .withMessage('product title is required')
    .isLength({ min: 3 })
    .withMessage('Too short product name')
    .isLength({ max: 32 })
    .withMessage('Too long product name')
    .custom(async (val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),

  check('category')
    .isMongoId()
    .withMessage('invalid category id format'),

  check('subCategory')
    .optional()
    .isMongoId()
    .withMessage('invalid subCategory id format'),

  check('brand').optional().isMongoId().withMessage('invalid brand id format'),

  check('description')
    .notEmpty()
    .withMessage('description is required')
    .isLength({ min: 19 })
    .withMessage('Too short description'),

  check('quantity').notEmpty().withMessage('quantity is required'),

  check('price').notEmpty().withMessage('price is required'),

  check('imageCover').notEmpty().withMessage('imageCover is required'),
  validationMiddleware,
];

module.exports = {
  getProductValidation,
  updateProductValidation,
  deleteProductValidation,
  createProductValidation,
};