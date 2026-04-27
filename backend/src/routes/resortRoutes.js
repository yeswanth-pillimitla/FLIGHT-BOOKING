const express = require('express');
const { getResorts, bookResort } = require('../controllers/resortController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/', getResorts);
router.post('/book', protect, bookResort);

module.exports = router;
