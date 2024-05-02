const auth = require('../middlewares/auth');
const isAdmin = require('../middlewares/isAdmin');

const { getUserValidation } = require('../utils/validators/user');

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

const storage = require('../config/cloudinary');
const multer = require('multer');

const upload = multer({ storage });

const express = require('express');
const router = express.Router();

// auth
router.route('/register').post(register);
router.route('/login').post(login);
router.route('/forget-password').post(forgetPassword);
router.route('/reset-password').post(resetPassword);
router.route('/change-password').post(changePassword);
router.route('/logout').get(logout);

// user routes
router
  .route('/')
  .get(auth, isAdmin, getAllUsers)
  .patch(auth, updateUser)
  .delete(auth, deleteUser);
router.route('/:id').get(auth, getUserValidation, getUser);

router
  .route('/upload-profile-image')
  .patch(auth, upload.single('profile'), uploadProfileImage);
router.route('/delete-profile-image').patch(auth, deleteProfileImage);

module.exports = router;
