const bcrypt = require('bcryptjs')
// 由於我們把 MongoDB 連線搬進了 .env 裡，需要在一開始載入 .env 的檔案
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

// -------------------------------------------------------------------------------------------

// load in json module
const db = require('../../config/mongoose')
const Record = require('../record') // 載入 record model
const Category = require('../category')
const User = require('../user')

// -------------------------------------------------------------------------------------------

const expenseTracker = require('../expenseTracker.json')

const SEED_USER = {
  name: 'user1',
  email: 'user1@example.com',
  password: '12345678'
}

// -------------------------------------------------------------------------------------------

db.once('open', () => {
  console.log('open and create things in record collection')

  bcrypt
    .genSalt(10)
    .then(salt => bcrypt.hash(SEED_USER.password, salt))
    .then(hash => User.create({ name: SEED_USER.name ,email: SEED_USER.email, password: hash }))
    .then(userId => {
      return Promise.all(Array.from(
          {length: expenseTracker.records.length},
          (_,i) => Category
            .findOne({ category: expenseTracker.records[i].category })
            .then(category => Record.create({
                      userId,
                      name: expenseTracker.records[i].name,
                      category: category._id,
                      date: new Date(expenseTracker.records[i].date),
                      amount: expenseTracker.records[i].amount,
                      merchant: expenseTracker.records[i].merchant
                    })
                  )
            ))
    })
    .then(() => {
      console.log('Done')
      // process.exit() 指「關閉這段 Node 執行程序」
      process.exit()
    })
})