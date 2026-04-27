const express = require('express');
const { searchFlights, getAllFlights } = require('../controllers/flightsController');

const router = express.Router();

router.get('/search', searchFlights);
router.get('/', getAllFlights);

module.exports = router;
