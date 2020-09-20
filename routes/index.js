// 引用 Express 與 Express 路由器
const express = require('express')

const home = require('./modules/home')
const expenseTrackers = require('./modules/expenseTrackers')

//-------------------------------------------------------

const router = express.Router()

//-------------------------------------------------------

router.use('/', home)
router.use('/expensetrackers', expenseTrackers)


// 準備引入路由模組
// 匯出路由器
module.exports = router