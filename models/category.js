const mongoose = require('mongoose')

const expenseTracker = require('./expenseTracker.json')

const Schema = mongoose.Schema

const categorySchema = new Schema({
  category: {
    type: String,
    trim: true,
    required: true
  },
  icon: {
    type: String,
    trim: true,
    required: true
  }
}, { collection: expenseTracker.results.category_collection_name })

module.exports = mongoose.model(expenseTracker.results.category_model_name, categorySchema)