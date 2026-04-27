const Resort = require('../models/Resort');

// @desc    Get all resorts
// @route   GET /api/resorts
// @access  Public
exports.getResorts = async (req, res) => {
  try {
    const { location } = req.query;
    let query = {};
    if (location) {
      query.location = { $regex: location, $options: 'i' };
    }
    const resorts = await Resort.find(query);
    res.status(200).json({ success: true, count: resorts.length, data: resorts });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create resort booking
// @route   POST /api/resorts/book
// @access  Private
exports.bookResort = async (req, res) => {
  try {
    res.status(201).json({ success: true, message: 'Resort booking request received' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
