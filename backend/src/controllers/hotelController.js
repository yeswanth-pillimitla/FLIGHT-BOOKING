const Hotel = require('../models/Hotel');

// @desc    Get all hotels
// @route   GET /api/hotels
// @access  Public
exports.getHotels = async (req, res) => {
  try {
    const { location } = req.query;
    let query = {};
    if (location) {
      query.location = { $regex: location, $options: 'i' };
    }
    const hotels = await Hotel.find(query);
    res.status(200).json({ success: true, count: hotels.length, data: hotels });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create hotel booking (simple placeholder for now)
// @route   POST /api/hotels/book
// @access  Private
exports.bookHotel = async (req, res) => {
  try {
    // In a real app, we'd create a booking record
    res.status(201).json({ success: true, message: 'Hotel booking request received' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
