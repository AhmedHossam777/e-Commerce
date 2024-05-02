const asyncWrapper = require('express-async-handler');
const User = require('../models/User');
const AppError = require('../utils/AppError');
const ApiFeatures = require('../utils/ApiFeatures');

const { deleteOne, getOne, updateOne, getAll } = require('./factoryHandlers');

const getAllUsers = getAll(User);
const updateUser = updateOne(User);
const getUser = getOne(User);
const deleteUser = deleteOne(User);

const uploadProfileImage = asyncWrapper(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    return next(new AppError('unAuthorized', 401));
  }
  if (!req.file) {
    return next(new AppError('Please upload an image', 400));
  }
  const updatedUser = await User.findByIdAndUpdate(
    req.user.id,
    {
      profileImage: req.file.path,
    },
    { new: true }
  );

  res.status(200).json({ status: 'success', updatedUser });
});

const deleteProfileImage = asyncWrapper(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    return next(new AppError('unAuthorized', 401));
  }
  const updated = await User.findByIdAndUpdate(
    req.user.id,
    {
      profileImage: '',
    },
    { new: true }
  );

  res.status(200).json({ status: 'success', updated });
});

module.exports = {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
  uploadProfileImage,
  deleteProfileImage,
};
