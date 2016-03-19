// 'use strict';

require('dotenv').config(); // load .env variables

var express = require('express');
var app = express();
var routes = require('./app/routes/routes.js');
routes(app, process.env);

var mongoose = require('mongoose');
var database = process.env.MONGO_URI || ('mongodb://localhost:27017/search_history');
mongoose.connect(database);

var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'database connection error'));
  db.on('open', function() {
    console.log('connected to MongoDB database: ' + database)
  });

var port = process.env.PORT || 8080;
app.listen(port,  function () {
	console.log('Server is listening on port ' + port + '.');
});