var express       = require('express');
//var app           = express();
var passport      = require('passport');
var port          = process.env.PORT || 8080;
var flash         = require('connect-flash');
var Knex          = require('knex');

var morgan        = require('morgan');
var cookieParser  = require('cookie-parser');
var bodyParser    = require('body-parser');
var session       = require('express-session');
var pg            = require('pg');
var Model         = require('objection').Model;

var knexConfig = require('./knexfile');
var knex = Knex(knexConfig.development);

Model.knex(knex);

var app = express()
  .use(bodyParser.json())
  .use(morgan('dev'))
  .set('json spaces', 2);


require('./config/passport')(passport); // pass passport for configuration

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser()); // get information from html forms

// required for passport
app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

app.set('view engine', 'ejs');

// index page
app.get('/', function (req, res) {
  var drinks = [
    { name: 'Bloody Mary', drunkness: 3 },
    { name: 'Martini', drunkness: 5 },
    { name: 'Scotch', drunkness: 10 }
  ];
  var tagline = "Anyfin can happen";
  var logged = false;
  if(req.isAuthenticated()){
    logged = true;
  }
  console.log(logged);
  res.render('pages/index', {
    drinks: drinks,
    tagline: tagline,
    logged: logged
  });
});

//about page
app.get('/about', function (req, res) {
  var logged = false;
  if(req.isAuthenticated()){
    logged = true;
  }
  res.render('pages/about', {
    logged: logged
  });

});

//rest of the pages routers
require('./routes/login.js')(app, passport); 
require('./routes/signup.js')(app, passport);
var loggedFile = require('./routes/logged.js')(app, passport);

app.use(function (err, req, res, next) {
  if (err) {
    res.status(err.statusCode || err.status || 500).send(err.data || err.message || {});
  } else {
    next();
  }
});

app.listen(8080);
console.log('Listening to radio 8080');