const express = require('express');

const {
  getBrandValidations,
  deleteBrandValidations,
  updateBrandValidations,
} = require('../utils/validators/brand');

const {
  getAllBrands,
  getBrand,
  createBrand,
  deleteBrand,
  updateBrand,
} = require('../controllers/brand');

const router = express.Router();

router.route('/').get(getAllBrands).post(createBrand);

router
  .route('/:id')
  .get(getBrandValidations, getBrand)
  .patch(updateBrandValidations, updateBrand)
  .delete(deleteBrandValidations, deleteBrand);

module.exports = router;
