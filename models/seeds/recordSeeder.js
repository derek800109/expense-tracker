// load in json ducument
// const restaurant = require('./restaurant.json');

// load in json module
const db = require('../../config/mongoose')

const expenseTracker = require('../expenseTracker.json')

const Record = require('../record') // 載入 record model
const Category = require('../category')

db.once('open', () => {
  console.log('open and create things in record collection')

  expenseTracker.records.forEach(record => {
    Category
      .findOne({ category: record.category })
      .then(category => {
        const record_ = new Record({
          name: record.name,
          category: category._id,
          date: new Date(record.date),
          amount: record.amount
        })

        record_.save()
      })
  })

  console.log('Done')
})