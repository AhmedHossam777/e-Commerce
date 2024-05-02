const { check } = require('express-validator');
const {
  validationMiddleware,
} = require('../../middlewares/validationMiddleware');

const getBrandValidations = [
  check('id').isMongoId().withMessage('invalid mongo id format'),
  validationMiddleware,
];

const updateBrandValidations = [
  check('id').isMongoId().withMessage('invalid mongo id format'),
  validationMiddleware,
];

const deleteBrandValidations = [
  check('id').isMongoId().withMessage('invalid mongo id format'),
  validationMiddleware,
];

module.exports = {
  deleteBrandValidations,
  getBrandValidations,
  updateBrandValidations,
};
