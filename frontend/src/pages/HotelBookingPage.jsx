import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Calendar, Users, ChevronDown, Hotel, BedDouble, Clock, Star, Heart, ShowerHead, ArrowRight, Loader2 } from 'lucide-react';
import MainLayout from '../components/MainLayout';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import axios from 'axios';

const HotelCard = ({ hotel, onBook }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-white border border-gray-100 rounded-3xl shadow-sm overflow-hidden border-gray-100 hover:border-blue-300 transition-all group mb-6"
  >
    <div className="relative h-56">
      <img src={hotel.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={hotel.name} />
      <button className="absolute top-4 right-4 p-2.5 bg-white/90 backdrop-blur-md rounded-full shadow-lg text-gray-400 hover:text-red-500 transition-colors">
        <Heart size={18} />
      </button>
    </div>
    
    <div className="p-5 space-y-4">
      <div className="flex justify-between items-start">
        <div>
          <h4 className="text-xl font-bold text-gray-900">{hotel.name}</h4>
          <div className="flex items-center text-gray-400 text-xs mt-1">
            <MapPin size={12} className="mr-1 text-surface0" />
            <span>{hotel.location}</span>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xl font-black text-primary">${hotel.pricePerNight}.00</p>
          <p className="text-[10px] text-gray-400 uppercase font-bold">/ Night</p>
        </div>
      </div>

      <div className="flex items-center space-x-4 py-2 border-y border-surface">
        <div className="flex items-center space-x-1.5">
          <Users size={14} className="text-surface0" />
          <span className="text-[11px] font-bold text-gray-600">4 Guests</span>
        </div>
        <div className="flex items-center space-x-1.5">
          <BedDouble size={14} className="text-surface0" />
          <span className="text-[11px] font-bold text-gray-600">2 Bedroom</span>
        </div>
        <div className="flex items-center space-x-1.5">
          <ShowerHead size={14} className="text-surface0" />
          <span className="text-[11px] font-bold text-gray-600">1 Bathroom</span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="flex text-orange-400">
            <Star size={14} fill="currentColor" />
          </div>
          <span className="text-xs font-bold text-gray-900">{hotel.rating}</span>
          <span className="text-xs text-gray-400 font-medium">( 123 Reviews )</span>
        </div>
        <button className="text-secondary text-xs font-bold flex items-center hover:translate-x-1 transition-transform">
          View Details <ArrowRight size={14} className="ml-1" />
        </button>
      </div>

      <button 
        onClick={() => onBook(hotel)}
        className="w-full py-4 bg-accent hover:bg-accent-deep text-white rounded-2xl font-black uppercase tracking-widest text-xs transition-all shadow-lg mt-2"
      >
        Booking Now
      </button>
    </div>
  </motion.div>
);

const HotelBookingPage = () => {
  const [stayType, setStayType] = useState('Long Stay');
  const [location, setLocation] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [rooms, setRooms] = useState(1);
  const [adults, setAdults] = useState(2);
  
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (!location) return toast.error('Please enter a location');
    
    // Navigate to results page with query parameters
    const params = new URLSearchParams({
      location,
      startDate,
      endDate,
      guests: adults,
      rooms
    });
    
    navigate(`/hotel-results?${params.toString()}`);
  };


  const handleBook = (hotel) => {
    toast.success(`Redirecting to book ${hotel.name}...`);
  };

  return (
    <MainLayout>
      <div className="space-y-6 pb-24">
        <div className="flex items-center space-x-3 mb-6">
          <div className="bg-gray-100 p-3 rounded-2xl"><Hotel className="text-primary" size={24} /></div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Hotel Booking</h1>
            <p className="text-gray-400 text-xs">Find your perfect stay anywhere</p>
          </div>
        </div>

        <div className="flex bg-surface p-1 rounded-2xl border border-gray-100">
          {['Long Stay', 'Hourly Stay'].map((t) => (
            <button key={t} onClick={() => setStayType(t)}
              className={`flex-1 py-3 text-xs font-bold rounded-xl transition-all flex items-center justify-center space-x-2 ${stayType === t ? 'bg-secondary text-white shadow-lg shadow-blue-300' : 'text-gray-500 hover:text-gray-700'}`}>
              {t === 'Hourly Stay' ? <Clock size={14} /> : <BedDouble size={14} />}
              <span>{t}</span>
            </button>
          ))}
        </div>

        <div className="bg-white border border-gray-100 rounded-3xl shadow-sm p-6 space-y-6">
          <div className="space-y-4">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-400 ml-1 uppercase tracking-widest">Location</label>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-surface0" size={18} />
                <input 
                  type="text" 
                  placeholder="Where are you going? (e.g. Delhi)" 
                  className="w-full bg-surface border border-gray-100 rounded-2xl p-4 text-dark font-bold focus:border-primary transition-colors outline-none pl-12" 
                  value={location} 
                  onChange={(e) => setLocation(e.target.value)} 
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 ml-1 uppercase tracking-widest">Check In</label>
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-surface0" size={18} />
                  <input type="date" className="w-full bg-surface border border-gray-100 rounded-2xl p-4 text-dark font-bold focus:border-primary transition-colors outline-none pl-12" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 ml-1 uppercase tracking-widest">{stayType === 'Hourly Stay' ? 'Duration' : 'Check Out'}</label>
                <div className="relative">
                  {stayType === 'Hourly Stay' ? (
                    <>
                      <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-surface0" size={18} />
                      <select className="w-full bg-surface border border-gray-100 rounded-2xl p-4 text-dark font-bold focus:border-primary transition-colors outline-none pl-12 appearance-none">
                        <option>3 Hours</option><option>6 Hours</option><option>12 Hours</option>
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
                    </>
                  ) : (
                    <>
                      <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-surface0" size={18} />
                      <input type="date" className="w-full bg-surface border border-gray-100 rounded-2xl p-4 text-dark font-bold focus:border-primary transition-colors outline-none pl-12" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 ml-1 uppercase tracking-widest">Rooms</label>
                <div className="relative">
                  <BedDouble className="absolute left-4 top-1/2 -translate-y-1/2 text-surface0" size={18} />
                  <select className="w-full bg-surface border border-gray-100 rounded-2xl p-4 text-dark font-bold focus:border-primary transition-colors outline-none pl-12 appearance-none" value={rooms} onChange={(e) => setRooms(e.target.value)}>
                    {[1,2,3,4].map(num => <option key={num} value={num}>{num} Room</option>)}
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 ml-1 uppercase tracking-widest">Adults</label>
                <div className="relative">
                  <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-surface0" size={18} />
                  <select className="w-full bg-surface border border-gray-100 rounded-2xl p-4 text-dark font-bold focus:border-primary transition-colors outline-none pl-12 appearance-none" value={adults} onChange={(e) => setAdults(e.target.value)}>
                    {[1,2,3,4,5,6].map(num => <option key={num} value={num}>{num} Adults</option>)}
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
                </div>
              </div>
            </div>
          </div>
          <button 
            onClick={handleSearch} 
            className="w-full bg-primary hover:bg-primary-deep text-white rounded-2xl shadow-lg shadow-primary/20 transition-all active:scale-95 py-4 uppercase tracking-widest text-xs flex items-center justify-center space-x-2"
          >
            <span>Search Hotels</span>
          </button>
        </div>


        <div className="space-y-4 pt-4">
             <h3 className="font-bold text-lg px-2 text-gray-900">Popular Stays</h3>
             <div className="space-y-4">
                {[
                  { name: 'Grand Hyatt', pricePerNight: 299, image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=600', rating: 4.8, location: 'Mumbai' },
                  { name: 'The Ritz-Carlton', pricePerNight: 450, image: '/images/ritz-carlton.png', rating: 4.9, location: 'Bangalore' },
                  { name: 'Taj Palace', pricePerNight: 350, image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=600', rating: 4.9, location: 'Mumbai' },
                  { name: 'Oberoi Amarvilas', pricePerNight: 550, image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=600', rating: 5.0, location: 'Agra' },
                  { name: 'Radisson Blu', pricePerNight: 180, image: '/images/radisson-blu.png', rating: 4.6, location: 'Goa' },
                  { name: 'JW Marriott', pricePerNight: 320, image: 'https://images.unsplash.com/photo-1590073242678-70ee3fc28e8e?auto=format&fit=crop&q=80&w=600', rating: 4.7, location: 'Jaipur' }
                ].map(hotel => (
                  <div key={hotel.name} className="flex space-x-4 bg-white border border-gray-100 rounded-3xl shadow-sm p-3 items-center group cursor-pointer border-surface">
                     <img src={hotel.image} className="w-20 h-20 rounded-xl object-cover" alt={hotel.name} />
                     <div className="flex-1">
                        <p className="font-bold text-gray-900 group-hover:text-secondary transition-colors">{hotel.name}</p>
                        <p className="text-[10px] text-gray-400">{hotel.location} • Luxury Suite</p>
                        <div className="flex items-center space-x-1 mt-1">
                           <div className="bg-surface text-secondary text-[8px] font-bold px-1.5 py-0.5 rounded">Top Rated</div>
                           <span className="text-[10px] text-gray-500 font-bold">{hotel.rating}★</span>
                        </div>
                     </div>
                     <div className="text-right">
                        <p className="font-bold text-gray-900">${hotel.pricePerNight}</p>
                        <p className="text-[8px] text-gray-400">/ night</p>
                     </div>
                  </div>
                ))}
             </div>
        </div>
      </div>
    </MainLayout>
  );
};



export default HotelBookingPage;
