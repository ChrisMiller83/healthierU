var express = require('express');
var router = express.Router();

/* GET meal plans page. */
router.get('/', function (req, res, next) {
  res.render('athlete_meal_plans', {
    locals: {
      title: 'Meal Plans'     
    },
    partials: { head: 'partials/head' }
  });
});




module.exports = router;