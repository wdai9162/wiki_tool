var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');

var indexRouter = require('./routes/index');
var overallRouter = require('./routes/overall');
var userRouter = require('./routes/user');
var individualRouter = require('./routes/individual');
var authorRouter = require('./routes/author')

const mongoose = require ('mongoose');
const timechecker = require ('./middleware/timestamp-checker');
const Revinfo = require ('./model/revinfo'); 

var app = express();

//establish connection with database 
const mongoDB = "mongodb+srv://admin:Welcome1@cluster0-yc3oa.mongodb.net/node-angular?retryWrites=true&w=majority";
mongoose.connect(mongoDB).then(() => {
  console.log('Connected to mongoDB Atlas Database!');
}).catch((err) => {
  console.log(err)
})

//perform initial check on collection timestamp 
timechecker(Revinfo);


app.use((req,res,next) => {
  //console.log(req);
  //console.log(res);
  res.setHeader('Access-Control-Allow-Origin', "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PATCH,DELETE,OPTIONS");
  next();


})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//define paths for each function
app.use('/', indexRouter);
app.use('/api/user', userRouter);
app.use('/api/overall', overallRouter);
app.use('/api/individual', individualRouter);
app.use('/api/author', authorRouter);


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
