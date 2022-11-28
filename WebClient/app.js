// const { engine } = require('express-handlebars');
// const FacebookStrategy = require('passport-facebook').Strategy;
const flash = require('connect-flash')
var createError = require('http-errors');
var express = require('express');
var hbs = require('hbs');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require("express-session");
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
var favicon = require('serve-favicon');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productRouter = require('./routes/product');
var cartRouter = require('./routes/cart');
var commentRouter = require('./routes/comment');
const apiUsersRouter = require('./routes/api/users');

const User = require('./models/users');

passport.use(new LocalStrategy({ passReqToCallback: true, usernameField: 'email' },
    async function(req, username, password, done) {
        try {
           
            const user = await User.get(username);
            
            if (!user) {
                return done(null, false, req.flash('message', 'Incorrect username!'))
            }
            const isPasswordValid = await User.validPassword(username, password);
            if (!isPasswordValid) {
                
                return done(null, false, req.flash('message', 'Incorrect password!'))
            }

            return done(null, user);
        } catch (err) {
            return done(err);
        }
    }));



  

// Hien thi thong tin login
passport.serializeUser(function(user, done) {
    done(null, user.email);
});


// Check email
passport.deserializeUser(async function(email, done) {
    const user = await User.get(email);
    done(null, user);
});











var app = express(
);

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

// view engine setup
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// hbs.registerHelper('pow', (a, b) => a * b );




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


app.use(flash());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: "Mysecret" }));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/product', productRouter);
app.use('/cart', cartRouter);
app.use('/comment', commentRouter);
app.use('/api/users', apiUsersRouter);

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