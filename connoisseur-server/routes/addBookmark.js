var express = require('express');
var router = express.Router();
var passport = require('passport');
var Restaurant = require('../models/restaurant');
var User = require('../models/user');
var Bookmark = require('../models/bookmark');

router.post('/', passport.authenticate('jwt', { session: false }), function(req, res) {

    var restaurantId = req.body.restaurantId;
    var username = req.user.username;

    Bookmark.find({
        username: username,
        restaurantId: restaurantId
    }, function (err, bookmark) {
        if (bookmark.length) {
            res.send({success: false, message: 'Bookmark already exists' });
        } else {
            new Bookmark({
                username: username,
                restaurantId: restaurantId,
                created_at: Date.now(),
                updated_at: Date.now()
            }).save(function (err) {
                  if (err) {
                      //res.sendStatus(400);
                      //res.statusCode = 400;
                      res.send({success: false, message: 'Bookmark cannot be saved' + err});
                      console.log(err);
                  }
                  else {
                      res.statusCode = 200;
                      res.send({success: true, message: 'Bookmark successfully saved'});
                  }
              });
        }

        if (err) {
            res.send({success: false, message: err});
        }
    });

});

module.exports = router;
