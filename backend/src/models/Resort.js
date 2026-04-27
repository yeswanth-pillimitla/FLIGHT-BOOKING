const mongoose = require('mongoose');

const resortSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a resort name']
  },
  location: {
    type: String,
    required: [true, 'Please add a location']
  },
  description: String,
  pricePerDay: {
    type: Number,
    required: [true, 'Please add a price']
  },
  image: String,
  activities: [String],
  rating: {
    type: Number,
    default: 4.8
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Resort', resortSchema);
