import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Calendar, Users, ChevronDown, Repeat2, Plane, Globe } from 'lucide-react';
import MainLayout from '../components/MainLayout';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const FlightBookingPage = () => {
  const [tripType, setTripType] = useState('One-way');
  const [flightType, setFlightType] = useState('Domestic');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [departureDate, setDepartureDate] = useState('');

  const [returnDate, setReturnDate] = useState('');
  const [flightClass, setFlightClass] = useState('Economy');
  const [passengers, setPassengers] = useState(1);
  const navigate = useNavigate();

  const handleSwap = () => { const temp = from; setFrom(to); setTo(temp); };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!from || !to || !departureDate) return toast.error('Please fill in all required fields');
    navigate('/flights', { state: { type: flightType, from, to, date: departureDate, flightClass, passengers, tripType } });
  };

  return (
    <MainLayout>
      <div className="space-y-6 pb-10">
        <div className="flex items-center space-x-3 mb-6">
          <div className="bg-gray-100 p-3 rounded-2xl"><Plane className="text-primary rotate-45" size={24} /></div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Flight Booking</h1>
            <p className="text-gray-400 text-xs">Search for the best flights around the world</p>
          </div>
        </div>

        {/* Trip Type Tabs */}
        <div className="flex bg-surface p-1 rounded-2xl border border-gray-100">
          {['One-way', 'Round-trip', 'Multi-city'].map((t) => (
            <button key={t} onClick={() => setTripType(t)}
              className={`flex-1 py-3 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${tripType === t ? 'bg-primary text-white shadow-xl shadow-primary/20' : 'text-gray-400 hover:text-dark'}`}>
              {t}
            </button>
          ))}
        </div>

        {/* Flight Type Toggle */}
        <div className="flex space-x-4 px-2">
          {['Domestic', 'International'].map((ft) => (
            <label key={ft} className="flex items-center space-x-2 cursor-pointer group">
              <input type="radio" name="flightType" checked={flightType === ft} onChange={() => setFlightType(ft)} className="hidden" />
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${flightType === ft ? 'border-primary' : 'border-gray-300'}`}>
                {flightType === ft && <div className="w-2.5 h-2.5 rounded-full bg-primary"></div>}
              </div>
              <span className={`text-xs font-bold ${flightType === ft ? 'text-primary' : 'text-gray-400'}`}>{ft}</span>
            </label>
          ))}
        </div>

        {/* Search Form */}
        <div className="bg-white border border-gray-100 rounded-[32px] shadow-sm p-6 space-y-6">
          <div className="grid grid-cols-1 gap-6 relative">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-400 ml-1 uppercase tracking-widest">From</label>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary" size={18} />
                <input type="text" placeholder="Starting Location" className="w-full bg-surface border border-gray-100 rounded-2xl p-4 text-dark font-bold focus:border-primary transition-colors outline-none pl-12" value={from} onChange={(e) => setFrom(e.target.value)} />
              </div>
            </div>
            <button onClick={handleSwap} className="absolute left-1/2 top-[47%] -translate-x-1/2 -translate-y-1/2 bg-white border border-gray-100 p-2 rounded-full z-10 hover:bg-surface transition-all active:rotate-180 shadow-sm">
              <Repeat2 size={18} className="text-primary" />
            </button>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-400 ml-1 uppercase tracking-widest">To</label>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary" size={18} />
                <input type="text" placeholder="Destination" className="w-full bg-surface border border-gray-100 rounded-2xl p-4 text-dark font-bold focus:border-primary transition-colors outline-none pl-12" value={to} onChange={(e) => setTo(e.target.value)} />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-400 ml-1 uppercase tracking-widest">Departure</label>
              <div className="relative">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary" size={18} />
                <input type="date" className="w-full bg-surface border border-gray-100 rounded-2xl p-4 text-dark font-bold focus:border-primary transition-colors outline-none pl-12" value={departureDate} onChange={(e) => setDepartureDate(e.target.value)} />
              </div>
            </div>
            {tripType === 'Round-trip' && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 ml-1 uppercase tracking-widest">Return</label>
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary" size={18} />
                  <input type="date" className="w-full bg-surface border border-gray-100 rounded-2xl p-4 text-dark font-bold focus:border-primary transition-colors outline-none pl-12" value={returnDate} onChange={(e) => setReturnDate(e.target.value)} />
                </div>
              </motion.div>
            )}
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-400 ml-1 uppercase tracking-widest">Class</label>
              <div className="relative">
                <Globe className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary" size={18} />
                <select className="w-full bg-surface border border-gray-100 rounded-2xl p-4 text-dark font-bold focus:border-primary transition-colors outline-none pl-12 appearance-none" value={flightClass} onChange={(e) => setFlightClass(e.target.value)}>
                  <option value="Economy">Economy</option>
                  <option value="Business">Business</option>
                  <option value="First Class">First Class</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-400 ml-1 uppercase tracking-widest">Passengers</label>
              <div className="relative">
                <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary" size={18} />
                <select className="w-full bg-surface border border-gray-100 rounded-2xl p-4 text-dark font-bold focus:border-primary transition-colors outline-none pl-12 appearance-none" value={passengers} onChange={(e) => setPassengers(e.target.value)}>
                  {[1,2,3,4,5,6,7,8,9].map(num => <option key={num} value={num}>{num} {num === 1 ? 'Pax' : 'Paxes'}</option>)}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
              </div>
            </div>
          </div>

          <button onClick={handleSearch} className="w-full bg-accent hover:bg-accent-deep text-white rounded-2xl shadow-lg shadow-accent/20 transition-all active:scale-95 py-4 font-black uppercase tracking-widest text-[10px] mt-4 flex items-center justify-center space-x-2">
            <Plane size={20} className="rotate-45" />
            <span>Search Flights</span>
          </button>
        </div>

        {/* Trending Destinations */}
        <div className="space-y-4 pt-4">
          <div className="flex items-center justify-between px-2">
            <h3 className="font-bold text-lg text-gray-900">Trending Destinations</h3>
            <span className="text-[10px] font-bold text-primary uppercase tracking-widest">{flightType} Specials</span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {(flightType === 'Domestic'
              ? [
                { name: 'Goa', img: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&q=80&w=600' },
                { name: 'Pondicherry', img: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&q=80&w=600' },
                { name: 'Kerala', img: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&q=80&w=600' },
                { name: 'Vizag', img: 'https://www.treebo.com/blog/wp-content/uploads/2018/08/Beaches-In-Vizag.jpg' }
              ] : [
                { name: 'Dubai', img: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=600' },
                { name: 'Singapore', img: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&q=80&w=600' },
                { name: 'London', img: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&q=80&w=600' },
                { name: 'Paris', img: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&q=80&w=600' }
              ]
            ).map(city => (
              <motion.div key={city.name} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                onClick={() => { setTo(city.name); window.scrollTo({ top: 0, behavior: 'smooth' }); toast.success(`Selected ${city.name} as destination`); }}
                className="relative h-40 rounded-[28px] overflow-hidden bg-white border border-gray-100 rounded-[32px] shadow-sm group cursor-pointer">
                <img src={city.img} className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:scale-110 transition-transform duration-700" alt={city.name} />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-deep/70 via-primary-deep/20 to-transparent"></div>
                <div className="absolute bottom-3 left-4 right-4 flex justify-between items-center">
                  <p className="font-bold text-white text-sm">{city.name}</p>
                  <div className="bg-primary p-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
                    <Plane size={12} className="text-white rotate-45" />
                  </div>
                </div>
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity shadow-sm">
                  <span className="text-[8px] font-bold text-primary uppercase tracking-widest">Book Now</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default FlightBookingPage;
