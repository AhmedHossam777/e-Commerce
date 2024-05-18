const {
	validationMiddleware,
} = require( '../../middlewares/validationMiddleware' );

const {check} = require( 'express-validator' );
const {checkCategoryExists} = require( './checkExistence' );

const getAllSubCategoryValidation = [
	check( 'category' )
		.optional()
		.isMongoId()
		.withMessage( 'invalid category id format' ),
	validationMiddleware,
	checkCategoryExists,
];

const getSubCategoryValidation = [
	check( 'id' ).isMongoId().withMessage( 'invalid subCategory id format' ),
	validationMiddleware,
];

const createSubCategoryValidation = [
	check( 'category' )
		.isMongoId()
		.withMessage( 'invalid category id format' )
		.notEmpty()
		.withMessage( 'parent category is required' ),
	
	check( 'name' ).notEmpty().withMessage( 'subCategory name is required' ),
	validationMiddleware,
	checkCategoryExists,
];

const updateSubCategoryValidation = [
	check( 'id' ).isMongoId().withMessage( 'invalid subCategory id format' ),
	validationMiddleware,
];

const deleteSubCategoryValidation = [
	check( 'id' ).isMongoId().withMessage( 'invalid subCategory id format' ),
	validationMiddleware,
];

module.exports = {
	getAllSubCategoryValidation,
	getSubCategoryValidation,
	createSubCategoryValidation,
	updateSubCategoryValidation,
	deleteSubCategoryValidation,
};