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

var knexConfig    = require('./knexfile');
var knex          = Knex(knexConfig.development);


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

//rest of the pages routers
require('./routes/login.js')(app, passport);
require('./routes/signup.js')(app, passport);
require('./routes/admin')(app, passport);
var Message = require('./models/Message');
// index page
app.get('/', function (req, res) {
  var msgs = [];
  var tagline = "Anyfin can happen";
  var logged = false;
  if(req.isAuthenticated()){
    logged = true;
  }
  Message
    .query()
    .where('approved', true)
    .andWhere('type', 'news')
    .eager('author')
    .then(function (messages) {
      msgs = messages;
      console.log();
      res.render('pages/index', {
        msgs: msgs,
        tagline: tagline,
        logged: logged
      });
    }).catch (function (err){
      console.log(err);
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

