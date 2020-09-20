const express = require('express')

const Category = require('../../models/category')
const Record = require('../../models/record')
const expenseTracker = require('../../models/expenseTracker.json')
const category = require('../../models/category')

const Router = express.Router()

//----------------------------------------------------------------------------------

Router.get('/', (req, res) => {
  Record
    .find()
    .lean()
    .populate({ path: 'category', names: ['category', 'icon'] })
    .then(records => {
      console.log(records)
      // res.render('index', {records})
    })
    .catch(error => console.error(error))
})

//----------------------------------------------------------------------------------

module.exports = Router