const {check} = require( 'express-validator' );

const {
	validationMiddleware,
} = require( '../../middlewares/validationMiddleware' );

const getUserValidation = [
	check( 'id' ).isMongoId().withMessage( 'invalid user id format' ),
	validationMiddleware,
];

const updateUserValidation = [
	check( 'id' ).isMongoId().withMessage( 'invalid user id format' ),
	validationMiddleware,
];

const deleteUserValidation = [
	check( 'id' ).isMongoId().withMessage( 'invalid user id format' ),
	validationMiddleware,
];

const createUserValidation = [
	check( 'username' )
		.notEmpty()
		.withMessage( 'username is required' )
		.isString()
		.withMessage( 'username must be a string' )
		.isLength( {min: 3} )
		.withMessage( 'username must be at least 3 characters' ),
	
	check( 'email' )
		.notEmpty()
		.withMessage( 'email is required' )
		.isEmail()
		.withMessage( 'email must be a valid email' ),
	
	check( 'password' )
		.notEmpty()
		.withMessage( 'password is required' )
		.isLength( {min: 6} )
		.withMessage( 'password must be at least 6 characters' ),
	check( 'phone' )
		.isMobilePhone()
		.withMessage( 'phone must be a valid phone number' )
		.notEmpty()
		.withMessage( 'phone is required' ),
	
	check( 'address' )
		.isString()
		.withMessage( 'address must be a string' )
		.notEmpty()
		.withMessage( 'address is required' ),
	
	validationMiddleware,
];

module.exports = {
	getUserValidation,
	updateUserValidation,
	deleteUserValidation,
	createUserValidation,
};