require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const searchRouter = require('./routes/products');
const bodyParser = require('body-parser');

var app = express();


app.use(logger('dev'));
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', searchRouter);



app.listen(3001, () =>{
  console.log(`App started and listening on port ${process.env.PORT || 3001}`);
})

module.exports = app;
