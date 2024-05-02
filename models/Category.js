const mongoose = require('mongoose');
const slugify = require('slugify');

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Category name is required'],
      unique: [true, 'Category must be unique, it already exists'],
      minlength: [3, 'Too short category name'],
      maxlength: [32, 'Too long category name'],
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

categorySchema.pre('save', async function (next) {
  if (!this.isModified('name')) return next();
  this.slug = slugify(this.name);
  next();
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
