const Booking = require('../models/Booking');

// @desc    Get user bookings
// @route   GET /api/bookings/my-bookings
// @access  Private
exports.getUserBookings = async (req, res) => {
  try {
    // Only return bookings where user matches req.user.id
    const bookings = await Booking.find({ user: req.user.id }).populate('flight');
    res.status(200).json({ success: true, count: bookings.length, data: bookings });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create a flight booking
// @route   POST /api/bookings/book-flight
// @access  Private
exports.createBooking = async (req, res) => {
  try {
    const { flightId, passengerDetails, seatNumber, totalAmount } = req.body;

    // Check if the seat is already booked for this flight
    const existingBooking = await Booking.findOne({ flight: flightId, seatNumber, bookingStatus: 'Confirmed' });
    if (existingBooking) {
      return res.status(400).json({ success: false, message: 'Seat already selected. Please choose another seat.' });
    }

    const newBooking = await Booking.create({
      user: req.user.id,
      flight: flightId,
      passengerDetails,
      seatNumber,
      totalAmount,
      bookingStatus: 'Confirmed'
    });

    res.status(201).json({ success: true, data: newBooking });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get booked seats for a flight
// @route   GET /api/bookings/flight/:flightId/seats
// @access  Private
exports.getBookedSeats = async (req, res) => {
  try {
    const bookings = await Booking.find({ flight: req.params.flightId, bookingStatus: 'Confirmed' }, 'seatNumber');
    const bookedSeats = bookings.map(b => b.seatNumber);
    res.status(200).json({ success: true, data: bookedSeats });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
// @desc    Update a flight booking
// @route   PUT /api/bookings/:id
// @access  Private
exports.updateBooking = async (req, res) => {
  try {
    const { 
      passengerName, travelDate, travelTime, seatClass, passengerCount, 
      gender, dob, contactNumber, email, seatNumber, seatType, baggage, extraBaggage, mealPreference
    } = req.body;

    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }

    // Make sure user owns the booking
    if (booking.user.toString() !== req.user.id) {
      return res.status(401).json({ success: false, message: 'Not authorized to update this booking' });
    }

    // Seat Locking Logic
    let updateFields = {};
    if (seatNumber && seatNumber !== booking.seatNumber) {
      const existingBooking = await Booking.findOne({ flight: booking.flight, seatNumber, bookingStatus: 'Confirmed' });
      if (existingBooking) {
        return res.status(400).json({ success: false, message: 'Seat already selected. Please choose another seat.' });
      }
      updateFields.seatNumber = seatNumber;
    }

    // Update fields in passengerDetails Map
    const passengerDetails = booking.passengerDetails || new Map();
    if (passengerName) passengerDetails.set('fullName', passengerName);
    if (travelDate) passengerDetails.set('travelDate', travelDate);
    if (travelTime) passengerDetails.set('travelTime', travelTime);
    if (seatClass) passengerDetails.set('seatClass', seatClass);
    if (passengerCount) passengerDetails.set('passengerCount', passengerCount);
    if (gender) passengerDetails.set('gender', gender);
    if (dob) passengerDetails.set('dob', dob);
    if (contactNumber) passengerDetails.set('contactNumber', contactNumber);
    if (email) passengerDetails.set('email', email);
    if (seatType) passengerDetails.set('seatType', seatType);
    if (baggage) passengerDetails.set('baggagePreference', baggage);
    if (extraBaggage !== undefined) passengerDetails.set('extraBaggage', extraBaggage);
    if (mealPreference) passengerDetails.set('mealPreference', mealPreference);

    updateFields.passengerDetails = passengerDetails;

    const updatedBooking = await Booking.findByIdAndUpdate(
      req.params.id,
      updateFields,
      { new: true, runValidators: true }
    ).populate('flight');

    res.status(200).json({ success: true, data: updatedBooking });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Request booking cancellation
// @route   PUT /api/bookings/:id/cancel
// @access  Private
exports.cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate('flight');
    
    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }

    if (booking.user.toString() !== req.user.id) {
      return res.status(401).json({ success: false, message: 'Not authorized' });
    }

    // 6-hour rule check
    // We check travelDate/travelTime from passengerDetails, fallback to flight departureTime
    let departureDateStr = null;
    if (booking.passengerDetails && booking.passengerDetails.get('travelDate')) {
       departureDateStr = booking.passengerDetails.get('travelDate');
       if (booking.passengerDetails.get('travelTime')) {
         departureDateStr += `T${booking.passengerDetails.get('travelTime')}:00`;
       }
    } else if (booking.flight && booking.flight.departureTime) {
       departureDateStr = booking.flight.departureTime;
    }

    if (departureDateStr) {
      const departureDate = new Date(departureDateStr);
      const now = new Date();
      const timeDiff = departureDate.getTime() - now.getTime();
      const hoursDiff = timeDiff / (1000 * 3600);

      if (hoursDiff < 6 && hoursDiff > 0) {
        return res.status(400).json({ success: false, message: 'Cancellation not allowed within 6 hours of departure' });
      }
    }

    booking.bookingStatus = 'pending_cancellation';
    await booking.save();

    res.status(200).json({ success: true, message: 'Cancellation request sent. Please wait. Refund will be processed shortly.', data: booking });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
