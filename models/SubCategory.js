const mongoose = require('mongoose');
const slugify = require('slugify');

const subCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, 'SubCategory name is required'],
      unique: [true, 'SubCategory must be unique, it already exists'],
      minlength: [2, 'Too short SubCategory name'],
      maxlength: [32, 'Too long SubCategory name'],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    parent: {
      type: mongoose.Schema.ObjectId,
      ref: 'Category',
      required: [true, 'SubCategory must belong to parent category'],
    },
  },
  { timestamps: true, virtuals: true, validateBeforeSave: true }
);

subCategorySchema.pre('save', async function (next) {
  if (!this.isModified('name')) return next();
  this.slug = slugify(this.name);
  next();
});

subCategorySchema.pre(/^find/, function (next) {
  this.populate({
    path: 'parent',
    select: 'name',
  });
  next()
});

const SubCategory = mongoose.model('SubCategory', subCategorySchema);

module.exports = SubCategory;
