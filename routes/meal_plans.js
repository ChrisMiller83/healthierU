var express = require('express');
var router = express.Router();

/* GET meal plans page. */
router.get('/', function (req, res, next) {
  res.render('meal_plans', {
    locals: {
      title: 'Meal Plans'
    }
    });
});




module.exports = router;