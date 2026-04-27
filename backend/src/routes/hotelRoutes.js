const express = require('express');
const { getHotels, bookHotel } = require('../controllers/hotelController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/', getHotels);
router.post('/book', protect, bookHotel);

module.exports = router;
