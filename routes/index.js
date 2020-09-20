// 引用 Express 與 Express 路由器
const express = require('express')

const home = require('./modules/home')
const expenseTrackers = require('./modules/expenseTrackers')

//----------------------------------------------------------------------------------

const Router = express.Router()

//----------------------------------------------------------------------------------

Router.use('/', home)
Router.use('/expenseTrackers', expenseTrackers)


// 準備引入路由模組
// 匯出路由器
module.exports = Router