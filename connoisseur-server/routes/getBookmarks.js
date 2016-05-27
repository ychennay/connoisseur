var express = require('express');
var router = express.Router();
var passport = require('passport');
var Restaurant = require('../models/restaurant');
var User = require('../models/user');
var Bookmark = require('../models/bookmark');

router.get('/', passport.authenticate('jwt', { session: false }), function(req, res) {

    var username = req.user.username;

    Bookmark.find({
        username: username
    }, function (err, bookmarks) {
        if (err) {
            res.send({success: false, message: err});
        } else if (bookmarks.length) {
            res.send({success: false, message: bookmarks });
        }
    });

});

module.exports = router;
