const mongoose = require('mongoose');

const flightSchema = new mongoose.Schema({
  airline: {
    type: String,
    required: [true, 'Please add an airline name']
  },
  flightNumber: {
    type: String,
    required: [true, 'Please add a flight number']
  },
  source: {
    type: String,
    required: [true, 'Please add a source location']
  },
  destination: {
    type: String,
    required: [true, 'Please add a destination location']
  },
  departureTime: {
    type: String,
    required: [true, 'Please add departure time']
  },
  arrivalTime: {
    type: String,
    required: [true, 'Please add arrival time']
  },
  price: {
    type: Number,
    required: [true, 'Please add a price']
  },
  classOptions: {
    type: [String],
    enum: ['Economy', 'Business', 'First Class'],
    default: ['Economy']
  },
  seats: [{
    seatId: String,
    status: {
      type: String,
      enum: ['available', 'booked', 'pending'],
      default: 'available'
    },
    priceMultiplier: {
      type: Number,
      default: 1
    }
  }],
  category: {
    type: String,
    enum: ['Domestic', 'International'],
    required: true
  },
  logo: {
    type: String,
    default: 'https://via.placeholder.com/50'
  },
  status: {
    type: String,
    enum: ['active', 'cancelled', 'maintenance'],
    default: 'active'
  }
});

module.exports = mongoose.model('Flight', flightSchema);
