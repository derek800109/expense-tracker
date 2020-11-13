const mongoose = require('mongoose')

const expenseTracker = require('./expenseTracker.json')

const Schema = mongoose.Schema

const recordSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: true
  },
  merchant: {
    type: String,
    trim: true,
    required: true
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
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
  },
  userId: {  // 加入關聯設定
      type: Schema.Types.ObjectId,
      ref: 'User',
      index: true,
      required: true
  }
})

module.exports = mongoose.model('Record', recordSchema)