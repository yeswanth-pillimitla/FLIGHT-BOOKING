const mongoose = require('mongoose');

const groupBookingSchema = new mongoose.Schema({
  booking_id: {
    type: String,
    unique: true,
    required: true
  },
  from_location: {
    type: String,
    required: [true, 'Origin is required']
  },
  to_location: {
    type: String,
    required: [true, 'Destination is required']
  },
  departure_date: {
    type: Date,
    required: [true, 'Departure date is required']
  },
  people_count: {
    type: Number,
    required: [true, 'Number of people is required'],
    min: [1, 'People count must be at least 1']
  },
  travel_class: {
    type: String,
    required: [true, 'Travel class is required'],
    enum: ['Economy', 'Business', 'First']
  },
  trip_type: {
    type: String,
    required: true,
    enum: ['Domestic', 'International']
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('GroupBooking', groupBookingSchema);
