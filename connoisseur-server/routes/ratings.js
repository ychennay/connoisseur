var express = require('express');
var router = express.Router();
var Rating = require('../models/rating');

/* GET users listing. */
router.get('/', function(req, res, next) {
  Rating.find({}, function (err, ratings) {
    res.send(ratings);
  });
});

module.exports = router;