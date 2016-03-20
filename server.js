// 'use strict';

require('dotenv').config(); // load .env variables

var express = require('express');
var app = express();

var multer = require('multer');
var upload = multer();

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/index.html');
});

app.post('/api/fileanalyse/', upload.single('0'), function (req, res, next) { // key is 0
  if (req.file) {
    res.send({
      success: 'Updated Successfully',
      fileSize: req.file.size,
      mimeType: req.file.mimetype,
      fileName: req.file.originalname,
      encoding: req.file.encoding
    });
  } else {
    res.statusText('ABORT MISSION.').send({});
  }
});

var port = process.env.PORT || 8080;
app.listen(port,  function () {
	console.log('Server is listening on port ' + port + '.');
});