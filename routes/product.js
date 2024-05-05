const express = require('express');

const {
  getProductValidation,
  updateProductValidation,
  deleteProductValidation,
  createProductValidation,
} = require('../utils/validators/products');

const {
  getAllProduct,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  uploadProductCoverImage,
  resizeImage,
} = require('../controllers/product');

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(getAllProduct)
  .post(
    uploadProductCoverImage,
    resizeImage,
    createProductValidation,
    createProduct
  );

router
  .route('/:id')
  .get(getProductValidation, getProduct)
  .patch(
    uploadProductCoverImage,
    resizeImage,
    updateProductValidation,
    updateProduct
  )
  .delete(deleteProductValidation, deleteProduct);

module.exports = router;
