const mongoose = require('mongoose');
const slugify = require('slugify');

const brandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Brand name is required'],
      unique: [true, 'Brand must be unique, it already exists'],
      minlength: [3, 'Too short Brand name'],
      maxlength: [32, 'Too long Brand name'],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true, virtuals: true, validateBeforeSave: true }
);

brandSchema.pre('save', function (next) {
  if (!this.isModified('name')) return next();
  console.log('update');
  this.slug = slugify(this.name);
  next();
});

brandSchema.post('init', function () {
  if (this.image) {
    this.image = `${process.env.BASE_URL}/brands/${this.image}`;
  }
});

brandSchema.post('save', function () {
  if (this.image) {
    this.image = `${process.env.BASE_URL}/brands/${this.image}`;
  }
});

const Brand = mongoose.model('Brand', brandSchema);
module.exports = Brand;
