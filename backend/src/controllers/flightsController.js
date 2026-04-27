const Flight = require('../models/Flight');

// @desc    Search for flights
// @route   GET /api/flights/search
// @access  Public
exports.searchFlights = async (req, res) => {
  try {
    const { from, to, type, date } = req.query;
    
    let query = {};
    
    if (from) query.source = new RegExp(from, 'i');
    if (to) query.destination = new RegExp(to, 'i');
    if (type) query.category = type;
    
    // In a real app, we would also filter by date, but for the seed data 
    // we'll keep it simple or use a range.
    
    const flights = await Flight.find(query);
    
    res.status(200).json({
      success: true,
      count: flights.length,
      data: flights
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get all flights
// @route   GET /api/flights
// @access  Public
exports.getAllFlights = async (req, res) => {
  try {
    const flights = await Flight.find({});
    res.status(200).json({ success: true, data: flights });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
