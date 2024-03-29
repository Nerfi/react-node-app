const mongoose = require('mongoose');

//creating the schema

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 6,
    max: 255
  },
  email: {
    type: String,
    required: true,
    max: 255,
    min: 10
  },
  password: {
    type: String,
    required: true,
    max: 1024,
    min: 6
  },

})


module.exports = mongoose.model('User', userSchema);
