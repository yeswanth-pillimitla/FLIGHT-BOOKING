const express = require('express');
const { getUserBookings, createBooking, updateBooking, getBookedSeats, cancelBooking } = require('../controllers/bookingsController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

// Only authenticated users
router.use(protect);

router.get('/my-bookings', getUserBookings);
router.post('/book-flight', createBooking);
router.get('/flight/:flightId/seats', getBookedSeats);
router.put('/:id/cancel', cancelBooking);
router.put('/:id', updateBooking);

module.exports = router;
