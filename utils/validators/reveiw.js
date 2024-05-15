const {validationMiddleware} = require( '../../middlewares/validationMiddleware' );
const {check} = require( 'express-validator' );

const getReviewValidation = [
	check( 'id' ).isMongoId().withMessage( 'invalid mongoId' ),
	validationMiddleware,
];

const deleteReviewValidation = [
	check( 'id' ).isMongoId().withMessage( 'invalid mongoId' ),
	validationMiddleware,
];

const createReviewValidation = [
	check( 'rating' ).notEmpty().withMessage( 'rating is required' )
		.isLength( {
			min: 1,
			max: 5,
		} ).withMessage( 'rating must be between 1 and 5' ),
	
	check( 'user' ).isMongoId().withMessage( 'invalid user id' ),
	check( 'product' ).isMongoId().withMessage( 'invalid product id' ),
	validationMiddleware,
];

const updateReviewValidation = [
	check( 'rating' ).notEmpty().withMessage( 'rating is required' )
		.isLength( {
			min: 1,
			max: 5,
		} ).withMessage( 'rating must be between 1 and 5' ),
	check( 'id' ).isMongoId().withMessage( 'invalid id' ),
	validationMiddleware,
];

module.exports = {
	getReviewValidation,
	deleteReviewValidation,
	createReviewValidation,
	updateReviewValidation,
};