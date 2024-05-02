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
  check('category')
    .optional()
    .isMongoId()
    .withMessage('invalid category id format'),
  check('subCategory')
    .optional()
    .isMongoId()
    .withMessage('invalid subCategory id format'),
  check('brand').optional().isMongoId().withMessage('invalid brand id format'),
  validationMiddleware,
];

module.exports = {
  getProductValidation,
  updateProductValidation,
  deleteProductValidation,
  createProductValidation,
};
