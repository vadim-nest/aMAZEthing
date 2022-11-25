const mongoose = require('mongoose');

mongoose.connect(process.env.DB_URL + process.env.DB_PORT + '/' + process.env.DB_NAME, {
  useNewUrlParser: true, //to prevent a warning - will be deprecated soon
});

export {mongoose};