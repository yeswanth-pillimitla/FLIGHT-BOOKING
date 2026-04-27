const CargoBooking = require('../models/CargoBooking');
const { v4: uuidv4 } = require('uuid');

// Helper to determine if shipment is domestic
const determineShippingType = (origin, destination) => {
  const indiaKeywords = ['india', 'delhi', 'mumbai', 'bangalore', 'chennai', 'kolkata', 'hyderabad', 'pune', 'goa', 'jaipur', 'lucknow', 'ahmedabad'];
  const isIndia = (loc) => indiaKeywords.some(key => loc.toLowerCase().includes(key));
  
  if (isIndia(origin) && isIndia(destination)) {
    return 'Domestic';
  }
  return 'International';
};

exports.createCargoBooking = async (req, res) => {
  try {
    const { origin, destination, shipment_date, weight, cargo_type, delivery_speed } = req.body;

    // Validation
    if (!origin || !destination || !shipment_date || !weight || !cargo_type || !delivery_speed) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    if (parseFloat(weight) <= 0) {
      return res.status(400).json({ success: false, message: 'Weight must be greater than 0' });
    }

    if (new Date(shipment_date) < new Date().setHours(0,0,0,0)) {
      return res.status(400).json({ success: false, message: 'Shipment date cannot be in the past' });
    }

    const shipping_type = determineShippingType(origin, destination);
    const booking_id = `CRG-${uuidv4().slice(0, 8).toUpperCase()}`;

    const newBooking = new CargoBooking({
      booking_id,
      origin,
      destination,
      shipment_date,
      weight,
      cargo_type,
      shipping_type,
      delivery_speed
    });

    await newBooking.save();

    console.log(`Success: Cargo Booking ${booking_id} saved to MongoDB Atlas`);
    res.status(201).json({
      success: true,
      message: 'Booking saved successfully',
      booking_id
    });

  } catch (error) {
    console.error('Error in createCargoBooking:', error);
    res.status(500).json({ success: false, message: 'Server error while saving booking' });
  }
};

exports.getCargoBookings = async (req, res) => {
  try {
    const bookings = await CargoBooking.find().sort({ created_at: -1 });
    res.json({ success: true, bookings });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching bookings' });
  }
};
