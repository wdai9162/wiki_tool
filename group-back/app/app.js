var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var overallRouter = require('./routes/overall');
const mongoose = require ('mongoose');


var app = express(); 
const mongoDB = "mongodb+srv://admin:Welcome1@cluster0-yc3oa.mongodb.net/node-angular?retryWrites=true&w=majority"; 
mongoose.connect(mongoDB).then(() => {
  console.log('Connected to mongoDB Atlas Database!');
}).catch((err) => {
  console.log(err)
})

app.use((req,res,next) => {
  res.setHeader('Access-Control-Allow-Origin', "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PATCH,DELETE,OPTIONS");
  next();
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//define paths for each function 
app.use('/', indexRouter);
app.use('/api/user', (req,res) => {
  res.end("this is the user service endpoint.")
  });

app.use('/api/overall', overallRouter); 

app.use('/api/individual', (req,res) => {
  res.end("this is the INDIVIDUAL analytics endpoint")
  }); 

app.use('/api/author', (req,res) => {
  res.end("this is the AUTHOR analytics endpoint")
  }); 


//route to user api 
//app.use('/api/user',xxxxx);
//route to analytics api
//app.use('/api/analytics', userRouter);






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