const mongoose = require('mongoose');

const cargoBookingSchema = new mongoose.Schema({
  booking_id: {
    type: String,
    unique: true,
    required: true
  },
  origin: {
    type: String,
    required: [true, 'Origin is required']
  },
  destination: {
    type: String,
    required: [true, 'Destination is required']
  },
  shipment_date: {
    type: Date,
    required: [true, 'Shipment date is required']
  },
  weight: {
    type: Number,
    required: [true, 'Weight is required'],
    min: [0.1, 'Weight must be greater than 0']
  },
  cargo_type: {
    type: String,
    required: [true, 'Cargo type is required'],
    enum: ['General', 'Fragile', 'Perishable']
  },
  shipping_type: {
    type: String,
    required: true,
    enum: ['Domestic', 'International']
  },
  delivery_speed: {
    type: String,
    required: [true, 'Delivery speed is required'],
    enum: ['Priority', 'Standard', 'Economy']
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('CargoBooking', cargoBookingSchema);
