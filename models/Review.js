const mongoose = require( 'mongoose' );

const reviewSchema = new mongoose.Schema( {
	title: {
		type: String,
	},
	ratings: {
		type: Number,
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

reviewSchema.pre( /^find/, function ( next ) { // populate user field with username
	this.populate( {
		path: 'user',
		select: 'username',
	} );
	next();
} );

const Review = mongoose.model( 'Review', reviewSchema );

module.exports = Review;