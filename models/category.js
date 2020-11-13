const mongoose = require('mongoose')

const Schema = mongoose.Schema

const categorySchema = new Schema({
  category: {
    type: String,
    trim: true,
    unique: true,
    required: true
  },
  icon: {
    type: String,
    trim: true,
    required: true
  }
})

module.exports = mongoose.model('Category', categorySchema)