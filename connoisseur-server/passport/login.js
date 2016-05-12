/**
 * Created by tygiacalone on 5/11/16.
 */

'use strict';

const passport = require('passport');
const Strategy = require('passport-local');

var isValidPassword = function(user, password){
    return bCrypt.compareSync(password, user.password);
};

passport.use('login', new Strategy({
        passReqToCallback : true
    },
    function(req, username, password, done) {
        User.findOne({ 'username' :  username },
            function(err, user) {
                // In case of any error, return using the done method
                if (err)
                    return done(err);
                // Username does not exist, log the error and redirect back
                if (!user){
                    console.log('User Not Found with username ' + username);
                    return done(null, false);
                }
                // User exists but wrong password, log the error
                if (!isValidPassword(user, password)){
                    console.log('Invalid Password');
                    return done(null, false);
                }
                // User and password both match, return user from done method
                // which will be treated like success
                return done(null, user);
            }
        );

    })
);

module.exports = passport;