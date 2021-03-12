function checkAuth(req, res, next) {
  if (req.session.coach) {
    next();
  } else {
    res.redirect('/login')
  }
}

module.exports = checkAuth;