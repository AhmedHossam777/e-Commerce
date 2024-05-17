const Product = require( '../models/Product' );

const sharp = require( 'sharp' );

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

const resizeCoverImage = async ( req, res, next ) => {
	if (!req.files.imageCover) {
		console.log( req.files );
		return next();
	}
	const filename = `product-Cover-${uuidv4()}-${Date.now()}.jpeg`;
	console.log( filename );
	console.log( req.files.imageCover.buffer );
	
	await sharp( req.files.imageCover[0].buffer )
		.resize( 600, 600 )
		.toFormat( 'jpeg' )
		.jpeg( {quality: 90} )
		.toFile( `uploads/products/imageCover/${filename}` );
	
	req.body.imageCover = filename; // save image into DB
	
	next();
};

const resizeImages = ( req, res, next ) => {
	if (!req.files) {
		return next();
	}
	
	req.body.images = [];
	
	req.files.images.forEach( ( file ) => {
		const filename = `product-${uuidv4()}-${Date.now()}.jpeg`;
		
		sharp( file.buffer )
			.resize( 600, 600 )
			.toFormat( 'jpeg' )
			.jpeg( {quality: 90} )
			.toFile( `uploads/products/${filename}` );
		
		req.body.images.push( filename ); // save image into DB
	} );
	
	next();
};

const getAllProduct = getAll( Product );

const getProduct = getOne( Product );

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