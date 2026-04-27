const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a hotel name']
  },
  location: {
    type: String,
    required: [true, 'Please add a location']
  },
  description: String,
  pricePerNight: {
    type: Number,
    required: [true, 'Please add a price']
  },
  image: String,
  amenities: [String],
  rating: {
    type: Number,
    default: 4.5
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Hotel', hotelSchema);
