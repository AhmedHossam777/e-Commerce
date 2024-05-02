require('dotenv').config();
const asyncWrapper = require('express-async-handler');
const express = require('express');
const morgan = require('morgan');
const connectDB = require('./config/connectDB');
const globalErrorHandler = require('./middlewares/globalErrorHandler');
const AppError = require('./utils/AppError');

const categoryRoutes = require('./routes/category');
const subCategoryRoutes = require('./routes/subCategory');
const brandRoutes = require('./routes/brand');
const productRoutes = require('./routes/product');

const app = express();

// Middlewares
app.use(express.json());
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
  console.log('mode: development');
}

// Routes
app.use('/api/v1/categories', categoryRoutes);
app.use('/api/v1/subCategories', subCategoryRoutes);
app.use('/api/v1/brands', brandRoutes);
app.use('/api/v1/products', productRoutes);

// Error handling middlewares
app.all('*', (req, res, next) => {
  return next(new AppError(`cannot find this route ${req.originalUrl}`, 404));
});
// Global middleware for express
app.use(globalErrorHandler);

const port = process.env.PORT || 3000;
const sever = app.listen(
  port,
  asyncWrapper(async () => {
    await connectDB();
    console.log(`FinTech app listening on port ${port}!`);
  })
);

// Handling rejection outside express
process.on('unhandledRejection', (err) => {
  console.log(
    `> Unhandled rejection Error: ${err.name} | ${err.message}`.underline.red
  );
  sever.close(() => {
    console.log('Shutting down...');
    process.exit(1);
  });
});
