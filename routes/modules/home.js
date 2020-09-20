const express = require('express')
const mogoose = require('mongoose')

const Category = require('../../models/category')
const Record = require('../../models/record')
const expenseTracker = require('../../models/expenseTracker.json')

const Router = express.Router()

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

Router.get('/', (req, res) => {
  const total_amount_category = req.query.filter || null
  let totalAmount = 0

  Category
    .find()
    .lean()
    .then(categories => {
      Record
        .find()
        .lean()
        .populate({ path: 'category', names: ['category', 'icon'] })
        .then(records => {
          console.log(get_yyyymmdd(records[0].date))
          totalAmount = get_total_amount(total_amount_category, records)
          records = records.map(record => {
            return {
              _id: record._id,
              name: record.name,
              category: record.category,
              date: get_yyyymmdd(record.date),
              amount: record.amount
            }
          })

          res.render('index', { records: records, categories: categories, totalAmount: totalAmount })
        })
        .catch(error => console.error(error))
    })
    .catch(error => console.error(error))
})

//----------------------------------------------------------------------------------

module.exports = Router