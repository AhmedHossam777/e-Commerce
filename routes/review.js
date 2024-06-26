const express = require( 'express' );
const {isBelong} = require( '../middlewares/isBelong' );
const Review = require( '../models/Review' );

const {getReview, getAllReviews, createReview, updateReview, deleteReview} = require( '../controllers/review' );
const {checkProductExists} = require( '../utils/validators/checkExistence' );

const {
	createReviewValidation,
	updateReviewValidation,
	deleteReviewValidation,
	getReviewValidation,
	getReviewsValidation,
} = require( '../utils/validators/reveiw' );

const auth = require( '../middlewares/auth' );

const router = express.Router( {mergeParams: true} );

router.route( '/' )
	.get( getReviewsValidation, getAllReviews )
	.post( auth, checkProductExists, createReviewValidation, createReview );

router.route( '/:id' )
	.get( getReviewValidation, getReview )
	.patch( auth, isBelong( Review ), updateReviewValidation, updateReview )
	.delete( auth, isBelong( Review ), deleteReviewValidation, deleteReview );

module.exports = router;