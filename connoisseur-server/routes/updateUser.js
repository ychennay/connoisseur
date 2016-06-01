var express = require('express');
var router = express.Router();
var passport = require('passport');
var Rating = require('../models/rating');
var User = require('../models/user');
var Restaurant = require('../models/restaurant');

router.post('/', passport.authenticate('jwt', { session: false }), function(req, res) {

  var username = req.user.username;
  var gender = req.query.gender;
  var age = req.query.age;
  var dietary_preference = req.query.dietary_preference;

  User.findOneAndUpdate({
    username: username
  },{
    age: age,
    gender: gender,
    dietary_preference: dietary_preference
  },{
    upsert: true
  }, function(err) {
    if (err) {
      res.send({success: false, message: 'User could not be updated' + err});
      console.log(err);
    }
    else {
      res.send({success: true, message: 'User successfully updated'});
    }
  });

});

module.exports = router;
