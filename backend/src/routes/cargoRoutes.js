const express = require('express');
const router = express.Router();
const cargoController = require('../controllers/cargoController');

router.post('/', cargoController.createCargoBooking);
router.get('/', cargoController.getCargoBookings);

module.exports = router;
