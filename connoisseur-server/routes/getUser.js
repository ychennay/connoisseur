var express = require('express');
var router = express.Router();
var passport = require('passport');
var Restaurant = require('../models/restaurant');
var User = require('../models/user');
var Bookmark = require('../models/bookmark');

router.get('/', passport.authenticate('jwt', { session: false }), function(req, res) {

    var username = req.user.username;

    User.find({
        username: username
    }, function (err, user) {
        if (err) {
            res.send({success: false, message: err});
        } else if (user.length) {
            res.send({success: true, message: user});
        }
    });

});

module.exports = router;
