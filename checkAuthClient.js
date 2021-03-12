function checkAuth(req, res, next) {
  if (req.session.client) {
    next();
  } else {
    res.redirect('/login')
  }
}

module.exports = checkAuth;