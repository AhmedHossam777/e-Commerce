const {v4: uuidv4} = require( 'uuid' );
const sharp = require( 'sharp' );

const {uploadSingleImage} = require( '../middlewares/uploadImageMiddleware' );

const uploadCategoryImage = uploadSingleImage( 'image' );

const resizeImage = ( req, res, next ) => {
	if (!req.file) {
		return next();
	}
	const filename = `category-${uuidv4()}-${Date.now()}.jpeg`;
	
	sharp( req.file.buffer )
		.resize( 600, 600 )
		.toFormat( 'jpeg' )
		.jpeg( {quality: 90} )
		.toFile( `uploads/categories/${filename}` );
	
	req.body.image = filename; // save image into DB
	
	next();
};

const {
	deleteOne,
	updateOne,
	getOne,
	createOne,
	getAll,
} = require( './factoryHandlers' );

const Category = require( '../models/Category' );

const getCategories = getAll( Category );

const createCategory = createOne( Category );

const getCategory = getOne( Category );

const updateCategory = updateOne( Category );

const deleteCategory = deleteOne( Category );

module.exports = {
	getCategories,
	createCategory,
	getCategory,
	updateCategory,
	deleteCategory,
	uploadCategoryImage,
	resizeImage,
};