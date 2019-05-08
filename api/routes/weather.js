const express = require('express');
const weather = require('../controllers/weather');

const router = express.Router();

router.get('/:coordinates', weather.data);


module.exports = router;