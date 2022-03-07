const mongoose = require('mongoose');

const connectDB = async () => {
  // console.log('DB_URL', process.env.DB_URL);
  try {
    const con = await mongoose.connect(process.env.DB_URL);
    console.log('connected to db');
  } catch (e) {
    console.log('connect fail to db', e);
  }
}
module.exports = connectDB;