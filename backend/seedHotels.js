const mongoose = require('mongoose');
const Hotel = require('./src/models/Hotel');

const hotels = [
  {
    name: 'The Leela Palace',
    location: 'Delhi',
    description: 'A luxurious stay in the heart of the capital.',
    pricePerNight: 250,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=600',
    amenities: ['Pool', 'Spa', 'Gym', 'Restaurant']
  },
  {
    name: 'Taj Mahal Hotel',
    location: 'Delhi',
    description: 'Iconic luxury and hospitality.',
    pricePerNight: 200,
    rating: 4.8,
    image: '/images/ritz-carlton.png',
    amenities: ['Wi-Fi', 'Pool', 'Lounge']
  },
  {
    name: 'The Oberoi',
    location: 'Mumbai',
    description: 'Elegant luxury overlooking the Marine Drive.',
    pricePerNight: 280,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=600',
    amenities: ['Ocean View', 'Infinity Pool', 'Fine Dining']
  },
  {
    name: 'ITC Gardenia',
    location: 'Bangalore',
    description: 'A tribute to the garden city.',
    pricePerNight: 180,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=600',
    amenities: ['Greenery', 'Luxury Spa', 'Health Club']
  },
  {
    name: 'W Goa',
    location: 'Goa',
    description: 'Beachfront luxury with vibrant vibes.',
    pricePerNight: 320,
    rating: 4.6,
    image: '/images/radisson-blu.png',
    amenities: ['Private Beach', 'Bar', 'Nightlife']
  },
  {
    name: 'Rambagh Palace',
    location: 'Jaipur',
    description: 'Live like royalty in the pink city.',
    pricePerNight: 400,
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1590073242678-70ee3fc28e8e?auto=format&fit=crop&q=80&w=600',
    amenities: ['Royal Suites', 'Gardens', 'Heritage Tour']
  },
  {
    name: 'Taj Palace',
    location: 'Mumbai',
    description: 'Iconic heritage hotel by the Gateway of India.',
    pricePerNight: 350,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=600',
    amenities: ['Heritage Tour', 'Sea View', 'Luxury Spa']
  },
  {
    name: 'Oberoi Amarvilas',
    location: 'Agra',
    description: 'Every room offers a view of the Taj Mahal.',
    pricePerNight: 550,
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=600',
    amenities: ['Taj View', 'Private Balcony', 'Royal Service']
  },
  {
    name: 'Radisson Blu',
    location: 'Goa',
    description: 'Mediterranean-style resort near Cavelossim Beach.',
    pricePerNight: 180,
    rating: 4.6,
    image: '/images/radisson-blu.png',
    amenities: ['Beach Access', 'Water Sports', 'Poolside Bar']
  },
  {
    name: 'JW Marriott',
    location: 'Jaipur',
    description: 'Palatial luxury with traditional Rajasthani architecture.',
    pricePerNight: 320,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1590073242678-70ee3fc28e8e?auto=format&fit=crop&q=80&w=600',
    amenities: ['Folk Dance', 'Palatial Suites', 'Spa']
  }
];

mongoose.connect('mongodb+srv://flightdatabaseUser:yash1234@cluster0.u4rxnjw.mongodb.net/?appName=Cluster0')
  .then(async () => {
    console.log('Connected to MongoDB...');
    await Hotel.deleteMany({});
    await Hotel.insertMany(hotels);
    console.log('Domestic hotels seeded successfully!');
    mongoose.connection.close();
  })
  .catch(err => {
    console.error('Error seeding hotels:', err);
    process.exit(1);
  });

