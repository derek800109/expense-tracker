const express = require('express')

const Record = require('../../models/record')
const Category = require('../../models/category')

const Router = express.Router()

const default_category = ""

//---------------------------------------------------------------------------------- edit

Router.get('/:id/edit', (req, res) => {
  const id = req.params.id

  Category
    .find()
    .lean()
    .then(categories => {
      Record
        .findById(id)
        .lean()
        .then(record => {
          record = {
            _id: record._id,
            name: record.name,
            date: get_string_data(record.date),
            category: record.category,
            amount: record.amount
          }

          const categories_ = categories.map(category_ => {
            return {
              _id: category_._id,
              category: category_.category,
              selected: String(category_._id) === String(record.category)
            }
          })

          return res.render('edit', { record, categories: categories_ })
        })
        .catch(error => console.error(error))
    })
    .catch(error => console.error(error))
})

Router.put('/:id', (req, res) => {
  const id = req.params.id
  const { name, date, category, amount } = req.body

  Record
    .findById(id)
    .then(record => {
      record.name = name
      record.date = new Date(date)
      record.category = category
      record.amount = amount

      return record.save()
    })
    .then(() => { res.redirect('/') })
    .catch(error => console.error(error))
})


//---------------------------------------------------------------------------------- new

function get_string_data(data) {
  const dd = String(data.getDate()).padStart(2, '0')
  const mm = String(data.getMonth() + 1).padStart(2, '0'); //January is 0!
  const yyyy = data.getFullYear()

  return [yyyy, mm, dd].join('-')
}

Router.get('/new', (req, res) => {
  // go to new page from home
  Category
    .find()
    .lean()
    .then(categories => {
      const today = get_string_data(new Date())
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