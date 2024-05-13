const express = require('express');

const {
  getBrandValidations,
  deleteBrandValidations,
  updateBrandValidations,
  createBrandValidator,
} = require('../utils/validators/brand');

const {
  getAllBrands,
  getBrand,
  createBrand,
  deleteBrand,
  updateBrand,
  uploadBrandImage,
  resizeImage,
} = require('../controllers/brand');

const router = express.Router();

router
  .route('/')
  .get(getAllBrands)
  .post(createBrandValidator, uploadBrandImage, resizeImage, createBrand);

router
  .route('/:id')
  .get(getBrandValidations, getBrand)
  .patch(uploadBrandImage, resizeImage, updateBrandValidations, updateBrand)
  .delete(deleteBrandValidations, deleteBrand);

module.exports = router;
