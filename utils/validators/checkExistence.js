const AppError = require( '../AppError' );
const Brand = require( '../../models/Brand' );
const SubCategory = require( '../../models/SubCategory' );
const Category = require( '../../models/Category' );
const Product = require( '../../models/Product' );
const asyncWrapper = require( 'express-async-handler' );

const checkCategoryExists = asyncWrapper( async ( req, res, next ) => {
	const {category} = req.body;
	const categoryExists = await Category.findById( category );
	if (!categoryExists) {
		return next( new AppError( 'Category does not exist', 404 ) );
	}
	next();
} );
const checkSubcategoryExists = asyncWrapper( async ( req, res, next ) => {
	if (req.body.subCategory) {
		const {subCategory} = req.body;
		const category = req.body.category || req.params.parent;
		const subCategoryExists = await SubCategory.findOne( {_id: subCategory, category} );
		if (!subCategoryExists) {
			return next( new AppError( 'SubCategory does not exist', 404 ) );
		}
	}
	next();
} );
const checkBrandExists = asyncWrapper( async ( req, res, next ) => {
	const {brand} = req.body;
	const brandExists = await Brand.findById( brand );
	if (!brandExists) {
		return next( new AppError( 'Brand does not exist', 404 ) );
	}
	next();
} );

const checkProductExists = asyncWrapper( async ( req, res, next ) => {
	const {product} = req.body;
	const productExists = await Product.findById( product );
	if (!productExists) {
		return next( new AppError( 'Product not found', 404 ) );
	}
	next();
} );

module.exports = {checkCategoryExists, checkSubcategoryExists, checkBrandExists, checkProductExists};