var express = require('express');
var router = express.Router();
var passport = require('passport');
var Rating = require('../models/rating');
var User = require('../models/user');
var Bookmark = require('../models/bookmark');

// CODE BELOW IS DUPLICATE OF addBookmark.
// CODE NOT COMPLETE

router.post('/', passport.authenticate('jwt', { session: false }), function(req, res) {
    
    var restaurantId = req.body.restaurantId;
    var username = req.user.username;

    Bookmark.findOne({
        username: username,
        restaurantId: restaurantId
    }, function (err, bookmark) {
        if (bookmark === null) {
            res.send({success: false, message: 'Bookmark does not exist'});
        } else if (err) {
            res.send({success: false, message: 'Bookmark cannot be removed' + err});
        } else {
            bookmark.remove(function (err) {
                if (err) {
                    //res.sendStatus(400);
                    //res.statusCode = 400;
                    res.send({success: false, message: 'Bookmark cannot be removed' + err});
                    console.log(err);
                }
                else {
                    res.statusCode = 200;
                    res.send({success: true, message: 'Bookmark successfully removed'});
                }
            });
        }
    });
});

module.exports = router;
