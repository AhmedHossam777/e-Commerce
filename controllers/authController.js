const asyncWrapper = require('express-async-handler');

const User = require('../models/User');

const {
  generateAccessToken,
  generateRefreshToken,
} = require('../utils/generateTokens');

const AppError = require('./../utils/AppError');

const emailService = require('../utils/emailService');
const {
  generateOTP,
  generateSecret,
  verifyOTP,
} = require('../utils/OTPServices');

const register = asyncWrapper(async (req, res, next) => {
  const user = await User.create({ username, email, password, phone });

  const [accessToken, refreshToken] = await Promise.all([
    generateAccessToken(user._id),
    generateRefreshToken(user._id),
  ]);

  res.status(201).json({
    status: 'success',
    user,
    accessToken,
    refreshToken,
  });
});

const login = asyncWrapper(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select('+password');
  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('invalid email or password', 401));
  }
  const [accessToken, refreshToken] = await Promise.all([
    generateAccessToken(user._id),
    generateRefreshToken(user._id),
  ]);

  res.status(200).json({
    status: 'success',
    accessToken,
    refreshToken,
  });
});

const secret = generateSecret();

const forgetPassword = asyncWrapper(async (req, res, next) => {
  const { email } = req.body;
  const otp = generateOTP(secret);

  await emailService.sendVerificationEmail(email, otp);

  res
    .status(200)
    .json({ status: 'success', message: 'OTP sent to your email' });
});

const resetPassword = asyncWrapper(async (req, res, next) => {
  const { email, otp, password } = req.body;
  if (!email || !otp || !password) {
    return next(new AppError('please provide all fields', 400));
  }
  const user = await User.findOne({ email: email });
  if (!user) {
    return next(new AppError('no user found with this email', 404));
  }

  const isVerified = verifyOTP(otp, secret);
  if (!isVerified) {
    return next(new AppError('invalid otp', 401));
  }
  user.password = password;
  await user.save();
  res
    .status(200)
    .json({ status: 'success', message: 'Password reset successful' });
});

const changePassword = asyncWrapper(async (req, res, next) => {
  const { email, oldPassword, newPassword } = req.body;
  const user = await User.findOne({ email: email }).select('+password');
  if (!user) {
    return next(new AppError('unAuthorized', 401));
  }
  if (!(await user.correctPassword(oldPassword, user.password))) {
    return next(new AppError('invalid password', 401));
  }

  user.password = newPassword;
  await user.save();
  res
    .status(200)
    .json({ status: 'success', message: 'Password changed successfully' });
});

const logout = asyncWrapper(async (req, res, next) => {
  res.clearCookie('refreshToken');
  res
    .status(200)
    .json({ status: 'success', message: 'Logged out successfully' });
});

module.exports = {
  register,
  login,
  forgetPassword,
  resetPassword,
  changePassword,
  logout,
};
