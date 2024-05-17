const express = require( 'express' );

const {
	getCategoryValidator,
	updateCategoryValidator,
	deleteCategoryValidator,
} = require( '../utils/validators/category' );

const {
	getCategories,
	createCategory,
	getCategory,
	updateCategory,
	deleteCategory,
	uploadCategoryImage,
	resizeImage,
} = require( '../controllers/category' );

const subCategoriesRoute = require( './subCategory' );

const router = express.Router();

router
	.route( '/' )
	.get( getCategories )
	.post( uploadCategoryImage, resizeImage, createCategory );

router
	.route( '/:id' )
	.get( getCategoryValidator, getCategory )
	.patch(
		uploadCategoryImage,
		resizeImage,
		updateCategoryValidator,
		updateCategory,
	)
	.delete( deleteCategoryValidator, deleteCategory );

router.use( '/:parent/subCategories', subCategoriesRoute );

module.exports = router;