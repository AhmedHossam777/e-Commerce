const mongoose = require( 'mongoose' );

const reviewSchema = new mongoose.Schema( {
	title: {
		type: String,
	},
	ratings: {
		type: Number,
		min: [1, 'Min rating value is 1.0'],
		max: [1, 'Max rating value is 5.0'],
		require: [true, 'rating is required'],
	},
	user: {
		type: mongoose.Schema.ObjectId,
		ref: 'User',
		required: [true, 'user id is required'],
	},
	product: {
		type: mongoose.Schema.ObjectId,
		ref: 'Product',
		required: [true, 'product id is required'],
	},
}, {timestamps: true, virtuals: true, validateBeforeSave: true} );

const Review = mongoose.model( 'Review', reviewSchema );

module.exports = Review;