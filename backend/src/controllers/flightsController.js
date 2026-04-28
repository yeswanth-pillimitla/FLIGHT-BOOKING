const Flight = require('../models/Flight');

// @desc    Search for flights
// @route   GET /api/flights/search
// @access  Public
exports.searchFlights = async (req, res) => {
  try {
    const { from, to, type, date } = req.query;
    
    let query = {};
    
    // Support both lowercase and capitalized field names for Source
    if (from) {
      query.$or = [
        { source: new RegExp(from, 'i') },
        { Source: new RegExp(from, 'i') }
      ];
    }

    // Support both lowercase and capitalized field names for Destination
    if (to) {
      const destFilter = { $or: [
        { destination: new RegExp(to, 'i') },
        { Destination: new RegExp(to, 'i') }
      ]};
      
      if (query.$or) {
        query.$and = [{ $or: query.$or }, destFilter];
        delete query.$or;
      } else {
        query.$or = destFilter.$or;
      }
    }

    // Strictly filter by category as per user request
    if (type && type !== 'All') {
      let typeFilter;
      if (type === 'Domestic') {
        // For Domestic, include explicit 'Domestic' and flights with NO category (default)
        typeFilter = { $or: [
          { category: 'Domestic' },
          { Category: 'Domestic' },
          { category: { $exists: false } },
          { Category: { $exists: false } }
        ]};
      } else {
        // For International, ONLY include explicit 'International'
        typeFilter = { $or: [
          { category: 'International' },
          { Category: 'International' }
        ]};
      }
      
      // Add to query
      if (query.$and) {
        query.$and.push(typeFilter);
      } else if (query.$or) {
        query.$and = [{ $or: query.$or }, typeFilter];
        delete query.$or;
      } else {
        query.$or = typeFilter.$or;
      }
    }
    
    let flights = await Flight.find(query);
    
    // Check for category mismatch if no flights found
    let categoryMismatch = false;
    if (flights.length === 0 && type && type !== 'All') {
      // Build query WITHOUT category filter
      let unfilteredQuery = {};
      if (from) unfilteredQuery.$or = [{ source: new RegExp(from, 'i') }, { Source: new RegExp(from, 'i') }];
      if (to) {
        const dFilter = { $or: [{ destination: new RegExp(to, 'i') }, { Destination: new RegExp(to, 'i') }] };
        if (unfilteredQuery.$or) {
          unfilteredQuery.$and = [{ $or: unfilteredQuery.$or }, dFilter];
          delete unfilteredQuery.$or;
        } else {
          unfilteredQuery.$or = dFilter.$or;
        }
      }
      
      const unfilteredFlights = await Flight.find(unfilteredQuery);
      if (unfilteredFlights.length > 0) {
        categoryMismatch = true;
      }
    }

    // Normalize data for the frontend (convert uppercase keys to lowercase)
    const airlineLogos = {
      'IndiGo': 'https://www.gstatic.com/flights/airline_logos/70px/6E.png',
      'Air India': 'https://www.gstatic.com/flights/airline_logos/70px/AI.png',
      'Jet Airways': 'https://www.gstatic.com/flights/airline_logos/70px/9W.png',
      'SpiceJet': 'https://www.gstatic.com/flights/airline_logos/70px/SG.png',
      'Vistara': 'https://www.gstatic.com/flights/airline_logos/70px/UK.png',
      'GoAir': 'https://www.gstatic.com/flights/airline_logos/70px/G8.png',
      'Air Asia': 'https://www.gstatic.com/flights/airline_logos/70px/I5.png',
      'Multiple carriers': 'https://www.gstatic.com/flights/airline_logos/70px/multiple.png'
    };

    const normalize = (flight) => {
      const f = flight.toObject ? flight.toObject() : flight;
      const airlineName = f.airline || f.Airline || 'Unknown';
      
      let logoUrl = airlineLogos[airlineName];
      if (!logoUrl || (f.logo && !f.logo.includes('placeholder')) || (f.Logo && !f.Logo.includes('placeholder'))) {
        logoUrl = f.logo || f.Logo || logoUrl || 'https://www.gstatic.com/flights/airline_logos/70px/plane.png';
      }

      return {
        _id: f._id,
        airline: airlineName,
        flightNumber: f.flightNumber || f.Flight_Number || f.flight_no || 'N/A',
        source: f.source || f.Source,
        destination: f.destination || f.Destination,
        departureTime: f.departureTime || f.Dep_Time,
        arrivalTime: f.arrivalTime || f.Arrival_Time,
        duration: f.duration || f.Duration,
        price: f.price || f.Price,
        category: f.category || f.Category || 'Domestic',
        logo: logoUrl,
        totalStops: f.totalStops || f.Total_Stops || 'non-stop'
      };
    };

    const normalizedFlights = flights.map(normalize);
    
    res.status(200).json({
      success: true,
      count: normalizedFlights.length,
      categoryMismatch,
      message: categoryMismatch ? `Source and Destination are not ${type}` : undefined,
      data: normalizedFlights
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get all flights
// @route   GET /api/flights
// @access  Public
exports.getAllFlights = async (req, res) => {
  try {
    const flights = await Flight.find({});
    
    const airlineLogos = {
      'IndiGo': 'https://www.gstatic.com/flights/airline_logos/70px/6E.png',
      'Air India': 'https://www.gstatic.com/flights/airline_logos/70px/AI.png',
      'Jet Airways': 'https://www.gstatic.com/flights/airline_logos/70px/9W.png',
      'SpiceJet': 'https://www.gstatic.com/flights/airline_logos/70px/SG.png',
      'Vistara': 'https://www.gstatic.com/flights/airline_logos/70px/UK.png',
      'GoAir': 'https://www.gstatic.com/flights/airline_logos/70px/G8.png',
      'Air Asia': 'https://www.gstatic.com/flights/airline_logos/70px/I5.png',
      'Multiple carriers': 'https://www.gstatic.com/flights/airline_logos/70px/multiple.png'
    };

    const normalizedFlights = flights.map(flight => {
      const f = flight.toObject ? flight.toObject() : flight;
      const airlineName = f.airline || f.Airline || 'Unknown';

      let logoUrl = airlineLogos[airlineName];
      if (!logoUrl || (f.logo && !f.logo.includes('placeholder')) || (f.Logo && !f.Logo.includes('placeholder'))) {
        logoUrl = f.logo || f.Logo || logoUrl || 'https://www.gstatic.com/flights/airline_logos/70px/plane.png';
      }

      return {
        _id: f._id,
        airline: airlineName,
        flightNumber: f.flightNumber || f.Flight_Number || f.flight_no || 'N/A',
        source: f.source || f.Source,
        destination: f.destination || f.Destination,
        departureTime: f.departureTime || f.Dep_Time,
        arrivalTime: f.arrivalTime || f.Arrival_Time,
        duration: f.duration || f.Duration,
        price: f.price || f.Price,
        category: f.category || f.Category || 'Domestic',
        logo: logoUrl,
        totalStops: f.totalStops || f.Total_Stops || 'non-stop'
      };
    });
    res.status(200).json({ success: true, data: normalizedFlights });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
