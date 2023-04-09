var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var prdRoutes = require('./routes/products_routes');
var usersRouters = require('./routes/users_routes');
var categoryRoutes = require('./routes/category_routes');
var apiProductsRoutes = require('./routes/API/api_products')




var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
var session = require('express-session');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'adashfjahsjfjshjaf', // chuỗi ký tự đặc biệt để Session mã hóa, tự viết
  resave: true,
  saveUninitialized: true
}));


app.use('/dat', prdRoutes)
app.use('/dat', usersRouters)
app.use('/dat', categoryRoutes)
app.use('/api', apiProductsRoutes)




// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);

  //kiểm tra link nếu là API thì trả về dữ liệu JSON
  //GET: /api/users
  if (req.originalUrl.indexOf('/api') == 0) {
    //Đây là link API
    res.json({
      status: 0,
      msg: err.message
    })
  } else {
    res.render('error');
  }

  res.render('error');
});

module.exports = app;
