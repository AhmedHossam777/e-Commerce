const Review = require( '../models/Review' );
const {getAll, getOne, deleteOne, updateOne, createOne} = require( './factoryHandlers' );

const getAllReviews = getAll( Review );
const getReview = getOne( Review );
const deleteReview = deleteOne( Review );
const updateReview = updateOne( Review );

const createReview = createOne( Review );

module.exports = {
	getReview,
	getAllReviews,
	createReview,
	deleteReview,
	updateReview,
};