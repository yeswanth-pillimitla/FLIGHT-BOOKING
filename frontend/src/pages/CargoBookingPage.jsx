import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Calendar, Truck, ChevronDown, Package } from 'lucide-react';
import MainLayout from '../components/MainLayout';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const CargoBookingPage = () => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [date, setDate] = useState('');

  const [weight, setWeight] = useState('');
  const [cargoType, setCargoType] = useState('General');
  const [deliverySpeed, setDeliverySpeed] = useState('Standard');
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!from || !to || !date || !weight || !cargoType || !deliverySpeed) {
      return toast.error('Please fill in all fields');
    }

    if (parseFloat(weight) <= 0) {
      return toast.error('Weight must be greater than 0');
    }

    if (new Date(date) < new Date().setHours(0,0,0,0)) {
      return toast.error('Shipment date cannot be in the past');
    }

    try {
      const response = await fetch('http://localhost:5000/api/cargo-booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          origin: from,
          destination: to,
          shipment_date: date,
          weight: parseFloat(weight),
          cargo_type: cargoType,
          delivery_speed: deliverySpeed
        })
      });

      const data = await response.json();

      if (data.success) {
        toast.success('Booking saved successfully');
        // Reset form
        setFrom('');
        setTo('');
        setDate('');
        setWeight('');
        setCargoType('General');
        setDeliverySpeed('Standard');
      } else {
        toast.error(data.message || 'Failed to save booking');
      }
    } catch (error) {
      console.error('Cargo booking error:', error);
      toast.error('Connection error. Please try again.');
    }
  };

  return (
    <MainLayout>
      <div className="space-y-6 pb-10">
        <div className="flex items-center space-x-3 mb-6">
          <div className="bg-accent/10 p-3 rounded-2xl"><Truck className="text-accent" size={24} /></div>
          <div>
            <h1 className="text-2xl font-bold text-dark">Cargo Booking</h1>
            <p className="text-gray-400 text-xs font-medium">Fast and secure freight services</p>
          </div>
        </div>

        <div className="bg-white border border-gray-100 rounded-3xl shadow-sm p-6 space-y-6">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
               <div className="space-y-1">
                 <label className="text-[10px] font-bold text-gray-400 ml-1 uppercase tracking-widest">From</label>
                 <div className="relative">
                   <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary" size={18} />
                   <input type="text" placeholder="Origin" className="w-full bg-surface border border-gray-100 rounded-2xl p-4 text-dark font-bold focus:border-primary transition-colors outline-none pl-12" value={from} onChange={(e) => setFrom(e.target.value)} />
                 </div>
               </div>
               <div className="space-y-1">
                 <label className="text-[10px] font-bold text-gray-400 ml-1 uppercase tracking-widest">To</label>
                 <div className="relative">
                   <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary" size={18} />
                   <input type="text" placeholder="Destination" className="w-full bg-surface border border-gray-100 rounded-2xl p-4 text-dark font-bold focus:border-primary transition-colors outline-none pl-12" value={to} onChange={(e) => setTo(e.target.value)} />
                 </div>
               </div>
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-400 ml-1 uppercase tracking-widest">Date of shipment</label>
              <div className="relative">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary" size={18} />
                <input type="date" className="w-full bg-surface border border-gray-100 rounded-2xl p-4 text-dark font-bold focus:border-primary transition-colors outline-none pl-12" value={date} onChange={(e) => setDate(e.target.value)} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 ml-1 uppercase tracking-widest">Weight (kg)</label>
                <div className="relative">
                  <Package className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary" size={18} />
                  <input type="number" placeholder="0" className="w-full bg-surface border border-gray-100 rounded-2xl p-4 text-dark font-bold focus:border-primary transition-colors outline-none pl-12" value={weight} onChange={(e) => setWeight(e.target.value)} />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 ml-1 uppercase tracking-widest">Cargo Type</label>
                <div className="relative">
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
                  <select className="w-full bg-surface border border-gray-100 rounded-2xl p-4 text-dark font-bold focus:border-primary transition-colors outline-none pl-4 appearance-none" value={cargoType} onChange={(e) => setCargoType(e.target.value)}>
                    <option value="General">General</option>
                    <option value="Fragile">Fragile</option>
                    <option value="Perishable">Perishable</option>
                    <option value="Hazardous">Hazardous</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <button onClick={handleSearch} className="w-full bg-primary hover:bg-primary-deep text-white rounded-2xl shadow-lg shadow-primary/20 transition-all active:scale-95 py-4 uppercase tracking-widest text-xs flex items-center justify-center space-x-2 group py-4 uppercase tracking-widest text-xs">Calculate Shipping</button>
        </div>

        <div className="grid grid-cols-3 gap-3">
           {[{ label: 'Priority', time: '1-2 Days' }, { label: 'Standard', time: '3-5 Days' }, { label: 'Economy', time: '7-10 Days' }].map(opt => (
             <div 
               key={opt.label} 
               onClick={() => setDeliverySpeed(opt.label)}
               className={`p-3 text-center space-y-1 cursor-pointer transition-all border-2 rounded-xl ${deliverySpeed === opt.label ? 'border-secondary bg-surface shadow-md' : 'border-transparent bg-white border border-gray-100 shadow-sm'}`}
             >
                <p className={`text-[10px] font-bold ${deliverySpeed === opt.label ? 'text-primary' : 'text-gray-800'}`}>{opt.label}</p>
                <p className="text-[8px] text-gray-400">{opt.time}</p>
             </div>
           ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default CargoBookingPage;
