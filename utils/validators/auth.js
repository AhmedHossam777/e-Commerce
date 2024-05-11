const slugify = require('slugify');
const { check } = require('express-validator');
const User = require('../../models/User');
const {
  validationMiddleware,
} = require('../../middlewares/validationMiddleware');
const AppError = require('../../utils/AppError');

const signupValidator = [
  check('username')
    .notEmpty()
    .withMessage('username is required')
    .isLength({ min: 3 })
    .withMessage('Too short username')
    .isLength({ max: 32 })
    .withMessage('Too Long username')
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),

  check('email')
    .notEmpty()
    .withMessage('email is required')
    .isEmail()
    .withMessage('invalid email address')
    .isLength({ min: 5 })
    .withMessage('Too short email')
    .isLength({ max: 32 })
    .withMessage('Too Long email')
    .custom(async (val) => {
      const user = await User.findOne({ email: val });
      if (user) {
        throw new AppError('user is already exist', 400);
      }
      return true;
    }),

  check('password')
    .notEmpty()
    .withMessage('password is required')
    .isLength({ min: 5 })
    .withMessage('Too short password'),

  check('phone')
    .notEmpty()
    .withMessage('phone is required')
    .isMobilePhone()
    .withMessage('invalid phone number'),

  validationMiddleware,
];

const loginValidator = [
  check('email')
    .notEmpty()
    .withMessage('email is required')
    .isEmail()
    .withMessage('invalid email address')
    .custom(async (val) => {
      const user = await User.findOne({ email: val });
      if (!user) {
        throw new AppError('user is not exist', 404);
      }
      return true;
    }),
  check('password')
    .notEmpty()
    .withMessage('Password required')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters'),

  validationMiddleware,
];

const resetPasswordValidator = [
  check('password')
    .notEmpty()
    .withMessage('Password required')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters'),
  check('email')
    .notEmpty()
    .withMessage('Email required')
    .isEmail()
    .withMessage('Invalid email address')
    .custom(async (val) => {
      const user = await User.findOne({ email: val });
      if (!user) {
        throw new AppError('user is not exist', 404);
      }
      return true;
    }),
  check('otp').isEmpty().withMessage('OTP required'),

  validationMiddleware,
];

const changePasswordValidator = [
  check('password')
    .notEmpty()
    .withMessage('Password required')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters'),
  check('oldPassword')
    .notEmpty()
    .withMessage('Old password required')
    .isLength({ min: 6 })
    .withMessage('Old password must be at least 6 characters'),
  check('email')
    .isEmpty()
    .withMessage('Email required')
    .isEmail()
    .withMessage('Invalid email address'),
  validationMiddleware,
];

const forgetPasswordValidator = [
  check('email')
    .notEmpty()
    .withMessage('email is required')
    .isEmail()
    .withMessage('invalid email address')
    .custom(async (val) => {
      const user = await User.findOne({ email: val });
      if (!user) {
        throw new AppError('user is not exist', 404);
      }
    }),
  validationMiddleware,
];

module.exports = {
  signupValidator,
  loginValidator,
  resetPasswordValidator,
  changePasswordValidator,
  forgetPasswordValidator,
};
