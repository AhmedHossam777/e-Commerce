const express = require( 'express' );

const {
	getProductValidation,
	updateProductValidation,
	deleteProductValidation,
	createProductValidation,
} = require( '../utils/validators/products' );

const {checkBrandExists, checkCategoryExists, checkSubcategoryExists} = require( '../utils/validators/checkExistence' );

const {
	getAllProduct,
	getProduct,
	createProduct,
	updateProduct,
	deleteProduct,
	uploadProductImages,
	resizeCoverImage,
	resizeImages,
} = require( '../controllers/product' );

const router = express.Router( {mergeParams: true} );
const reviewRoutes = require( './review' );

router
	.route( '/' )
	.get( getAllProduct )
	.post(
		uploadProductImages,
		resizeCoverImage,
		resizeImages,
		createProductValidation,
		checkBrandExists,
		checkCategoryExists,
		checkSubcategoryExists,
		createProduct,
	);

router
	.route( '/:id' )
	.get( getProductValidation, getProduct )
	.patch(
		uploadProductImages,
		resizeCoverImage,
		resizeImages,
		updateProductValidation,
		updateProduct,
	)
	.delete( deleteProductValidation, deleteProduct );

//? Nested routes with reviews
router.use( '/:productId/reviews', reviewRoutes );

module.exports = router;