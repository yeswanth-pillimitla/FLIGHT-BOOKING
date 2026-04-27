const mongoose = require('mongoose');
const Flight = require('./src/models/Flight');
require('dotenv').config();

const flights = [
  // Domestic Flights
  {
    airline: 'AirAsia India',
    flightNumber: 'I5-1520',
    source: 'Delhi',
    destination: 'Pune',
    departureTime: new Date('2026-05-10T06:00:00'),
    arrivalTime: new Date('2026-05-10T08:15:00'),
    price: 3200,
    classOptions: ['Economy'],
    category: 'Domestic',
    logo: 'https://www.gstatic.com/flights/airline_logos/70px/I5.png'
  },
  {
    airline: 'Vistara',
    flightNumber: 'UK-991',
    source: 'Chennai',
    destination: 'Bangalore',
    departureTime: new Date('2026-05-11T17:30:00'),
    arrivalTime: new Date('2026-05-11T18:40:00'),
    price: 2900,
    classOptions: ['Economy', 'Business', 'First Class'],
    category: 'Domestic',
    logo: 'https://www.gstatic.com/flights/airline_logos/70px/UK.png'
  },
  {
    airline: 'IndiGo',
    flightNumber: '6E-453',
    source: 'Bangalore',
    destination: 'Hyderabad',
    departureTime: new Date('2026-05-12T09:20:00'),
    arrivalTime: new Date('2026-05-12T10:35:00'),
    price: 2100,
    classOptions: ['Economy'],
    category: 'Domestic',
    logo: 'https://www.gstatic.com/flights/airline_logos/70px/6E.png'
  },
  {
    airline: 'Air India',
    flightNumber: 'AI-211',
    source: 'Mumbai',
    destination: 'Delhi',
    departureTime: new Date('2026-05-13T14:00:00'),
    arrivalTime: new Date('2026-05-13T16:15:00'),
    price: 4100,
    classOptions: ['Economy', 'Business', 'First Class'],
    category: 'Domestic',
    logo: 'https://www.gstatic.com/flights/airline_logos/70px/AI.png'
  },
  {
    airline: 'SpiceJet',
    flightNumber: 'SG-224',
    source: 'Pune',
    destination: 'Goa',
    departureTime: new Date('2026-05-14T11:45:00'),
    arrivalTime: new Date('2026-05-14T12:50:00'),
    price: 2500,
    classOptions: ['Economy'],
    category: 'Domestic',
    logo: 'https://www.gstatic.com/flights/airline_logos/70px/SG.png'
  },
  {
    airline: 'Akasa Air',
    flightNumber: 'QP-1110',
    source: 'Goa',
    destination: 'Mumbai',
    departureTime: new Date('2026-05-15T15:30:00'),
    arrivalTime: new Date('2026-05-15T16:45:00'),
    price: 2400,
    classOptions: ['Economy'],
    category: 'Domestic',
    logo: 'https://www.gstatic.com/flights/airline_logos/70px/QP.png'
  },
  {
    airline: 'Air India Express',
    flightNumber: 'IX-401',
    source: 'Kochi',
    destination: 'Bangalore',
    departureTime: new Date('2026-05-16T10:00:00'),
    arrivalTime: new Date('2026-05-16T11:10:00'),
    price: 2600,
    classOptions: ['Economy'],
    category: 'Domestic',
    logo: 'https://www.gstatic.com/flights/airline_logos/70px/IX.png'
  },

  // International Flights
  {
    airline: 'Singapore Airlines',
    flightNumber: 'SQ-405',
    source: 'Delhi',
    destination: 'Singapore',
    departureTime: new Date('2026-05-20T21:40:00'),
    arrivalTime: new Date('2026-05-21T06:00:00'),
    price: 28500,
    classOptions: ['Economy', 'Business', 'First Class'],
    category: 'International',
    logo: 'https://www.gstatic.com/flights/airline_logos/70px/SQ.png'
  },
  {
    airline: 'Emirates',
    flightNumber: 'EK-501',
    source: 'Mumbai',
    destination: 'Dubai',
    departureTime: new Date('2026-05-22T04:30:00'),
    arrivalTime: new Date('2026-05-22T06:00:00'),
    price: 19500,
    classOptions: ['Economy', 'Business', 'First Class'],
    category: 'International',
    logo: 'https://www.gstatic.com/flights/airline_logos/70px/EK.png'
  },
  {
    airline: 'Qatar Airways',
    flightNumber: 'QR-505',
    source: 'Bangalore',
    destination: 'Doha',
    departureTime: new Date('2026-05-23T03:55:00'),
    arrivalTime: new Date('2026-05-23T05:55:00'),
    price: 24000,
    classOptions: ['Economy', 'Business', 'First Class'],
    category: 'International',
    logo: 'https://www.gstatic.com/flights/airline_logos/70px/QR.png'
  },
  {
    airline: 'Lufthansa',
    flightNumber: 'LH-755',
    source: 'Delhi',
    destination: 'Frankfurt',
    departureTime: new Date('2026-05-24T02:50:00'),
    arrivalTime: new Date('2026-05-24T08:00:00'),
    price: 45000,
    classOptions: ['Economy', 'Business', 'First Class'],
    category: 'International',
    logo: 'https://www.gstatic.com/flights/airline_logos/70px/LH.png'
  },
  {
    airline: 'Cathay Pacific',
    flightNumber: 'CX-694',
    source: 'Mumbai',
    destination: 'Hong Kong',
    departureTime: new Date('2026-05-25T01:05:00'),
    arrivalTime: new Date('2026-05-25T09:30:00'),
    price: 31000,
    classOptions: ['Economy', 'Business'],
    category: 'International',
    logo: 'https://www.gstatic.com/flights/airline_logos/70px/CX.png'
  },
  {
    airline: 'British Airways',
    flightNumber: 'BA-257',
    source: 'London',
    destination: 'Delhi',
    departureTime: new Date('2026-05-26T18:40:00'),
    arrivalTime: new Date('2026-05-27T08:25:00'),
    price: 42000,
    classOptions: ['Economy', 'Business', 'First Class'],
    category: 'International',
    logo: 'https://www.gstatic.com/flights/airline_logos/70px/BA.png'
  },
  {
    airline: 'Air France',
    flightNumber: 'AF-225',
    source: 'Delhi',
    destination: 'Paris',
    departureTime: new Date('2026-05-28T00:35:00'),
    arrivalTime: new Date('2026-05-28T06:15:00'),
    price: 44000,
    classOptions: ['Economy', 'Business', 'First Class'],
    category: 'International',
    logo: 'https://www.gstatic.com/flights/airline_logos/70px/AF.png'
  },
  {
    airline: 'Etihad Airways',
    flightNumber: 'EY-206',
    source: 'Abu Dhabi',
    destination: 'Mumbai',
    departureTime: new Date('2026-05-29T21:40:00'),
    arrivalTime: new Date('2026-05-30T02:30:00'),
    price: 18500,
    classOptions: ['Economy', 'Business', 'First Class'],
    category: 'International',
    logo: 'https://www.gstatic.com/flights/airline_logos/70px/EY.png'
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to Atlas DB for inserting new flights...');
    // Only inserting, NOT deleting
    await Flight.insertMany(flights);
    console.log(`Successfully added ${flights.length} new flights to Atlas DB`);
    process.exit();
  } catch (err) {
    console.error('Error seeding DB:', err);
    process.exit(1);
  }
};

seedDB();
