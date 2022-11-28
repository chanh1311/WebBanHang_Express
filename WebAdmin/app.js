// const flash = require('connect-flash');
const session = require("express-session");
var createError = require('http-errors');
var express = require('express');
var hbs = require('hbs');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var favicon = require('serve-favicon');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productRouter = require('./routes/product');
var adminRouter = require('./routes/admin');
var orderRouter = require('./routes/order');
var reportRouter = require('./routes/report');

var app = express();


app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));


app.use(session({ secret: "Mysecret" }));

// login 

const User = require('./models/admin');

passport.use(new LocalStrategy({ passReqToCallback: true, usernameField: 'username' },
    async function(req,username, password, done) {
        try {
           
            const user = await User.get(username);
            
            if (!user) {
                return done(null, false, {message: 'Incorrect username!'})
            }
            const isPasswordValid = await User.validPassword(username, password);
            if (!isPasswordValid) {
                
                return done(null, false, {message: 'Incorrect password!'})
            }
            // console.log(user);
            return done(null, user);
        } catch (err) {
            return done(err);
        }
    }));




// Hien thi thong tin login
passport.serializeUser(function(user, done) {
    done(null, user.username);
});


// Check username
passport.deserializeUser(async function(username, done) {
    const user = await User.get(username);
    done(null, user);
});

// app.use(flash());





// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');














var blocks = {};

hbs.registerHelper('extend', function(name, context) {
    var block = blocks[name];
    if (!block) {
        block = blocks[name] = [];
    }

    block.push(context.fn(this)); // for older versions of handlebars, use block.push(context(this));
});

hbs.registerHelper('block', function(name) {
    var val = (blocks[name] || []).join('\n');

    // clear the block
    blocks[name] = [];
    return val;
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(passport.initialize());
app.use(passport.session());







app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/product', productRouter);
app.use('/admin', adminRouter);
app.use('/order', orderRouter);
app.use('/report', reportRouter);

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