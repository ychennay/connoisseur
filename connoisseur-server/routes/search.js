var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Restaurant = require('../models/restaurant');

/* GET users listing. */
router.get('/', function(req, res, next) {
  Restaurant.find({}, function (err, restaurants) {
      console.log(restaurants);
    res.send(restaurants);
  });
});

module.exports = router;