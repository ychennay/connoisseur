var express = require('express');
var router = express.Router();
var User = require('../models/user');

router.post('/', function(req, res, next) {

    new User({
        name: req.body.name,
        username: req.body.username,
        location: req.body.location,
        created_at: Date.now(),
        updated_at: Date.now()
    }).save( function(err) {
            if (err) {
                res.sendStatus(400);
                console.log(err);
            }
            else {
                res.sendStatus(200);
            }
        });
});

module.exports = router;