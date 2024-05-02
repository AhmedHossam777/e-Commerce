const colors = require('colors');
const mongoose = require('mongoose');
const connectDB = async () =>
  await mongoose
    .connect(process.env.MONGO_URI)
    .then((res) => console.log('> Connected To Database...'.bgCyan))
    // .catch((err) => {
    //   console.log(
    //     `> Error while connecting to mongoDB : ${err.message}`.underline.red
    //   );
    //   process.exit(1);
    // });

module.exports = connectDB;
