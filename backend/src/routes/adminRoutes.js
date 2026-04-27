const express = require('express');
const { getAllUsers, getAllBookings, getRevenue, createFlight, getCancellations, approveCancellation, updateFlightStatus } = require('../controllers/adminController');
const { protect, authorize } = require('../middlewares/authMiddleware');

const router = express.Router();

// Apply protect AND authorize('admin') to all routes traversing here
router.use(protect);
router.use(authorize('admin'));

router.get('/all-users', getAllUsers);
router.get('/all-bookings', getAllBookings);
router.get('/revenue', getRevenue);

router.post('/flights', createFlight);
router.get('/cancellations', getCancellations);
router.put('/cancellations/:id/approve', approveCancellation);
router.put('/flights/:id/status', updateFlightStatus);

module.exports = router;
