var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require("./config/database").connect()

//! Here
var indexRouter = require('./routes/index.route');
var bookRouter = require('./routes/book.route');
var adminBookRouter = require('./routes/admin-book.route');
var authorRouter = require('./routes/author.route');
var adminAuthorRouter = require('./routes/admin-author.route');


var app = express();

// Set up mongoose connection
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const mongoDB =
  "mongodb+srv://Database_Admins:yH6ocwxKojzGgWqn@goodreads-cluster.dqgigbj.mongodb.net/Goodreads-Database-0?retryWrites=true&w=majority";

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
}
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '..', 'public')));

//! Here
app.use('/', indexRouter);
app.use('/api/book', bookRouter);
app.use('/api/admin/book', adminBookRouter);
app.use('/api/author', authorRouter);
app.use('/api/admin/author', adminAuthorRouter);



// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
