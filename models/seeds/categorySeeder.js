// load in json ducument
// const restaurant = require('./restaurant.json');

// load in json module
const db = require('../../config/mongoose')

const expenseTracker = require('../expenseTracker.json')

const Category = require('../category') // 載入 todo model

db.once('open', () => {
  console.log('open and create things in category collection')
  expenseTracker.categories.forEach(category_ => {
    Category.create({
      category: category_.category,
      icon: category_.icon
    })
  })

  console.log('done')
})