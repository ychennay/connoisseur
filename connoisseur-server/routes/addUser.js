/**
 * Created by tygiacalone on 5/13/16.
 */
var express = require('express');
var router = express.Router();
var User = require('../models/user');

router.post('/', function(req, res, next) {

  new User({
    username: req.body.username,
    password: req.body.password,
    location: req.body.location,
    created_at: Date.now(),
    updated_at: Date.now()
  }).save( function(err) {
      if (err) {
        //res.sendStatus(400);
        res.send(err.message);
        console.log(err);
      }
      else {
        res.sendStatus(200);
      }
    });
});

module.exports = router;