const mongoose = require('mongoose')

const expenseTracker = require('./expenseTracker.json')

const Schema = mongoose.Schema

const recordSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now,
  },
  amount: {
    type: Number,
    min: 0,
    required: true
  }
}, { collection: expenseTracker.results.record_collection_name })

module.exports = mongoose.model(expenseTracker.results.record_model_name, recordSchema)