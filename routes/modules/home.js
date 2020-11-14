const express = require('express')
const router = express.Router()

const Category = require('../../models/category')
const Record = require('../../models/record')

//----------------------------------------------------------------------------------

function get_total_amount(records) {
  let total_amount = 0

  if (records.length === 0) {
    return total_amount
  }

  const amount_array = records.map(record => record.amount)
  total_amount = amount_array.reduce((a, b) => a + b)

  return total_amount
}

function get_yyyymmdd(date) {
  let month = '' + (date.getMonth() + 1)
  let day = '' + date.getDate()
  let year = '' + date.getFullYear()

  if (month.length < 2)
    month = '0' + month
  if (day.length < 2)
    day = '0' + day

  return [year, month, day].join('/')
}

router.get('/', (req, res) => {
  const userId = req.user._id
  const currentCategory = req.query.category || "類別"
  const currentMonth = req.query.month || '月份'
  let months = ['月份'].concat(Array.from({ length: 12 }, (_, i) => (i + 1).toString()))
  console.log('month:' + currentMonth)

  Category
      .find()
      .lean()
      .then(categories => {
        categories.push({ category: "類別" })

        Record.find({ userId }) // 取出 Todo model 裡的所有資料
          .lean()
          .populate({ path: 'category', names: ['category', 'icon'] })
          .then(records => {
            records = records.filter(record => record.category.category === currentCategory || currentCategory === "類別")
            records = records.filter(record => (record.date.getMonth() + 1).toString() === currentMonth || currentMonth === '月份')
            console.log(records.map(record => record.date.getMonth()))

            const totalAmount = get_total_amount(records)

            records = records.map(record => {
              return {
                _id: record._id,
                name: record.name,
                category: record.category,
                date: get_yyyymmdd(record.date),
                amount: record.amount,
                merchant: record.merchant
              }
            })

            res.render('index', { records, categories, months, totalAmount, currentCategory, currentMonth })
          })
          .catch(error => console.error(error))
      })
      .catch(error => console.error(error))
})

//----------------------------------------------------------------------------------

module.exports = router