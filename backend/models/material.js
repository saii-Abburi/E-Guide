// models/Material.js
const mongoose = require('mongoose');

const MaterialSchema = new mongoose.Schema({
  title: String,
  description: String,
  type: String,
  link: String, // this will hold the uploaded file path
});

module.exports = mongoose.model('Material', MaterialSchema);
