const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  title: {
    type: String
  },
  ratings: {
    type: Number,
    min: [1, 'Min rating value is 1.0'],
    max: [1, 'Max rating value is 5.0']
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  product: {
    type: mongoose.Schema.ObjectId,
    ref: 'Product'
  }
}, { timestamps: true, virtuals: true, validateBeforeSave: true });


const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;