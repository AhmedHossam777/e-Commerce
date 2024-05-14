const express = require( 'express' );

const {getReview, getAllReviews, createReview, updateReview, deleteReview} = require( '../controllers/review' );
const auth = require( '../middlewares/auth' );

const router = express.Router();

router.route( '/' )
	.get( getAllReviews )
	.post( auth, createReview )
	.get( getReview )
	.patch( auth, updateReview )
	.delete( auth, deleteReview );

module.exports = router;