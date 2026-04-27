const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Flight = require('../models/Flight');
const User = require('../models/User');

dotenv.config({ path: './.env' });

const flights = [
  {
    airline: 'IndiGo',
    flightNumber: '6E-202',
    source: 'Chennai',
    destination: 'Bangalore',
    departureTime: new Date('2026-04-20T06:00:00'),
    arrivalTime: new Date('2026-04-20T07:15:00'),
    price: 120,
    classOptions: ['Economy'],
    category: 'Domestic',
  },
  {
    airline: 'Air India',
    flightNumber: 'AI-450',
    source: 'Delhi',
    destination: 'Mumbai',
    departureTime: new Date('2026-04-21T10:30:00'),
    arrivalTime: new Date('2026-04-21T12:45:00'),
    price: 250,
    classOptions: ['Economy', 'Business'],
    category: 'Domestic',
  },
  {
    airline: 'Emirates',
    flightNumber: 'EK-501',
    source: 'Dubai',
    destination: 'London',
    departureTime: new Date('2026-04-22T14:20:00'),
    arrivalTime: new Date('2026-04-22T18:50:00'),
    price: 890,
    classOptions: ['Economy', 'Business', 'First Class'],
    category: 'International',
  },
];

const users = [
  {
    name: 'Demo User',
    email: 'user@example.com',
    password: 'password123',
    role: 'user'
  },
  {
    name: 'Admin User',
    email: 'admin@skyflow.com',
    password: 'password123',
    role: 'admin'
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to DB for seeding...');
    
    // Clear existing
    await Flight.deleteMany();
    await User.deleteMany();
    
    // Insert new
    await Flight.insertMany(flights);
    
    // We need to use create for users to trigger the password hashing middleware
    for (const u of users) {
      await User.create(u);
    }
    
    console.log('Flights and Users Seeded Successfully');
    process.exit();
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedDB();
