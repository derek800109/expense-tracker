// 由於我們把 MongoDB 連線搬進了 .env 裡，需要在一開始載入 .env 的檔案
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

// -------------------------------------------------------------------------------------------

// load in json module
const db = require('../../config/mongoose')
const Category = require('../category') // 載入 todo model

const expenseTracker = require('../expenseTracker.json')

// -------------------------------------------------------------------------------------------

db.once('open', () => {
  console.log('open and create things in category collection')

  Promise.all(Array.from(
    {length: expenseTracker.categories.length},
    (_,i) => Category.create({
      category: expenseTracker.categories[i].category,
      icon: expenseTracker.categories[i].icon
    })
  ))
  .then(() => {
    console.log('done')
    // process.exit() 指「關閉這段 Node 執行程序」
    process.exit()
  })
})