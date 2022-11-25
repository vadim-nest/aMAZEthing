require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.DB_URL + process.env.DB_PORT + '/' + process.env.DB_NAME, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export {mongoose};