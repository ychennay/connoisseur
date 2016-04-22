var express = require('express');
var router = express.Router();
var User = require('../models/user');

/*
var person = new User({ name: 'Bob' });
person.save();

person = new User({ name: 'Jeff' });
person.save();
*/

/* GET users listing. */
router.get('/', function(req, res, next) {
  User.find({}, function (err, users) {
    res.send(users);
  });
});

module.exports = router;