/**
 * Created by tygiacalone on 5/11/16.
 */
var express = require('express');
var router = express.Router();
var passport = require('passport');
var jwt = require('jsonwebtoken');
var User = require('../models/user');

// Authenticate the user and get a JSON Web Token to include in the header of future requests.
router.post('/', function(req, res) {
    console.log(req);
    User.findOne({
        username: req.body.username
    }, function(err, user) {
        if (err) throw err;

        if (!user) {
            res.send({ success: false, message: 'Authentication failed. User not found.' });
        } else {
            // Check if password matches
            console.log(user);
            user.comparePassword(req.body.password, function(err, isMatch) {
                if (isMatch && !err) {
                    // Create token if the password matched and no error was thrown
                    var token = jwt.sign(user, 'server secret', {
                        expiresIn: 10080 // in seconds
                    });
                    res.json({ success: true, token: 'JWT ' + token });
                } else {
                    res.send({ success: false, message: 'Authentication failed. Passwords did not match.' });
                }
            });
        }
    });
});

// Protect dashboard route with JWT
router.get('/dashboard', passport.authenticate('jwt', { session: false }), function(req, res) {
    res.send('It worked! User id is: ' + req.user._id + '.'
        + '\n' + req.user.username
        + '\n' + 'email: ' + req.user.email
        + '\n' + 'name: ' + req.user.firstName + ' ' + req.user.lastName);
});

module.exports = router;