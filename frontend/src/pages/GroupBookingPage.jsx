import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Calendar, Users, ChevronDown, Plane } from 'lucide-react';
import MainLayout from '../components/MainLayout';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const GroupBookingPage = () => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [departureDate, setDepartureDate] = useState('');

  const [passengers, setPassengers] = useState(10);
  const [flightClass, setFlightClass] = useState('Economy');
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!from || !to || !departureDate || !passengers || !flightClass) {
      return toast.error('Please fill in all fields');
    }

    if (parseInt(passengers) < 1) {
      return toast.error('People count must be at least 1');
    }

    if (new Date(departureDate) < new Date().setHours(0,0,0,0)) {
      return toast.error('Departure date cannot be in the past');
    }

    try {
      const response = await fetch('http://localhost:5000/api/group-booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from_location: from,
          to_location: to,
          departure_date: departureDate,
          people_count: passengers,
          travel_class: flightClass
        })
      });

      const data = await response.json();

      if (data.success) {
        toast.success('Booking saved successfully');
        // Reset form
        setFrom('');
        setTo('');
        setDepartureDate('');
        setPassengers(10);
        setFlightClass('Economy');
      } else {
        toast.error(data.message || 'Failed to save booking');
      }
    } catch (error) {
      console.error('Group booking error:', error);
      toast.error('Connection error. Please try again.');
    }
  };

  return (
    <MainLayout>
      <div className="space-y-6 pb-10">
        <div className="flex items-center space-x-3 mb-6">
          <div className="bg-gray-100 p-3 rounded-2xl"><Users className="text-primary" size={24} /></div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Group Booking</h1>
            <p className="text-gray-400 text-xs">Special rates for groups of 10 or more</p>
          </div>
        </div>

        <div className="bg-white border border-gray-100 rounded-3xl shadow-sm p-6 space-y-6">
          <div className="space-y-4">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-400 ml-1 uppercase tracking-widest">From</label>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary" size={18} />
                <input type="text" placeholder="Starting Location" className="w-full bg-surface border border-gray-100 rounded-2xl p-4 text-dark font-bold focus:border-primary transition-colors outline-none pl-12" value={from} onChange={(e) => setFrom(e.target.value)} />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-400 ml-1 uppercase tracking-widest">To</label>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary" size={18} />
                <input type="text" placeholder="Destination" className="w-full bg-surface border border-gray-100 rounded-2xl p-4 text-dark font-bold focus:border-primary transition-colors outline-none pl-12" value={to} onChange={(e) => setTo(e.target.value)} />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-400 ml-1 uppercase tracking-widest">Departure Date</label>
              <div className="relative">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary" size={18} />
                <input type="date" className="w-full bg-surface border border-gray-100 rounded-2xl p-4 text-dark font-bold focus:border-primary transition-colors outline-none pl-12" value={departureDate} onChange={(e) => setDepartureDate(e.target.value)} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 ml-1 uppercase tracking-widest">People</label>
                <div className="relative">
                  <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary" size={18} />
                  <input type="number" min="10" className="w-full bg-surface border border-gray-100 rounded-2xl p-4 text-dark font-bold focus:border-primary transition-colors outline-none pl-12" value={passengers} onChange={(e) => setPassengers(e.target.value)} />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 ml-1 uppercase tracking-widest">Class</label>
                <div className="relative">
                  <Plane className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary" size={18} />
                  <select className="w-full bg-surface border border-gray-100 rounded-2xl p-4 text-dark font-bold focus:border-primary transition-colors outline-none pl-12 appearance-none" value={flightClass} onChange={(e) => setFlightClass(e.target.value)}>
                    <option value="Economy">Economy</option>
                    <option value="Business">Business</option>
                    <option value="First">First</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
                </div>
              </div>
            </div>
          </div>
          <button onClick={handleSearch} className="w-full bg-primary hover:bg-primary-deep text-white rounded-2xl shadow-lg shadow-primary/20 transition-all active:scale-95 py-4 uppercase tracking-widest text-xs flex items-center justify-center space-x-2 group py-4 uppercase tracking-widest text-xs">Get Group Quote</button>
        </div>

        <div className="bg-white border border-gray-100 rounded-3xl shadow-sm p-4 bg-blue-50 border-gray-200">
           <h4 className="font-bold text-sm text-primary mb-2">Why Group Booking?</h4>
           <ul className="text-[10px] text-gray-500 space-y-2">
              {['Flexible payment options', 'Dedicated group coordinator', 'Customized meal preferences'].map(item => (
                <li key={item} className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-secondary"></div>
                  <span>{item}</span>
                </li>
              ))}
           </ul>
        </div>
      </div>
    </MainLayout>
  );
};

export default GroupBookingPage;
