const auth = require('../middlewares/auth');
const isAdmin = require('../middlewares/isAdmin');

const { getUserValidation } = require('../utils/validators/user');
const {
  signupValidator,
  loginValidator,
  resetPasswordValidator,
  changePasswordValidator,
  forgetPasswordValidator,
} = require('../utils/validators/auth');

const {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
  uploadProfileImage,
  deleteProfileImage,
} = require('../controllers/user');

const {
  register,
  login,
  forgetPassword,
  resetPassword,
  changePassword,
  logout,
} = require('../controllers/authController');

const express = require('express');
const router = express.Router();

// auth
router.route('/register').post(signupValidator, register);
router.route('/login').post(loginValidator, login);
router.route('/forget-password').post(forgetPasswordValidator, forgetPassword);
router.route('/reset-password').post(resetPasswordValidator, resetPassword);
router.route('/change-password').post(changePasswordValidator, changePassword);
router.route('/logout').get(logout);

// user routes
router
  .route('/')
  .get(auth, isAdmin, getAllUsers)
  .patch(auth, updateUser)
  .delete(auth, deleteUser);
router.route('/:id').get(auth, getUserValidation, getUser);

router.route('/upload-profile-image').patch(auth, uploadProfileImage);
router.route('/delete-profile-image').patch(auth, deleteProfileImage);

module.exports = router;
