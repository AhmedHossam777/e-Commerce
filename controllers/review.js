const Review = require( '../models/Review' );
const {getAll, getOne, deleteOne, updateOne, createOne} = require( './factoryHandlers' );
const asyncWrapper = require( 'express-async-handler' );
const slugify = require( 'slugify' );
const AppError = require( '../utils/AppError' );
const Product = require( '../models/Product' );
const User = require( '../models/User' );

const getAllReviews = getAll( Review );
const getReview = getOne( Review );
const deleteReview = deleteOne( Review );
const updateReview = updateOne( Review );

const createReview = asyncWrapper( async ( req, res, next ) => {
	
	const user = await User.findById( req.user.id );
	const product = await Product.findById( req.body.product );
	
	if (!user || !product) return next( new AppError( 'User or Product Not Found!', 404 ) );
	
	const review = await Review.create( req.body );
	
	res.status( 201 ).json( {
		status: 'success',
		review,
	} );
} );

module.exports = {
	getReview,
	getAllReviews,
	createReview,
	deleteReview,
	updateReview,
};