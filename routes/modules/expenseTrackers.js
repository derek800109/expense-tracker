const express = require('express')

const Record = require('../../models/record')
const Category = require('../../models/category')

const Router = express.Router()

const default_category = ""

//---------------------------------------------------------------------------------- edit


//---------------------------------------------------------------------------------- new

function get_today() {
  const today = new Date()
  const dd = String(today.getDate()).padStart(2, '0')
  const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  const yyyy = today.getFullYear()

  return [yyyy, mm, dd].join('-')
}

Router.get('/new', (req, res) => {
  // go to new page from home
  Category
    .find()
    .lean()
    .then(categories => {
      const today = get_today()
      console.log(today)
      return res.render('new', { categories, today, default_category })
    })
    .catch(error => console.error(error))
})

Router.post('/', (req, res) => {
  // create new record from new.handlebars
  const { name, date, category, amount } = req.body
  console.log(name, date, category, amount)

  if (name === "" || category === default_category || amount === "") {
    console.log('unvalid input data')
    return res.redirect('/expenseTrackers/new')
  }

  Category
    .findById(category)
    .lean()
    .then(category_ => {
      const record = new Record({ name, date, category: category_, amount })
      record.save()
    })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})


//---------------------------------------------------------------------------------- delete

Router.delete('/:id', (req, res) => {
  const id = req.params.id

  return Record
    .findById(id)
    .then(record => record.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.error(error))
})

//----------------------------------------------------------------------------------

module.exports = Router