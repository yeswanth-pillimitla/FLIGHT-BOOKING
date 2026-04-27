const GroupBooking = require('../models/GroupBooking');
const { v4: uuidv4 } = require('uuid');

// Helper to determine if trip is domestic
const determineTripType = (from, to) => {
  const indiaKeywords = ['india', 'delhi', 'mumbai', 'bangalore', 'chennai', 'kolkata', 'hyderabad', 'pune', 'goa', 'jaipur', 'lucknow', 'ahmedabad'];
  const isIndia = (loc) => indiaKeywords.some(key => loc.toLowerCase().includes(key));
  
  if (isIndia(from) && isIndia(to)) {
    return 'Domestic';
  }
  return 'International';
};

exports.createGroupBooking = async (req, res) => {
  try {
    const { from_location, to_location, departure_date, people_count, travel_class } = req.body;

    // Validation
    if (!from_location || !to_location || !departure_date || !people_count || !travel_class) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    if (parseInt(people_count) < 1) {
      return res.status(400).json({ success: false, message: 'People count must be at least 1' });
    }

    if (new Date(departure_date) < new Date().setHours(0,0,0,0)) {
      return res.status(400).json({ success: false, message: 'Departure date cannot be in the past' });
    }

    const trip_type = determineTripType(from_location, to_location);
    const booking_id = `GRP-${uuidv4().slice(0, 8).toUpperCase()}`;

    const newBooking = new GroupBooking({
      booking_id,
      from_location,
      to_location,
      departure_date,
      people_count,
      travel_class,
      trip_type
    });

    await newBooking.save();

    console.log(`Success: Group Booking ${booking_id} saved to MongoDB Atlas`);
    res.status(201).json({
      success: true,
      message: 'Booking saved successfully',
      booking_id
    });

  } catch (error) {
    console.error('Error in createGroupBooking:', error);
    res.status(500).json({ success: false, message: 'Server error while saving booking' });
  }
};

exports.getGroupBookings = async (req, res) => {
  try {
    const bookings = await GroupBooking.find().sort({ created_at: -1 });
    res.json({ success: true, bookings });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching bookings' });
  }
};
