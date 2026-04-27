const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: true, credentials: true }));
app.use(helmet());
app.use(cookieParser());

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 1000, // Increased for development
  message: 'Too many requests from this IP, please try again after 15 minutes'
});
app.use('/api', limiter);

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/bookings', require('./routes/bookingRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/hotels', require('./routes/hotelRoutes'));
app.use('/api/resorts', require('./routes/resortRoutes'));
app.use('/api/cargo-booking', require('./routes/cargoRoutes'));
app.use('/api/group-booking', require('./routes/groupRoutes'));
app.use('/api/flights', require('./routes/flightRoutes'));

// Basic Route
app.get('/', (req, res) => {
  res.send('Flight Booking API is running...');
});

module.exports = app;
