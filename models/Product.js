const mongoose = require( 'mongoose' );
const slugify = require( 'slugify' );

const productSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: [true, 'Product name is required'],
			unique: [true, 'Product must be unique, it already exists'],
			minlength: [3, 'Too short Product name'],
			maxlength: [128, 'Too long Product name'],
			trim: true,
		},
		slug: {
			type: String,
			lowercase: true,
		},
		description: {
			type: String,
			required: [true, 'description is required'],
			minlength: [10, 'too short description'],
		},
		quantity: {
			type: Number,
			required: [true, 'product quantity is required'],
		},
		sold: {
			type: Number,
			default: 0,
		},
		price: {
			type: Number,
			required: [true, 'product must have a price'],
			trim: true,
		},
		priceAfterDiscount: {
			type: Number,
		},
		color: [
			{
				type: String,
			},
		],
		imageCover: {
			type: String,
			required: [true, 'product image cover is required'],
		},
		images: [
			{
				type: String,
			},
		],
		category: {
			type: mongoose.Schema.ObjectId,
			ref: 'Category',
			required: [true, 'Product must belong to category'],
		},
		subCategory: {
			type: mongoose.Schema.ObjectId,
			ref: 'SubCategory',
			// required: [true, 'Product must belong to subCategory'],
		},
		brand: {
			type: mongoose.Schema.ObjectId,
			ref: 'Brand',
		},
		ratingsAverage: {
			type: Number,
			min: [1, 'Rating must be equal or above 1'],
			max: [5, 'Rating must be equal or below 5'],
		},
		ratingsQuantity: {
			type: Number,
			default: 0,
		},
	},
	{timestamps: true, toJSON: {virtuals: true}, toObject: {virtuals: true}},
);

productSchema.virtual( 'reviews', {
	ref: 'Review',
	foreignField: 'product',
	localField: '_id',
} );

productSchema.pre( 'save', async function ( next ) {
	if (!this.isModified( 'title' )) return next();
	this.slug = slugify( this.title );
	next();
} );

// population using mongoose middleware
productSchema.pre( /^find/, function ( next ) {
	this.populate( {
		path: 'category',
		select: 'name -_id',
	} );
	next();
} );

productSchema.post( 'init', function () {
	if (this.imageCover) {
		this.imageCover = `${process.env.BASE_URL}/products/imageCover/${this.imageCover}`;
	}
	if (this.images) {
		this.images = this.images.map(
			( image ) => `${process.env.BASE_URL}/products/${image}`,
		);
	}
} );

productSchema.post( 'save', function () {
	if (this.imageCover) {
		this.imageCover = `${process.env.BASE_URL}/products/imageCover/${this.imageCover}`;
	}
	if (this.images) {
		this.images = this.images.map(
			( image ) => `${process.env.BASE_URL}/products/${image}`,
		);
	}
} );

const Product = mongoose.model( 'Product', productSchema );

module.exports = Product;