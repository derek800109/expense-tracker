// load in json ducument
// const restaurant = require('./restaurant.json');

// load in json module
const db = require('../../config/mongoose')

const expenseTracker = require('../expenseTracker.json')

const Record = require('../record') // 載入 record model

db.once('open', () => {
  console.log('open and create things in record collection')

  expenseTracker.records.forEach(record => {
    Record.create({
      name: record.name,
      category: record.category,
      date: new Date(record.date),
      amount: record.amount
    })
  })

  console.log('Done')
})