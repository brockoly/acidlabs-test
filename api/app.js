const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.json());
require('./routes')(app);

if (process.env.ENVIRONMENT === 'production') {
  console.log('Environment:', process.env.ENVIRONMENT);
} else if (process.env.ENVIRONMENT === 'development') {
  console.log('Environment:', process.env.ENVIRONMENT);
}

module.exports = app;