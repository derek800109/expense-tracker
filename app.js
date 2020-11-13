const express = require('express')
const session = require('express-session')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')// 引用 body-parser
const methodOverride = require('method-override')
const flash = require('connect-flash')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const routes = require('./routes')

require('./config/mongoose')

const usePassport = require('./config/passport')

// -------------------------------------------------------------------------------

const app = express()
const PORT = process.env.PORT

// -------------------------------------------------------------------------------

app.use(express.static('public'))

// setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))

// const hbs = exphbs.create({})
// hbs.handlebars.registerHelper('isSameObject', function (object1, object2) {
//   console.log(object1, object2, object1 == object2)
//   return object1 == object2
// })

app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method')) // 設定每一筆請求都會透過 methodOverride 進行前置處理

// 呼叫 Passport 函式並傳入 app，這條要寫在路由之前
usePassport(app)

// -------------------------------------------------------------------------------

app.use(flash())
app.use((req, res, next) => {
  // 你可以在這裡 console.log(req.user) 等資訊來觀察
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg')  // 設定 success_msg 訊息
  res.locals.warning_msg = req.flash('warning_msg')  // 設定 warning_msg 訊息
  next()
})

// -------------------------------------------------------------------------------

app.use(routes)

// -------------------------------------------------------------------------------

app.listen(PORT, () => {
  console.log(`Express is listening on http://localhost:${PORT}`)
})