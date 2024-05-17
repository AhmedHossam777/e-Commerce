const Brand = require( '../models/Brand' );
const sharp = require( 'sharp' );

const {uploadSingleImage} = require( '../middlewares/uploadImageMiddleware' );

const {v4: uuidv4} = require( 'uuid' );

const {
	deleteOne,
	updateOne,
	getOne,
	createOne,
	getAll,
} = require( './factoryHandlers' );

const uploadBrandImage = uploadSingleImage( 'image' );

const resizeImage = ( req, res, next ) => {
	if (!req.file) {
		return next();
	}
	const filename = `brand-${uuidv4()}-${Date.now()}.jpeg`;
	
	sharp( req.file.buffer )
		.resize( 600, 600 )
		.toFormat( 'jpeg' )
		.jpeg( {quality: 90} )
		.toFile( `uploads/brands/${filename}` );
	
	req.body.image = filename; // save image into DB
	
	next();
};

const getAllBrands = getAll( Brand );

const getBrand = getOne( Brand );

const createBrand = createOne( Brand );

const updateBrand = updateOne( Brand );

const deleteBrand = deleteOne( Brand );

module.exports = {
	createBrand,
	getAllBrands,
	getBrand,
	updateBrand,
	deleteBrand,
	uploadBrandImage,
	resizeImage,
};