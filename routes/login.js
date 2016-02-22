// app/login.js
module.exports = function(app, passport) {

    // =====================================
    // LOGIN ===============================
    // =====================================
    // show the login form
    app.get('/login', function (req, res) {

        // render the page and pass in any flash data if it exists
        res.render('pages/login.ejs'); 
    });
    app.get('/loginfail', function (req, res) {
        var message = 'Wrong username or password';
        res.render('pages/login.ejs', {
            message: message
        });
    });
    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/logged', // redirect to the secure profile section
        failureRedirect : '/loginfail', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));


    // process the login form
    // app.post('/login', do all our passport stuff here);
    
};

