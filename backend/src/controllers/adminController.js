const User = require('../models/User');
const Booking = require('../models/Booking');
const Flight = require('../models/Flight');
const sendEmail = require('../utils/sendEmail');

// @desc    Get all users
// @route   GET /api/admin/all-users
// @access  Private/Admin
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json({ success: true, count: users.length, data: users });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all bookings
// @route   GET /api/admin/all-bookings
// @access  Private/Admin
exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({}).populate('user', 'name email');
    res.status(200).json({ success: true, count: bookings.length, data: bookings });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get total revenue
// @route   GET /api/admin/revenue
// @access  Private/Admin
exports.getRevenue = async (req, res) => {
  try {
    const bookings = await Booking.find({ paymentStatus: 'Completed' });
    const revenue = bookings.reduce((sum, booking) => sum + booking.totalAmount, 0);
    res.status(200).json({ success: true, data: revenue });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create a new flight
// @route   POST /api/admin/flights
// @access  Private/Admin
exports.createFlight = async (req, res) => {
  try {
    const flight = await Flight.create(req.body);
    res.status(201).json({ success: true, data: flight });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all cancellation requests
// @route   GET /api/admin/cancellations
// @access  Private/Admin
exports.getCancellations = async (req, res) => {
  try {
    const requests = await Booking.find({ bookingStatus: 'pending_cancellation' }).populate('user', 'name email').populate('flight');
    res.status(200).json({ success: true, count: requests.length, data: requests });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Approve a cancellation request
// @route   PUT /api/admin/cancellations/:id/approve
// @access  Private/Admin
exports.approveCancellation = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate('user');
    if (!booking) return res.status(404).json({ success: false, message: 'Booking not found' });
    
    booking.bookingStatus = 'Cancelled';
    await booking.save();

    // Send email to user (mock refund processed)
    if (booking.user && booking.user.email) {
      await sendEmail({
        email: booking.user.email,
        subject: 'Flight Cancellation Approved - Refund Processed',
        message: `Your cancellation request for Ref ID ${booking._id} has been approved. A refund of $${booking.totalAmount} will be processed shortly.`
      });
    }

    res.status(200).json({ success: true, data: booking });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update flight status (Cancelled/Maintenance)
// @route   PUT /api/admin/flights/:id/status
// @access  Private/Admin
exports.updateFlightStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const flight = await Flight.findById(req.params.id);
    if (!flight) return res.status(404).json({ success: false, message: 'Flight not found' });
    
    flight.status = status;
    await flight.save();

    if (status === 'cancelled' || status === 'maintenance') {
      const bookings = await Booking.find({ flight: flight._id, bookingStatus: 'Confirmed' }).populate('user');
      
      for (let booking of bookings) {
        booking.bookingStatus = 'Cancelled';
        await booking.save();

        if (booking.user && booking.user.email) {
          await sendEmail({
            email: booking.user.email,
            subject: 'Flight Update Notification',
            message: `Your flight ${flight.airline} (${flight.flightNumber}) has been ${status === 'maintenance' ? 'delayed/cancelled due to maintenance' : 'cancelled'}. Your refund of $${booking.totalAmount} will be processed shortly.`
          });
        }
      }
    }
    res.status(200).json({ success: true, data: flight });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
