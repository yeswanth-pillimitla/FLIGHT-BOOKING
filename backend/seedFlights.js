const mongoose = require('mongoose');
const Flight = require('./src/models/Flight');
require('dotenv').config();

const flights = [
  // New Domestic Dataset
  {
    airline: 'IndiGo',
    flightNumber: '6E-203',
    source: 'Delhi',
    destination: 'Mumbai',
    departureTime: new Date('2026-04-27T08:30:00'),
    arrivalTime: new Date('2026-04-27T10:40:00'),
    price: 4500,
    classOptions: ['Economy', 'Business', 'First Class'],
    category: 'Domestic',
    logo: 'https://www.gstatic.com/flights/airline_logos/70px/6E.png'
  },
  {
    airline: 'Air India',
    flightNumber: 'AI-502',
    source: 'Delhi',
    destination: 'Bangalore',
    departureTime: new Date('2026-04-27T10:00:00'),
    arrivalTime: new Date('2026-04-27T12:45:00'),
    price: 5500,
    classOptions: ['Economy', 'Business', 'First Class'],
    category: 'Domestic',
    logo: 'https://www.gstatic.com/flights/airline_logos/70px/AI.png'
  },
  {
    airline: 'Vistara',
    flightNumber: 'UK-829',
    source: 'Mumbai',
    destination: 'Hyderabad',
    departureTime: new Date('2026-04-27T14:20:00'),
    arrivalTime: new Date('2026-04-27T16:00:00'),
    price: 4000,
    classOptions: ['Economy', 'Business', 'First Class'],
    category: 'Domestic',
    logo: 'https://www.gstatic.com/flights/airline_logos/70px/UK.png'
  },
  {
    airline: 'Akasa Air',
    flightNumber: 'QP-1123',
    source: 'Bangalore',
    destination: 'Goa',
    departureTime: new Date('2026-04-27T16:00:00'),
    arrivalTime: new Date('2026-04-27T17:20:00'),
    price: 3500,
    classOptions: ['Economy', 'Business', 'First Class'],
    category: 'Domestic',
    logo: 'https://www.gstatic.com/flights/airline_logos/70px/QP.png'
  },
  {
    airline: 'SpiceJet',
    flightNumber: 'SG-8152',
    source: 'Hyderabad',
    destination: 'Chennai',
    departureTime: new Date('2026-04-27T18:10:00'),
    arrivalTime: new Date('2026-04-27T19:25:00'),
    price: 2800,
    classOptions: ['Economy', 'Business', 'First Class'],
    category: 'Domestic',
    logo: 'https://www.gstatic.com/flights/airline_logos/70px/SG.png'
  },
  // New International Dataset
  {
    airline: 'Emirates',
    flightNumber: 'EK-511',
    source: 'Delhi',
    destination: 'Dubai',
    departureTime: new Date('2026-05-01T09:00:00'),
    arrivalTime: new Date('2026-05-01T12:30:00'),
    price: 18000,
    classOptions: ['Economy', 'Business', 'First Class'],
    category: 'International',
    logo: 'https://www.gstatic.com/flights/airline_logos/70px/EK.png'
  },
  {
    airline: 'British Airways',
    flightNumber: 'BA-256',
    source: 'Delhi',
    destination: 'London',
    departureTime: new Date('2026-05-01T11:30:00'),
    arrivalTime: new Date('2026-05-01T20:40:00'),
    price: 55000,
    classOptions: ['Economy', 'Business', 'First Class'],
    category: 'International',
    logo: 'https://www.gstatic.com/flights/airline_logos/70px/BA.png'
  },
  {
    airline: 'Etihad Airways',
    flightNumber: 'EY-205',
    source: 'Mumbai',
    destination: 'Abu Dhabi',
    departureTime: new Date('2026-05-01T13:00:00'),
    arrivalTime: new Date('2026-05-01T16:10:00'),
    price: 16000,
    classOptions: ['Economy', 'Business', 'First Class'],
    category: 'International',
    logo: 'https://www.gstatic.com/flights/airline_logos/70px/EY.png'
  },
  {
    airline: 'Singapore Airlines',
    flightNumber: 'SQ-503',
    source: 'Bangalore',
    destination: 'Singapore',
    departureTime: new Date('2026-05-01T22:00:00'),
    arrivalTime: new Date('2026-05-02T04:50:00'),
    price: 30000,
    classOptions: ['Economy', 'Business', 'First Class'],
    category: 'International',
    logo: 'https://www.gstatic.com/flights/airline_logos/70px/SQ.png'
  },
  {
    airline: 'Qatar Airways',
    flightNumber: 'QR-501',
    source: 'Hyderabad',
    destination: 'Doha',
    departureTime: new Date('2026-05-02T02:30:00'),
    arrivalTime: new Date('2026-05-02T06:40:00'),
    price: 25000,
    classOptions: ['Economy', 'Business', 'First Class'],
    category: 'International',
    logo: 'https://www.gstatic.com/flights/airline_logos/70px/QR.png'
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to Atlas DB for seeding flights...');
    await Flight.deleteMany({});
    await Flight.insertMany(flights);
    console.log('Successfully seeded flights to Atlas DB');
    process.exit();
  } catch (err) {
    console.error('Error seeding DB:', err);
    process.exit(1);
  }
};

seedDB();
