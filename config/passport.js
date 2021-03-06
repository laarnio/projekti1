// config/passport.js

//lets load all the things we need:
var LocalStrategy     = require('passport-local');

//Load up the person model
var User              = require ('../models/User.js');
var bcrypt            = require('bcrypt-nodejs');

// expose this function to our app using module.exports
module.exports = function(passport) {

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        console.log('serializing..')
        console.log(user.id);
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        //User.findById(id, function(err, user) {
        //    done(err, user);
        //});
        User
              .query()
              .where('id', id)
              .first()
              .then(function (user){
                done(null, user);
              }).catch(function (err){
                console.log(err);
              });
    });

    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use('local-signup', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'username',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, username, password, done) {

        // asynchronous
        // User.findOne wont fire unless data is sent back
        process.nextTick(function() {

        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists
        //console.log(username + 'username');

        User
            .query()
            .where('username', username)
            .first()
            .then(function (user) {

            //console.log(user);
            // check to see if theres already a user with that username
            if (user) {
                console.log('Username is already taken.');
                done(null, false);
                //return done(null, false, req.flash('signupMessage', 'That username is already taken.'));
            } else {

                // if there is no user with that username
                req.body.password = bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
                req.body.isAdmin = false;
                User
                  .query()
                  .insert(req.body)
                  .then(function (user){
                    console.log('New user created');
                    console.log(user);
                    return done(null, user);
                  }).catch(function (err){
                    console.log(err);
                  });
            }

        })
            .catch(function (err) {

              console.log(err);
            });

        });

    }));
  passport.use('local-login', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'username',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, username, password, done) { // callback with email and password from our form

      // find a user whose email is the same as the forms email
      // we are checking to see if the user trying to login already exists

      User
        .query()
        .where('username', username)
        .first()
        .then(function (user){
          console.log(user);
          if (!user) {
            console.log('User not found.');
            return done(null, false);
          }
          console.log(user.password);
          if (!bcrypt.compareSync(password, user.password)) {
            console.log('Invalid password.');
            return done(null, false);
          }
          console.log('Logging in..');
          return done(null, user);
        }).catch(function (err){
          console.log(err);
        });
  }));

};
