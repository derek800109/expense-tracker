const mongoose = require('mongoose')

const expenseTracker = require('./expenseTracker.json')

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
}, { collection: expenseTracker.names.category_collection })

module.exports = mongoose.model(expenseTracker.names.category_model, categorySchema)