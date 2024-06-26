const Product = require( '../models/Product' );

const sharp = require( 'sharp' );
const asyncWrapper = require( 'express-async-handler' );

const {uploadMixOfImages} = require( '../middlewares/uploadImageMiddleware' );

const {v4: uuidv4} = require( 'uuid' );

const {
	deleteOne,
	updateOne,
	getOne,
	createOne,
	getAll,
} = require( './factoryHandlers' );

const uploadProductImages = uploadMixOfImages( [
	{name: 'images', maxCount: 5},
	{name: 'imageCover', maxCount: 1},
] );
const resizeCoverImage = asyncWrapper( async ( req, res, next ) => {
	console.log( 'Files received:', req.files );
	if (!req.files || !req.files.imageCover || req.files.imageCover.length === 0) {
		return next();
	}
	const filename = `product-Cover-${uuidv4()}-${Date.now()}.jpeg`;
	
	await sharp( req.files.imageCover[0].buffer )
		.resize( 600, 600 )
		.toFormat( 'jpeg' )
		.jpeg( {quality: 90} )
		.toFile( `uploads/products/imageCover/${filename}` );
	
	req.body.imageCover = filename; // save image into DB
	
	next();
} );

const resizeImages = asyncWrapper( async ( req, res, next ) => {
	console.log( 'Files received:', req.files );
	if (!req.files || !req.files.images || req.files.images.length === 0) {
		return next();
	}
	
	req.body.images = [];
	
	for ( const file of req.files.images ) {
		const filename = `product-${uuidv4()}-${Date.now()}.jpeg`;
		
		await sharp( file.buffer )
			.resize( 600, 600 )
			.toFormat( 'jpeg' )
			.jpeg( {quality: 90} )
			.toFile( `uploads/products/${filename}` );
		
		req.body.images.push( filename ); // save image into DB
	}
	
	next();
} );

const getAllProduct = getAll( Product );

const getProduct = getOne( Product, 'reviews' );

const updateProduct = updateOne( Product );

const deleteProduct = deleteOne( Product );

const createProduct = createOne( Product );

module.exports = {
	createProduct,
	getAllProduct,
	getProduct,
	updateProduct,
	deleteProduct,
	uploadProductImages,
	resizeCoverImage,
	resizeImages,
};