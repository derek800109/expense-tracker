module.exports = {
  authenticator: (req, res, next) => {
    console.log("auth.js 1" + req.flash)
    // req.isAuthenticated() 是 Passport.js 提供的函式，會根據 request 的登入狀態回傳 true 或 false
    if (req.isAuthenticated()) {
      return next()
    }
    req.flash('warning_msg', '請先登入才能使用！')
    console.log("auth.js 2" + req.flash)
    res.redirect('/users/login')
  }
}