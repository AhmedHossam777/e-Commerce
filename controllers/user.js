const asyncWrapper = require('express-async-handler');
const User = require('../models/User');
const AppError = require('../utils/AppError');
const ApiFeatures = require('../utils/ApiFeatures');

const { uploadSingleImage } = require('../middlewares/uploadImageMiddleware');

const { deleteOne, getOne, updateOne, getAll } = require('./factoryHandlers');

const getAllUsers = getAll(User);
const updateUser = updateOne(User);
const getUser = getOne(User);
const deleteUser = deleteOne(User);

const uploadUserImage = uploadSingleImage('image');

const resizeImage = (req, res, next) => {
  if (!req.file) {
    return next();
  }
  const filename = `user-${uuidv4()}-${Date.now()}.jpeg`;

  sharp(req.file.buffer)
    .resize(600, 600)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`uploads/users/${filename}`);

  req.body.image = filename; // save image into DB

  next();
};

module.exports = {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
  resizeImage,
  uploadUserImage,
};
