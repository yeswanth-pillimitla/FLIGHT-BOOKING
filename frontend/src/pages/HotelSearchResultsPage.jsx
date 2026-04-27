import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { MapPin, Calendar, Users, Hotel, BedDouble, Star, Heart, ShowerHead, ArrowRight, Loader2, ArrowLeft, Filter, SlidersHorizontal } from 'lucide-react';
import MainLayout from '../components/MainLayout';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import axios from 'axios';

const HotelCard = ({ hotel, onBook }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-white border border-gray-100 rounded-[32px] shadow-sm overflow-hidden border-gray-100 hover:border-blue-300 transition-all group mb-6"
  >
    <div className="relative h-64">
      <img src={hotel.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={hotel.name} />
      <div className="absolute top-4 left-4 flex space-x-2">
        <span className="bg-secondary/90 backdrop-blur-md text-white text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest shadow-lg">Featured</span>
        <span className="bg-white/90 backdrop-blur-md text-secondary text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest shadow-lg flex items-center">
          <Star size={10} className="mr-1 fill-secondary" /> {hotel.rating}
        </span>
      </div>
      <button className="absolute top-4 right-4 p-2.5 bg-white/90 backdrop-blur-md rounded-full shadow-lg text-gray-400 hover:text-red-500 transition-colors">
        <Heart size={18} />
      </button>
    </div>
    
    <div className="p-6 space-y-5">
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <h4 className="text-2xl font-black text-gray-900 tracking-tight">{hotel.name}</h4>
          <div className="flex items-center text-gray-400 text-xs font-medium">
            <MapPin size={14} className="mr-1.5 text-secondary" />
            <span>{hotel.location} • Premium Resort Area</span>
          </div>
        </div>
        <div className="text-right">
          <div className="flex items-baseline justify-end space-x-1">
            <span className="text-[10px] text-gray-400 font-bold uppercase">$</span>
            <p className="text-3xl font-black text-primary leading-none">{hotel.pricePerNight}</p>
          </div>
          <p className="text-[10px] text-gray-400 uppercase font-black tracking-widest mt-1">/ per night</p>
        </div>
      </div>

      <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">
        {hotel.description || 'Experience world-class hospitality and luxury amenities at this stunning property located in the heart of the city.'}
      </p>

      <div className="flex items-center space-x-6 py-4 border-y border-surface/50">
        <div className="flex flex-col items-center space-y-1">
          <div className="p-2 bg-surface rounded-lg"><Users size={16} className="text-secondary" /></div>
          <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">4 Guests</span>
        </div>
        <div className="flex flex-col items-center space-y-1">
          <div className="p-2 bg-surface rounded-lg"><BedDouble size={16} className="text-secondary" /></div>
          <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">2 Beds</span>
        </div>
        <div className="flex flex-col items-center space-y-1">
          <div className="p-2 bg-surface rounded-lg"><ShowerHead size={16} className="text-secondary" /></div>
          <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Luxury Bath</span>
        </div>
      </div>

      <div className="flex items-center justify-between pt-2">
        <div className="flex -space-x-2">
          {[1,2,3,4].map(i => (
            <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-gray-100 overflow-hidden shadow-sm">
              <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="User" />
            </div>
          ))}
          <div className="w-8 h-8 rounded-full border-2 border-white bg-surface flex items-center justify-center text-[10px] font-black text-secondary shadow-sm">+12</div>
        </div>
        <div className="flex items-center space-x-4">
           <button className="text-gray-400 text-[11px] font-black uppercase tracking-widest hover:text-secondary transition-colors">Details</button>
           <button 
             onClick={() => onBook(hotel)}
             className="px-8 py-3.5 bg-primary hover:bg-primary-deep text-white rounded-xl font-black uppercase tracking-widest text-[10px] transition-all shadow-lg shadow-gray-200 active:scale-95 flex items-center"
           >
             Book Now <ArrowRight size={14} className="ml-2" />
           </button>
        </div>
      </div>
    </div>
  </motion.div>
);

const HotelSearchResultsPage = () => {
  const locationState = useLocation();
  const navigate = useNavigate();
  const [hotels, setHotels] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const searchParams = new URLSearchParams(locationState.search);
  const locationQuery = searchParams.get('location') || '';
  const startDate = searchParams.get('startDate') || '';
  const endDate = searchParams.get('endDate') || '';
  const guests = searchParams.get('guests') || '2';

  useEffect(() => {
    const fetchHotels = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`http://localhost:5000/api/hotels?location=${locationQuery}`);
        if (response.data.success) {
          setHotels(response.data.data);
        }
      } catch (error) {
        toast.error('Failed to fetch hotels');
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHotels();
  }, [locationQuery]);

  return (
    <MainLayout>
      <div className="space-y-6 pb-24">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-8">
           <div className="flex items-center space-x-4">
              <button 
                onClick={() => navigate('/hotel-booking')}
                className="p-2.5 bg-white border border-gray-100 rounded-xl text-gray-500 hover:text-secondary transition-colors shadow-sm"
              >
                <ArrowLeft size={20} />
              </button>
              <div>
                <h1 className="text-2xl font-black text-gray-900 tracking-tight">Available Stays</h1>
                <p className="text-[10px] text-gray-400 uppercase font-black tracking-widest">In {locationQuery || 'All Locations'}</p>
              </div>
           </div>
           <div className="flex space-x-2">
              <button className="p-3 bg-white border border-gray-100 rounded-xl text-gray-500 hover:text-secondary transition-colors shadow-sm"><Filter size={18} /></button>
              <button className="p-3 bg-secondary text-white rounded-xl shadow-lg shadow-gray-200"><SlidersHorizontal size={18} /></button>
           </div>
        </div>

        {/* Search Summary Card */}
        <div className="bg-secondary rounded-3xl p-6 text-white shadow-2xl shadow-gray-200 relative overflow-hidden group">
           <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl group-hover:scale-110 transition-transform duration-700"></div>
           <div className="relative z-10 grid grid-cols-3 gap-6">
              <div className="space-y-1">
                 <p className="text-[10px] font-black uppercase tracking-widest text-gray-100">Location</p>
                 <div className="flex items-center space-x-2">
                    <MapPin size={16} className="text-gray-200" />
                    <span className="font-bold truncate">{locationQuery}</span>
                 </div>
              </div>
              <div className="space-y-1">
                 <p className="text-[10px] font-black uppercase tracking-widest text-gray-100">Duration</p>
                 <div className="flex items-center space-x-2">
                    <Calendar size={16} className="text-gray-200" />
                    <span className="font-bold truncate">{startDate ? `${startDate} - ${endDate}` : 'Dates not set'}</span>
                 </div>
              </div>
              <div className="space-y-1">
                 <p className="text-[10px] font-black uppercase tracking-widest text-gray-100">Travelers</p>
                 <div className="flex items-center space-x-2">
                    <Users size={16} className="text-gray-200" />
                    <span className="font-bold">{guests} Adults</span>
                 </div>
              </div>
           </div>
        </div>

        {/* Results List */}
        <div className="mt-8">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20 space-y-4">
              <div className="w-16 h-16 border-4 border-gray-100 border-t-secondary rounded-full animate-spin"></div>
              <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest">Finding the best luxury stays...</p>
            </div>
          ) : hotels.length > 0 ? (
            <div className="space-y-2">
              <div className="flex items-center justify-between px-2 mb-6">
                 <h3 className="font-black text-lg text-dark tracking-tight uppercase">TOP RECOMMENDED <span className="text-secondary">STAYS</span></h3>
                 <span className="text-[10px] font-black text-secondary bg-surface px-3 py-1 rounded-full uppercase tracking-widest">{hotels.length} Properties</span>
              </div>
              {hotels.map((hotel) => (
                <HotelCard key={hotel._id} hotel={hotel} onBook={() => toast.success(`Booking ${hotel.name}...`)} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 space-y-6">
               <div className="w-24 h-24 bg-surface rounded-full flex items-center justify-center mx-auto">
                  <Hotel size={40} className="text-gray-200" />
               </div>
               <div className="space-y-2">
                  <h3 className="text-xl font-black text-gray-900 uppercase tracking-tighter">No hotels found</h3>
                  <p className="text-xs text-gray-400 max-w-xs mx-auto">We couldn't find any properties matching "{locationQuery}". Try searching for Delhi, Mumbai, or Goa.</p>
               </div>
               <button 
                 onClick={() => navigate('/hotel-booking')}
                 className="px-8 py-3 bg-white border border-gray-100 rounded-xl text-secondary font-black uppercase tracking-widest text-[10px] hover:bg-surface transition-colors shadow-sm"
               >
                 Change Search
               </button>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default HotelSearchResultsPage;
