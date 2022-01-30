const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//constraints for entering data into the mongodb database
const exerciseSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  filename: { type: String, required: true },
  filepath: { type: String, required: true },
  mimetype: { type: String, required: true },
  size: { type: Number, required: true },
});

const Exercise = mongoose.model('Exercise', exerciseSchema);

module.exports = Exercise;
