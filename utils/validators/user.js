const { check } = require('express-validator');

const {
  validationMiddleware,
} = require('../../middlewares/validationMiddleware');

const getUserValidation = [
  check('id').isMongoId().withMessage('invalid user id format'),
  validationMiddleware,
];

const updateUserValidation = [
  check('id').isMongoId().withMessage('invalid user id format'),
  validationMiddleware,
];

const deleteUserValidation = [
  check('id').isMongoId().withMessage('invalid user id format'),
  validationMiddleware,
];

module.exports = {
  getUserValidation,
  updateUserValidation,
  deleteUserValidation,
};
