var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
var logger = require('morgan');
const bodyParser = require('body-parser');
const Handlebars = require('handlebars')
const hbs = require('express-handlebars');
const hbsHelper = require('handlebars-helpers')();
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')

const userModel = require('./models/UserModel');

var app = express();


// passport setup
app.use(session({
  secret:'noserect',
  saveUninitialized: true,
  resave: true
}));

app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);
// passport.use(new LocalStrategy({passReqToCallback : true},userModel.authenticate()));
// passport.serializeUser(userModel.serializeUser());
// passport.deserializeUser(userModel.deserializeUser());
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('hbs',hbs({
  extname:'hbs',
  defaultLayout:'layout',
  layoutsDir: path.join(__dirname,'views'),
  partialsDir: path.join(__dirname,'views/partials'),
  helpers: hbsHelper,
  handlebars: allowInsecurePrototypeAccess(Handlebars)
}));
app.set('view engine', 'hbs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(__dirname + '/public'));


// check login
app.use('/:or(|dashboard|lazada|gmail)/',(req,res,next)=>{
  if (req.isUnauthenticated()) return res.redirect('/login');
  next();
});

// app.use('/login',(req,res,next) =>{
//   if (req.isAuthenticated()) return res.redirect('/');
// })

// set router
app.use('/',indexRouter);
app.use('/api', usersRouter);
app.use('/login',require('./routes/login'));
app.use('/auth',require('./routes/auth'));
app.use('/lazada/account', require('./routes/lazada/account'));
app.use('/lazada/rrs', require('./routes/lazada/rrs'));
app.use('/lazada/upload', require('./routes/lazada/upload'));
app.use('/lazada/datareg', require('./routes/lazada/datareg'));
app.use('/gmail/account', require('./routes/gmail/account'));
app.use('/telegram/account', require('./routes/telegram/account'));
app.use('/telegram/buffsub', require('./routes/telegram/buffSub'));

app.use('/remote/addDevice', require('./routes/remote/addDevice'));
app.use('/remote/addScript', require('./routes/remote/addScript'));
app.use('/remote/manage', require('./routes/remote/manage'));
//app.use('/telegram/buffsub', require('./routes/telegram/buffSub'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
