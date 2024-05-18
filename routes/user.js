const auth = require( '../middlewares/auth' );
const isAdmin = require( '../middlewares/isAdmin' );

const {
	getUserValidation,
	updateUserValidation,
	deleteUserValidation,
	createUserValidation,
} = require( '../utils/validators/user' );

const {
	signupValidator,
	loginValidator,
	resetPasswordValidator,
	changePasswordValidator,
	forgetPasswordValidator,
} = require( '../utils/validators/auth' );

const {
	getAllUsers,
	getUser,
	updateUser,
	deleteUser,
	resizeImage,
	uploadUserImage,
} = require( '../controllers/user' );

const {
	register,
	login,
	forgetPassword,
	resetPassword,
	changePassword,
	logout,
} = require( '../controllers/authController' );

const express = require( 'express' );
const router = express.Router();

// auth
router.route( '/register' ).post( createUserValidation, register );
router.route( '/login' ).post( loginValidator, login );
router.route( '/forget-password' ).post( forgetPasswordValidator, forgetPassword );
router.route( '/reset-password' ).post( resetPasswordValidator, resetPassword );
router.route( '/change-password' ).post( changePasswordValidator, changePassword );
router.route( '/logout' ).get( logout );

// user routes
router
	.route( '/' )
	.get( auth, isAdmin, getAllUsers )
	.patch( auth, uploadUserImage, resizeImage, updateUserValidation, updateUser )
	.delete( auth, deleteUserValidation, deleteUser );
router.route( '/:id' ).get( auth, getUserValidation, getUser );

module.exports = router;