const index = require('./routes/index');
const weather = require('./routes/weather');

module.exports = (app) => {
  app.use('/', index);
  app.use('/weather', weather);

  app.use((req, res, next) => {
    res.status(404).json({ error: 'Not Found.' });
    next();
  });
};
