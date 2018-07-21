const express = require('express');
const path = require('path');
const volleyball = require('volleyball');
const bodyParser = require('body-parser');

const app = express();

//express has its own built-in body-parsing middleware
//app.use(express.json());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//logging middleware
app.use(volleyball);

//serving the static files
const publicFolder = path.join(__dirname, '..', 'public');
app.use(express.static(publicFolder));

// Because we generally want to build single-page applications (or SPAs), our server should send its index.html for any requests that don't match one of our API routes.
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

//error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send(err.message);
});
module.exports = app;
