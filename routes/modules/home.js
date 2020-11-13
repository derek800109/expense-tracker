const express = require('express')
const router = express.Router()

const Category = require('../../models/category')
const Record = require('../../models/record')

//----------------------------------------------------------------------------------

function get_total_amount(category, records) {
  let total_amount = 0

  const amount_array = records
    .filter(record => category === null || record.category._id == category)
    .map(record => record.amount)

  if (amount_array.length === 0) {
    return total_amount
  }

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
  const total_amount_category = req.query.filter || null
  console.log(' ****** ' + total_amount_category)

  Category
    .find()
    .lean()
    .then(categories => {
      categories.push({ category: "全部" })
      const currentCategory = categories.filter(category => category._id == total_amount_category)[0].category || "全部"

      Record.find({ userId }) // 取出 Todo model 裡的所有資料
        .lean()
        .populate({ path: 'category', names: ['category', 'icon'] })
        .then(records => {
          const totalAmount = get_total_amount(total_amount_category, records)
          records = records.filter(record => record.category.category === currentCategory || currentCategory === "全部")
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


          res.render('index', { records, categories, totalAmount, currentCategory })
        })
        .catch(error => console.error(error))
    })
    .catch(error => console.error(error))
})

//----------------------------------------------------------------------------------

module.exports = router