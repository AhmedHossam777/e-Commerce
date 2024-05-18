const {validationMiddleware} = require( '../../middlewares/validationMiddleware' );
const {check} = require( 'express-validator' );

const getReviewValidation = [
	check( 'id' ).isMongoId().withMessage( 'invalid mongoId' ),
	check( 'productId' ).optional().isMongoId().withMessage( 'invalid product id' ),
	validationMiddleware,
];

const getReviewsValidation = [
	check( 'productId' ).optional().isMongoId().withMessage( 'invalid product id' ),
	validationMiddleware,
];

const deleteReviewValidation = [
	check( 'id' ).isMongoId().withMessage( 'invalid mongoId' ),
	validationMiddleware,
];

const createReviewValidation = [
	check( 'ratings' ).isFloat( {
		min: 1,
		max: 5,
	} ).withMessage( 'rating must be between 1 and 5' ),
	
	check( 'product' ).isMongoId().withMessage( 'invalid product id' ),
	
	validationMiddleware,
];

const updateReviewValidation = [
	check( 'ratings' ).notEmpty().withMessage( 'rating is required' )
		.isFloat( {
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
	getReviewsValidation,
};