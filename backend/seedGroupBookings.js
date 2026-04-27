const mongoose = require('mongoose');
const GroupBooking = require('./src/models/GroupBooking');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();

const mongoURI = process.env.MONGODB_URI || 'mongodb+srv://flightdatabaseUser:yash1234@cluster0.u4rxnjw.mongodb.net/?appName=Cluster0';

const seedData = [
  {
    booking_id: 'GRP-IND-001',
    from_location: 'New Delhi, India',
    to_location: 'Mumbai, Maharashtra, India',
    departure_date: new Date('2026-05-15'),
    people_count: 25,
    travel_class: 'Economy',
    trip_type: 'Domestic'
  },
  {
    booking_id: 'GRP-INT-002',
    from_location: 'Mumbai, India',
    to_location: 'London Heathrow, UK',
    departure_date: new Date('2026-06-10'),
    people_count: 12,
    travel_class: 'Business',
    trip_type: 'International'
  },
  {
    booking_id: 'GRP-IND-003',
    from_location: 'Bangalore, Karnataka, India',
    to_location: 'Goa, India',
    departure_date: new Date('2026-05-20'),
    people_count: 15,
    travel_class: 'Economy',
    trip_type: 'Domestic'
  },
  {
    booking_id: 'GRP-INT-004',
    from_location: 'Delhi, India',
    to_location: 'Dubai, UAE',
    departure_date: new Date('2026-07-05'),
    people_count: 40,
    travel_class: 'First',
    trip_type: 'International'
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log('Connected to MongoDB Atlas for seeding...');
    
    // Clear existing group bookings
    await GroupBooking.deleteMany({});
    console.log('Cleared existing Group Bookings.');

    // Insert new data
    await GroupBooking.insertMany(seedData);
    console.log('Successfully inserted sample Group Bookings!');
    
    process.exit();
  } catch (err) {
    console.error('Error seeding database:', err);
    process.exit(1);
  }
};

seedDB();
