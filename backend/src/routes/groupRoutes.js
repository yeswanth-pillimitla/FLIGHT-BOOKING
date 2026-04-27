const express = require('express');
const router = express.Router();
const groupController = require('../controllers/groupController');

router.post('/', groupController.createGroupBooking);
router.get('/', groupController.getGroupBookings);

module.exports = router;
