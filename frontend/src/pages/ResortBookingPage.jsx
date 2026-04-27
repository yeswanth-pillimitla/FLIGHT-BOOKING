import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Calendar, Users, ChevronDown, Palmtree, Sun, Waves } from 'lucide-react';
import MainLayout from '../components/MainLayout';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const ResortBookingPage = () => {
  const [stayType, setStayType] = useState('Multiple Days');
  const [resortName, setResortName] = useState('');
  const [dateRange, setDateRange] = useState('');
  const [rooms, setRooms] = useState(1);
  const [guests, setGuests] = useState(2);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (!resortName || !dateRange) return toast.error('Please fill in all fields');
    toast.success('Finding best resort packages...');
  };

  return (
    <MainLayout>
      <div className="space-y-6 pb-10">
        <div className="flex items-center space-x-3 mb-6">
          <div className="bg-gray-100 p-3 rounded-2xl"><Palmtree className="text-secondary" size={24} /></div>
          <div>
            <h1 className="text-2xl font-black text-dark uppercase tracking-tight">Resort Booking</h1>
            <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest">Escape to paradise and relax</p>
          </div>
        </div>

        <div className="flex bg-surface p-1 rounded-2xl border border-gray-100">
          {['1 Day', 'Multiple Days'].map((t) => (
            <button key={t} onClick={() => setStayType(t)}
              className={`flex-1 py-3 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all flex items-center justify-center space-x-2 ${stayType === t ? 'bg-primary text-white shadow-xl shadow-primary/20' : 'text-gray-400 hover:text-dark'}`}>
              {t === '1 Day' ? <Sun size={14} /> : <Waves size={14} />}
              <span>{t}</span>
            </button>
          ))}
        </div>

        <div className="bg-white border border-gray-100 rounded-3xl shadow-sm p-6 space-y-6">
          <div className="space-y-4">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-400 ml-1 uppercase tracking-widest">Resort / Location</label>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary" size={18} />
                <input type="text" placeholder="Enter resort or city" className="w-full bg-surface border border-gray-100 rounded-2xl p-4 text-dark font-bold focus:border-primary transition-colors outline-none pl-12" value={resortName} onChange={(e) => setResortName(e.target.value)} />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-400 ml-1 uppercase tracking-widest">Date Range</label>
              <div className="relative">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary" size={18} />
                <input type="text" placeholder="Select dates" className="w-full bg-surface border border-gray-100 rounded-2xl p-4 text-dark font-bold focus:border-primary transition-colors outline-none pl-12" value={dateRange} onChange={(e) => setDateRange(e.target.value)} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 ml-1 uppercase tracking-widest">Rooms</label>
                <div className="relative">
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
                  <select className="w-full bg-surface border border-gray-100 rounded-2xl p-4 text-dark font-bold focus:border-primary transition-colors outline-none pl-4 appearance-none" value={rooms} onChange={(e) => setRooms(e.target.value)}>
                    {[1,2,3,4,5].map(num => <option key={num} value={num}>{num} {num === 1 ? 'Room' : 'Rooms'}</option>)}
                  </select>
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 ml-1 uppercase tracking-widest">Guests</label>
                <div className="relative">
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
                  <select className="w-full bg-surface border border-gray-100 rounded-2xl p-4 text-dark font-bold focus:border-primary transition-colors outline-none pl-4 appearance-none" value={guests} onChange={(e) => setGuests(e.target.value)}>
                    {[1,2,3,4,5,6,7,8].map(num => <option key={num} value={num}>{num} {num === 1 ? 'Guest' : 'Guests'}</option>)}
                  </select>
                </div>
              </div>
            </div>
          </div>
          <button onClick={handleSearch} className="w-full bg-primary hover:bg-primary-deep text-white rounded-2xl shadow-lg shadow-primary/20 transition-all active:scale-95 py-4 uppercase tracking-widest text-[10px] font-black flex items-center justify-center space-x-2 group">Explore Resorts</button>
        </div>

        <div className="space-y-4 pt-4">
           <h3 className="font-bold text-lg px-2 text-gray-900">Featured Resorts</h3>
           <div className="grid grid-cols-1 gap-4">
              {[
                { name: 'Island Paradise Resort', location: 'Bali', img: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&q=80&w=600' },
                { name: 'Mountain Retreat', location: 'Switzerland', img: 'https://images.unsplash.com/photo-1502784444187-359ac186c5bb?auto=format&fit=crop&q=80&w=600' }
              ].map(resort => (
                <div key={resort.name} className="relative h-48 rounded-3xl overflow-hidden bg-white border border-gray-100 rounded-3xl shadow-sm group cursor-pointer">
                   <img src={resort.img} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80" alt={resort.name} />
                   <div className="absolute inset-0 bg-gradient-to-t from-primary-deep/80 to-transparent"></div>
                   <div className="absolute bottom-4 left-4">
                      <p className="font-bold text-white text-xl">{resort.name}</p>
                      <p className="text-xs text-white/70">{resort.location}</p>
                   </div>
                </div>
              ))}
           </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ResortBookingPage;
