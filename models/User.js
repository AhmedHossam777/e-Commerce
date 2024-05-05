const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const slugify = require('slugify');

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50,
    },
    slug: {
      type: String,
      lowercase: true,
    },
    email: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 255,
      unique: true,
      validator: [validator.isEmail, 'Invalid email'],
    },
    password: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 1024,
      select: false,
    },
    phone: {
      type: String,
      required: true,
      validator: [validator.isMobilePhone, 'Invalid phone number'],
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    address: {
      type: String,
      required: [true, 'Address is required'],
      trim: true,
    },
    image: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
    validateBeforeSave: true,
    toJSON: { virtuals: true },
  }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

productSchema.pre('save', async function (next) {
  if (!this.isModified('username')) return next();
  this.slug = slugify(this.username);
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model('User', userSchema);
module.exports = User;
