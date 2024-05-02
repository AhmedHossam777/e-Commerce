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
} = require('../controllers/product');

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(getAllProduct)
  .post(createProductValidation, createProduct);

router
  .route('/:id')
  .get(getProductValidation, getProduct)
  .patch(updateProductValidation, updateProduct)
  .delete(deleteProductValidation, deleteProduct);

module.exports = router;
