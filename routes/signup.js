// app/routes.js
module.exports = function(app, passport) {

    app.get('/signup', function (req, res) {
        res.render('pages/signup');
    });
    app.get('/signupfail', function (req, res) {
  
        var message = 'Username is already taken.';
        res.render('pages/signup', {
        message: message
  });
});


    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/', // redirect to the secure profile section
        failureRedirect : '/signupfail', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

// route middleware to make sure a user is logged in
    function isLoggedIn(req, res, next) {

// if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

// if they aren't redirect them to the home page
    res.redirect('/');
    };
};