/**
 * Created by tygiacalone on 5/11/16.
 */
var express = require('express');
var router = express.Router();
var passport = require('passport');
var jwt = require('jsonwebtoken');
var User = require('../models/user');

const db = {
    updateOrCreate: function(user, cb){
        // db dummy, we just cb the user
        cb(null, user);
    }
};

function generateToken(req, res, next) {
    req.token = jwt.sign({
        id: req.user.id
    }, 'server secret', {
        expiresInMinutes: 120
    });
    next();
}

function respond(req, res) {
    res.status(200).json({
        user: req.user,
        token: req.token
    });
}

function serialize(){
    function findOrCreateUser(){
        // find a user in Mongo with provided username
        User.findOne({ 'username' :  username }, function(err, user) {
            // In case of any error, return using the done method
            if (err){
                console.log('Error in SignUp: '+err);
                return done(err);
            }
            // already exists
            if (user) {
                console.log('User already exists with username: '+username);
                return done(null, false, req.flash('message','User Already Exists'));
            } else {
                // if there is no user with that email
                // create the user
                var newUser = new User();

                // set the user's local credentials
                newUser.username = username;
                newUser.password = createHash(password);
                newUser.email = req.param('email');
                newUser.firstName = req.param('firstName');
                newUser.lastName = req.param('lastName');

                // save the user
                newUser.save(function(err) {
                    if (err){
                        console.log('Error in Saving user: '+err);
                        throw err;
                    } else {
                        console.log('User Registration succesful');
                        return done(null, newUser);
                    }
                });
            }
        });
    }
    process.nextTick(findOrCreateUser);
    next();
}

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
    res.send('It worked! User id is: ' + req.user._id + '.' + '\n' + req.user.username + ' ' + req.user.email);
});


/*
router.get('/', passport.authenticate('local', {
            session: false
        }), serialize, generateToken, respond);
*/
module.exports = router;