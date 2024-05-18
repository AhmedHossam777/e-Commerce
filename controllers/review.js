const Review = require( '../models/Review' );
const Product = require( '../models/Product' );
const {getAll, getOne, deleteOne, updateOne, createOne} = require( './factoryHandlers' );

const getAllReviews = getAll( Review );
const getReview = getOne( Review );
const createReview = createOne( Review );
const deleteReview = deleteOne( Review );
const updateReview = updateOne( Review );

module.exports = {
	getReview,
	getAllReviews,
	createReview,
	deleteReview,
	updateReview,
};