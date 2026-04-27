import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Plane, MapPin, Calendar, Clock, User, CreditCard, CheckCircle2, ChevronRight, ChevronDown, Armchair, ArrowLeft, Wallet, Smartphone, Landmark, Globe, Shield, Briefcase, HeartPulse, GraduationCap, Luggage, ArrowRightLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import MainLayout from '../components/MainLayout';
import toast from 'react-hot-toast';

// --- Sub-components ---

const BookingSummary = ({ flight, searchParams, nextStep }) => (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-6">
    <div className="bg-white p-6 border border-gray-100 rounded-2xl shadow-sm">
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-surface rounded-2xl flex items-center justify-center border border-gray-100 shadow-sm">
            <img src={flight.logo} className="w-10 h-10 object-contain" alt={flight.airline} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{flight.airline}</h2>
            <p className="text-xs text-secondary font-bold uppercase tracking-widest">{flight.flightNumber}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-3xl font-black text-primary">${flight.price}</p>
          <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest mt-1">Total Fare</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 items-center bg-surface p-6 rounded-[32px] border border-gray-100 relative overflow-hidden shadow-inner">
        <div className="absolute top-0 left-0 w-1.5 h-full bg-primary"></div>
        <div className="text-left">
          <p className="text-3xl font-black text-gray-900">{flight.departureTime}</p>
          <p className="text-sm font-bold text-gray-500">{flight.source}</p>
          <p className="text-[10px] text-gray-400 uppercase mt-1 font-bold">Departure</p>
        </div>
        <div className="flex flex-col items-center px-4">
          <div className="w-full h-[2px] bg-gray-100 relative">
            <Plane size={16} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-secondary rotate-45" />
          </div>
          <p className="text-[10px] text-secondary mt-3 font-bold uppercase tracking-widest flex items-center">
            <Clock size={10} className="mr-1" /> {flight.duration || '2h 30m'}
          </p>
        </div>
        <div className="text-right">
          <p className="text-3xl font-black text-gray-900">{flight.arrivalTime}</p>
          <p className="text-sm font-bold text-gray-500">{flight.destination}</p>
          <p className="text-[10px] text-gray-400 uppercase mt-1 font-bold">Arrival</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-6">
        <div className="bg-white p-4 rounded-2xl border border-surface shadow-sm">
          <p className="text-[10px] text-gray-400 uppercase font-bold mb-1 tracking-widest">Class</p>
          <p className="text-sm font-bold text-gray-800">{searchParams?.flightClass || 'Economy'}</p>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-surface shadow-sm">
          <p className="text-[10px] text-gray-400 uppercase font-bold mb-1 tracking-widest">Trip Type</p>
          <p className="text-sm font-bold text-gray-800">{searchParams?.tripType || 'One-way'}</p>
        </div>
      </div>

      {searchParams?.tripType === 'Round-trip' && (
        <div className="mt-4 p-4 bg-surface rounded-2xl border border-gray-100 flex items-center justify-between shadow-sm">
           <div className="flex items-center space-x-3">
              <ArrowRightLeft className="text-secondary" size={18} />
              <p className="text-xs font-bold text-gray-700">Return Flight: {flight.destination} → {flight.source}</p>
           </div>
           <p className="text-[10px] font-black text-secondary uppercase tracking-widest">Included</p>
        </div>
      )}
    </div>

    <button 
      onClick={nextStep}
      className="w-full bg-primary hover:bg-primary-deep text-white py-5 rounded-2xl flex items-center justify-center space-x-2 group shadow-xl shadow-primary/10"
    >
      <span className="font-black uppercase tracking-widest text-sm">Proceed to Details</span>
      <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
    </button>
  </motion.div>
);

const PassengerDetails = ({ formData, setFormData, prevStep, nextStep, isInternational, tripType, flight }) => {
  const isRoundTrip = tripType === 'Round-trip';

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.mobile || !formData.email) {
      return toast.error('Please fill all basic fields');
    }
    if (!isInternational && !formData.idNumber) {
      return toast.error('Govt ID Number is required');
    }
    if (isInternational && (!formData.passportNumber || !formData.passportExpiry || !formData.nationality)) {
      return toast.error('Passport details are mandatory for International flights');
    }
    nextStep();
  };

  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6 pb-20">
      <div className="flex items-center space-x-2 text-gray-400 mb-2">
        <button onClick={prevStep} className="hover:text-secondary transition-colors"><ArrowLeft size={20} /></button>
        <span className="text-xs font-bold uppercase tracking-widest">Back to Summary</span>
      </div>

      <div className="bg-white p-6 border border-gray-100 rounded-3xl shadow-xl">
        <h3 className="text-xl font-bold mb-6 flex items-center text-dark uppercase tracking-tight">
          <User className="mr-2 text-primary" size={20} /> Passenger Information
        </h3>
        
        <form className="space-y-8">
          {/* Section 1: Basic Information */}
          <div className="space-y-4">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Basic Details</p>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Full Name (As per Govt ID)</label>
              <input 
                type="text" 
                placeholder="Enter Full Name"
                className="w-full glass-input"
                value={formData.fullName}
                onChange={(e) => setFormData({...formData, fullName: e.target.value})}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Date of Birth</label>
                <input 
                  type="date" 
                  className="w-full glass-input"
                  value={formData.dob}
                  onChange={(e) => setFormData({...formData, dob: e.target.value})}
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Gender</label>
                <div className="relative">
                  <select 
                    className="w-full glass-input appearance-none"
                    value={formData.gender}
                    onChange={(e) => setFormData({...formData, gender: e.target.value})}
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Mobile Number</label>
                <input 
                  type="tel" 
                  placeholder="Contact Number"
                  className="w-full glass-input"
                  value={formData.mobile}
                  onChange={(e) => setFormData({...formData, mobile: e.target.value})}
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Email Address</label>
                <input 
                  type="email" 
                  placeholder="Email ID"
                  className="w-full glass-input"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
            </div>
          </div>

          {/* Section 2: Journey Context (Conditional) */}
          <div className="space-y-4 pt-4 border-t border-gray-100">
             <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Departure Details</p>
             <div className="grid grid-cols-2 gap-4">
                <div className="bg-surface p-4 rounded-2xl border border-gray-100 shadow-sm">
                   <p className="text-[8px] text-gray-400 uppercase font-bold tracking-widest">From</p>
                   <p className="text-sm font-bold text-dark">{flight.source}</p>
                </div>
                <div className="bg-surface p-4 rounded-2xl border border-gray-100 shadow-sm">
                   <p className="text-[8px] text-gray-400 uppercase font-bold tracking-widest">To</p>
                   <p className="text-sm font-bold text-dark">{flight.destination}</p>
                </div>
             </div>
          </div>

          {isRoundTrip && (
            <div className="space-y-4 pt-4 border-t border-gray-100 animate-in fade-in slide-in-from-top-4">
               <p className="text-[10px] font-black text-secondary uppercase tracking-[0.2em]">Return Journey Details</p>
               <div className="grid grid-cols-2 gap-4">
                  <div className="bg-surface p-4 rounded-2xl border border-secondary/20">
                     <p className="text-[8px] text-secondary uppercase font-bold tracking-widest">From</p>
                     <p className="text-sm font-bold text-dark">{flight.destination}</p>
                  </div>
                  <div className="bg-surface p-4 rounded-2xl border border-secondary/20">
                     <p className="text-[8px] text-secondary uppercase font-bold tracking-widest">To</p>
                     <p className="text-sm font-bold text-dark">{flight.source}</p>
                  </div>
               </div>
               <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Return Date</label>
                  <input type="date" className="w-full glass-input" defaultValue="2026-05-10" />
               </div>
            </div>
          )}

          {/* Section 3: Identity / Travel Documents */}
          {!isInternational ? (
            <div className="space-y-4 pt-4 border-t border-gray-100">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Domestic Identity</p>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">ID Type</label>
                  <div className="relative">
                    <select 
                      className="w-full glass-input appearance-none"
                      value={formData.idType}
                      onChange={(e) => setFormData({...formData, idType: e.target.value})}
                    >
                      <option value="Aadhaar">Aadhaar Card</option>
                      <option value="PAN">PAN Card</option>
                      <option value="Voter ID">Voter ID</option>
                      <option value="Driving License">Driving License</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">ID Number</label>
                  <input 
                    type="text" 
                    placeholder="Enter ID Details"
                    className="w-full glass-input"
                    value={formData.idNumber}
                    onChange={(e) => setFormData({...formData, idNumber: e.target.value})}
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6 pt-4 border-t border-gray-100">
              <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">International Documents (Mandatory)</p>
              
              <div className="grid grid-cols-2 gap-4">
                 <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Passport Number</label>
                    <input 
                      type="text" 
                      placeholder="Passport No."
                      className="w-full glass-input"
                      value={formData.passportNumber}
                      onChange={(e) => setFormData({...formData, passportNumber: e.target.value})}
                    />
                 </div>
                 <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Passport Expiry</label>
                    <input 
                      type="date" 
                      className="w-full glass-input"
                      value={formData.passportExpiry}
                      onChange={(e) => setFormData({...formData, passportExpiry: e.target.value})}
                    />
                 </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                 <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Nationality</label>
                    <input 
                      type="text" 
                      placeholder="Your Nationality"
                      className="w-full glass-input"
                      value={formData.nationality}
                      onChange={(e) => setFormData({...formData, nationality: e.target.value})}
                    />
                 </div>
                 <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Passport Issuing Country</label>
                    <input 
                      type="text" 
                      placeholder="Issuing Country"
                      className="w-full glass-input"
                      value={formData.passportIssuingCountry}
                      onChange={(e) => setFormData({...formData, passportIssuingCountry: e.target.value})}
                    />
                 </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                 <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Visa Type</label>
                    <div className="relative">
                      <select 
                        className="w-full glass-input appearance-none"
                        value={formData.visaType}
                        onChange={(e) => setFormData({...formData, visaType: e.target.value})}
                      >
                        <option value="Tourist">Tourist Visa</option>
                        <option value="Business">Business Visa</option>
                        <option value="Student">Student Visa</option>
                        <option value="Medical">Medical Visa</option>
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
                    </div>
                 </div>
                 <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Visa Expiry</label>
                    <input 
                      type="date" 
                      className="w-full glass-input"
                      value={formData.visaExpiry}
                      onChange={(e) => setFormData({...formData, visaExpiry: e.target.value})}
                    />
                 </div>
              </div>
            </div>
          )}

          {/* Section 4: Preferences & Extras */}
          <div className="space-y-4 pt-4 border-t border-surface">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Travel Preferences</p>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Baggage Preference</label>
                <div className="relative">
                  <select 
                    className="w-full glass-input appearance-none"
                    value={formData.baggagePreference}
                    onChange={(e) => setFormData({...formData, baggagePreference: e.target.value})}
                  >
                    <option value="Standard (23kg)">Standard (23kg)</option>
                    <option value="Extra (32kg)">Extra (32kg)</option>
                    <option value="Cabin Only (7kg)">Cabin Only (7kg)</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Meal Preference</label>
                <div className="relative">
                  <select 
                    className="w-full glass-input appearance-none"
                    value={formData.mealPreference}
                    onChange={(e) => setFormData({...formData, mealPreference: e.target.value})}
                  >
                    <option value="Standard">Standard</option>
                    <option value="Vegetarian">Pure Veg</option>
                    <option value="None">No Meal</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
                </div>
              </div>
            </div>

            <button 
              type="button"
              onClick={() => setFormData({...formData, travelInsurance: !formData.travelInsurance})}
              className={`w-full p-4 rounded-2xl border transition-all flex items-center justify-between shadow-sm ${formData.travelInsurance ? 'bg-secondary/10 border-secondary' : 'bg-white border-gray-100 hover:bg-gray-50'}`}
            >
              <div className="flex items-center space-x-3">
                 <Shield size={20} className={formData.travelInsurance ? 'text-secondary' : 'text-gray-300'} />
                 <div className="text-left">
                    <p className="text-sm font-bold text-dark">Add Travel Insurance</p>
                    <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Global Coverage Included</p>
                 </div>
              </div>
              <div className={`w-5 h-5 rounded flex items-center justify-center border transition-colors ${formData.travelInsurance ? 'bg-secondary border-secondary' : 'border-gray-200 bg-white'}`}>
                 {formData.travelInsurance && <CheckCircle2 size={12} className="text-white" />}
              </div>
            </button>
          </div>
        </form>
      </div>

      <button 
        onClick={handleSubmit}
        className="w-full bg-primary hover:bg-primary-deep text-white py-5 rounded-2xl flex items-center justify-center space-x-2 group shadow-xl shadow-primary/10"
      >
        <span className="font-black uppercase tracking-widest text-sm">Select Seat</span>
        <Armchair size={20} className="group-hover:scale-110 transition-transform" />
      </button>
    </motion.div>
  );
};

const SeatSelection = ({ selectedSeat, setSelectedSeat, prevStep, nextStep, bookedSeats = [] }) => {
  const rows = ['A', 'B', 'C', 'D', 'E', 'F'];
  
  const handleSeatClick = (seat) => {
    if (bookedSeats.includes(seat)) {
      toast.error('Seat already selected. Please choose another seat.');
      return;
    }
    setSelectedSeat(seat);
    toast.success(`Seat ${seat} selected`);
  };

  return (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="space-y-6">
      <div className="flex items-center space-x-2 text-gray-400 mb-2">
        <button onClick={prevStep} className="hover:text-secondary transition-colors"><ArrowLeft size={20} /></button>
        <span className="text-xs font-bold uppercase tracking-widest">Back to Details</span>
      </div>

      <div className="bg-white p-8 border border-gray-100 rounded-[40px] shadow-xl text-center">
        <h3 className="text-2xl font-black mb-2 text-dark uppercase tracking-tight">Choose Your Seat</h3>
        <p className="text-[10px] text-gray-400 uppercase tracking-widest font-black mb-8">Boeing 747-800 Layout</p>

        <div className="max-w-md mx-auto space-y-8 bg-surface p-8 rounded-[60px] border border-gray-100 relative shadow-inner">
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-40 h-20 bg-white rounded-t-full border-t border-x border-gray-100 flex items-center justify-center shadow-sm">
             <div className="w-12 h-1 bg-gray-200 rounded-full"></div>
          </div>

          <div className="space-y-6">
            <div>
              <p className="text-[8px] font-black text-primary uppercase tracking-[0.2em] mb-4 mt-2">First Class</p>
              <div className="grid grid-cols-4 gap-4 justify-center px-4">
                {['1A', '1B', '1C', '1D', '2A', '2B', '2C', '2D'].map(s => (
                    <button 
                      key={s} 
                      onClick={() => handleSeatClick(s)}
                      disabled={bookedSeats.includes(s)}
                      className={`aspect-square rounded-xl border flex items-center justify-center transition-all shadow-sm ${bookedSeats.includes(s) ? 'bg-gray-200 border-gray-200 text-gray-400 cursor-not-allowed opacity-60' : selectedSeat === s ? 'bg-primary border-primary text-white shadow-primary/20 scale-110' : 'bg-white border-gray-100 hover:bg-gray-50 text-dark'}`}
                    >
                      <span className="text-[10px] font-bold">{s}</span>
                    </button>
                ))}
              </div>
            </div>

            <div className="w-full h-[1px] bg-gray-100"></div>

            <div>
              <p className="text-[8px] font-black text-secondary uppercase tracking-[0.2em] mb-4">Business Class</p>
              <div className="grid grid-cols-6 gap-2 justify-center">
                 {['3A', '3B', '3C', '3D', '3E', '3F', '4A', '4B', '4C', '4D', '4E', '4F'].map(s => (
                    <button 
                      key={s} 
                      onClick={() => handleSeatClick(s)}
                      disabled={bookedSeats.includes(s)}
                      className={`aspect-square rounded-lg border flex items-center justify-center transition-all shadow-sm ${bookedSeats.includes(s) ? 'bg-gray-200 border-gray-200 text-gray-400 cursor-not-allowed opacity-60' : selectedSeat === s ? 'bg-secondary border-secondary text-white scale-110' : 'bg-white border-gray-100 hover:bg-gray-50 text-gray-600'}`}
                    >
                      <span className="text-[10px] font-bold">{s}</span>
                    </button>
                ))}
              </div>
            </div>

            <div className="w-full h-[1px] bg-gray-100"></div>

            <div>
              <p className="text-[8px] font-black text-gray-300 uppercase tracking-[0.2em] mb-4">Economy Class</p>
              <div className="grid grid-cols-6 gap-2 justify-center">
                 {Array.from({length: 24}, (_, i) => {
                   const s = `${Math.floor(i/6) + 5}${rows[i%6]}`;
                   return (
                      <button 
                        key={s} 
                        onClick={() => handleSeatClick(s)}
                        disabled={bookedSeats.includes(s)}
                        className={`aspect-square rounded-md border flex items-center justify-center transition-all shadow-sm ${bookedSeats.includes(s) ? 'bg-gray-200 border-gray-200 text-gray-400 cursor-not-allowed opacity-60' : selectedSeat === s ? 'bg-primary border-primary text-white scale-110' : 'bg-white border-gray-100 hover:bg-gray-50 text-gray-400'}`}
                      >
                        <span className="text-[8px] font-bold">{s}</span>
                      </button>
                   );
                 })}
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center space-x-6 mt-8">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-white border border-gray-200 rounded-sm"></div>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Available</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-primary rounded-sm"></div>
            <span className="text-[10px] font-bold text-primary uppercase tracking-widest">Selected</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-gray-200 rounded-sm"></div>
            <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">Booked</span>
          </div>
        </div>
      </div>

      <button 
        onClick={() => selectedSeat ? nextStep() : toast.error('Please select a seat')}
        className="w-full bg-primary hover:bg-primary-deep text-white py-5 rounded-2xl flex items-center justify-center space-x-2 group shadow-xl shadow-primary/10"
      >
        <span className="font-black uppercase tracking-widest text-sm">Review & Pay</span>
        <CreditCard size={20} className="group-hover:rotate-12 transition-transform" />
      </button>
    </motion.div>
  );
};

const PaymentSelection = ({ formData, flight, selectedSeat, searchParams, prevStep, onComplete }) => {
  const [method, setMethod] = useState('UPI');

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-6 pb-20">
      <div className="flex items-center space-x-2 text-gray-400 mb-2">
        <button onClick={prevStep} className="hover:text-secondary transition-colors"><ArrowLeft size={20} /></button>
        <span className="text-xs font-bold uppercase tracking-widest">Back to Review</span>
      </div>

      <div className="bg-white p-8 border border-gray-100 rounded-[40px] shadow-2xl">
        <div className="flex items-center justify-between mb-8">
           <div>
              <h3 className="text-2xl font-black text-dark uppercase tracking-tight">Booking Summary</h3>
              <p className="text-xs text-gray-400 uppercase tracking-widest font-bold mt-1">Review before final payment</p>
           </div>
           <div className="text-right">
              <p className="text-[10px] text-gray-400 uppercase font-black tracking-widest">Total Price</p>
              <p className="text-2xl font-black text-primary">${flight.price}</p>
           </div>
        </div>

        <div className="space-y-6">
           <div className="grid grid-cols-2 gap-6">
              <div>
                 <p className="text-[10px] text-gray-400 uppercase font-bold mb-1 tracking-widest">Passenger</p>
                 <p className="font-bold text-gray-800">{formData.fullName}</p>
                 <p className="text-xs text-gray-500 font-medium">{formData.email}</p>
              </div>
              <div className="text-right">
                 <p className="text-[10px] text-gray-400 uppercase font-bold mb-1 tracking-widest">Seat & Class</p>
                 <p className="font-bold text-gray-800">{selectedSeat} • {searchParams?.flightClass || 'Economy'}</p>
              </div>
           </div>

           <div className="w-full h-[1px] bg-gray-100"></div>

           <div className="flex justify-between items-center">
              <div className="flex items-center space-x-3">
                 <div className="bg-surface p-2 rounded-lg border border-gray-100">
                    <Plane className="text-secondary" size={16} />
                 </div>
                 <div>
                    <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">Flight</p>
                    <p className="text-sm font-bold text-gray-800">{flight.airline} {flight.flightNumber}</p>
                 </div>
              </div>
              <div className="text-right">
                 <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">Route</p>
                 <p className="text-sm font-bold text-gray-800">{flight.source} → {flight.destination}</p>
              </div>
           </div>

           <div className="pt-6 border-t border-gray-100 space-y-4">
              <p className="text-[10px] text-gray-400 uppercase font-black tracking-widest">Select Payment Method</p>
              <div className="grid grid-cols-2 gap-3">
                 {['UPI', 'Card', 'NetBanking', 'Wallet'].map(m => (
                    <button 
                       key={m}
                       onClick={() => setMethod(m)}
                       className={`p-4 rounded-xl border text-xs font-black uppercase tracking-widest transition-all shadow-sm ${method === m ? 'bg-secondary border-primary text-white shadow-gray-200 scale-105' : 'bg-white border-gray-100 text-gray-500 hover:bg-surface hover:text-secondary'}`}
                    >
                       {m}
                    </button>
                 ))}
              </div>
           </div>
        </div>

        <button 
          onClick={() => onComplete(method)}
          className="w-full bg-accent hover:bg-orange-600 text-white py-5 mt-8 rounded-2xl flex items-center justify-center space-x-3 group shadow-xl shadow-accent/20"
        >
          <CreditCard size={20} />
          <span className="font-black uppercase tracking-widest text-sm">Proceed to Payment</span>
        </button>
      </div>
    </motion.div>
  );
};

const SuccessScreen = ({ onDashboard }) => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.9 }} 
    animate={{ opacity: 1, scale: 1 }} 
    className="flex flex-col items-center justify-center py-20 text-center space-y-6"
  >
    <div className="relative">
      <div className="absolute inset-0 bg-primary blur-3xl opacity-20 animate-pulse"></div>
      <div className="w-32 h-32 bg-surface rounded-full flex items-center justify-center relative border-4 border-gray-100 shadow-xl">
        <CheckCircle2 className="text-primary" size={64} />
      </div>
    </div>
    <div>
      <h2 className="text-4xl font-black mb-2 text-dark uppercase tracking-tight">Booking Confirmed!</h2>
      <p className="text-secondary uppercase tracking-[0.3em] font-black text-xs">Safe Travels</p>
    </div>
    <div className="flex flex-col w-full space-y-3 pt-6 max-w-xs">
      <button 
        onClick={() => onDashboard('/bookings')}
        className="bg-primary hover:bg-primary-deep text-white py-4 px-10 rounded-2xl font-black uppercase tracking-widest text-xs shadow-lg shadow-primary/20"
      >
        View My Bookings
      </button>
      <button 
        onClick={() => onDashboard('/user-dashboard')}
        className="text-xs font-black text-gray-400 hover:text-primary transition-colors uppercase tracking-widest pt-2"
      >
        Go Home
      </button>
    </div>
  </motion.div>
);

// --- Main Component ---

const FlightBookingFlow = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { flight, searchParams } = location.state || {};
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    fullName: '', dob: '', gender: 'Male', mobile: '', email: '', idType: 'Aadhaar', idNumber: '', mealPreference: 'Standard',
    passportNumber: '', passportExpiry: '', passportIssuingCountry: '', visaNumber: '', visaType: 'Tourist', visaExpiry: '', nationality: '', residenceCountry: '', emergencyContact: '',
    baggagePreference: 'Standard (23kg)', travelInsurance: false
  });

  const [selectedSeat, setSelectedSeat] = useState(null);
  const [bookingCount, setBookingCount] = useState(0);
  const [bookedSeats, setBookedSeats] = useState([]);

  React.useEffect(() => {
    const fetchBookingData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;
        
        // Fetch user bookings count
        const bookingsRes = await fetch('http://localhost:5000/api/bookings/my-bookings', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const bookingsData = await bookingsRes.json();
        if (bookingsData.success) {
          setBookingCount(bookingsData.bookings ? bookingsData.bookings.length : (bookingsData.data ? bookingsData.data.length : 0));
        }

        // Fetch booked seats for this flight
        if (flight && flight.id) {
          const seatsRes = await fetch(`http://localhost:5000/api/bookings/flight/${flight.id}/seats`, {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          const seatsData = await seatsRes.json();
          if (seatsData.success) {
            setBookedSeats(seatsData.data);
          }
        }
      } catch (error) {
        console.error('Failed to fetch booking data', error);
      }
    };
    fetchBookingData();
  }, [flight]);

  if (!flight) return <MainLayout><div className="flex flex-col items-center justify-center py-20"><Plane className="text-surface mb-4 animate-bounce" size={64} /> <h2 className="text-2xl font-bold text-gray-300 uppercase tracking-widest">No flight selected</h2></div></MainLayout>;

  const discountRate = bookingCount === 0 ? 0.5 : 0.1;
  const finalPrice = Math.round(flight.price * (1 - discountRate));

  const handleFinalBooking = async (paymentMethod) => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/bookings/book-flight', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ flightId: flight.id, passengerDetails: formData, seatNumber: selectedSeat, totalAmount: finalPrice, paymentMethod })
      });
      const result = await response.json();
      if (result.success) {
        setStep(5);
      } else {
        toast.error(result.message || 'Booking failed');
        if (result.message && result.message.includes('already selected')) {
          setStep(3); // Go back to seat selection
          // Re-fetch booked seats
          const token = localStorage.getItem('token');
          const seatsRes = await fetch(`http://localhost:5000/api/bookings/flight/${flight.id}/seats`, {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          const seatsData = await seatsRes.json();
          if (seatsData.success) {
            setBookedSeats(seatsData.data);
            setSelectedSeat(null);
          }
        }
      }
    } catch (error) { toast.error('Network error'); }
    finally { setLoading(false); }
  };

  const steps = ['Review', 'Details', 'Seat', 'Payment'];

  return (
    <MainLayout>
      <div className="max-w-2xl mx-auto pt-6">
        {step < 5 && (
          <div className="flex items-center justify-between mb-10 px-4">
             {steps.map((label, idx) => (
               <React.Fragment key={label}>
                  <div className="flex flex-col items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-xs transition-all shadow-sm ${step >= idx + 1 ? 'bg-primary text-white' : 'bg-white text-gray-300 border border-gray-100'}`}>
                      {step > idx + 1 ? <CheckCircle2 size={16} /> : idx + 1}
                    </div>
                    <span className={`text-[8px] font-black uppercase tracking-widest mt-2 ${step === idx + 1 ? 'text-primary' : 'text-gray-300'}`}>{label}</span>
                  </div>
                  {idx < 3 && <div className={`flex-1 h-[2px] mx-4 -mt-4 transition-all shadow-inner ${step > idx + 1 ? 'bg-primary' : 'bg-gray-100'}`}></div>}
               </React.Fragment>
             ))}
          </div>
        )}

        {loading && <div className="fixed inset-0 bg-dark/20 backdrop-blur-md z-50 flex flex-col items-center justify-center space-y-4"><div className="w-16 h-16 border-4 border-gray-100 border-t-primary rounded-full animate-spin"></div><p className="text-xs font-black text-primary uppercase tracking-widest animate-pulse">Finalizing your journey...</p></div>}

        <AnimatePresence mode="wait">
           {step === 1 && <BookingSummary key="s1" flight={{...flight, price: finalPrice}} searchParams={searchParams} nextStep={() => setStep(2)} />}
           {step === 2 && <PassengerDetails key="s2" formData={formData} setFormData={setFormData} prevStep={() => setStep(1)} nextStep={() => setStep(3)} isInternational={flight.category === 'International' || flight.type === 'International' || searchParams?.type === 'International'} tripType={searchParams?.tripType} flight={flight} />}
           {step === 3 && <SeatSelection key="s3" selectedSeat={selectedSeat} setSelectedSeat={setSelectedSeat} prevStep={() => setStep(2)} nextStep={() => setStep(4)} bookedSeats={bookedSeats} />}
           {step === 4 && <PaymentSelection key="s4" formData={formData} flight={{...flight, price: finalPrice}} selectedSeat={selectedSeat} searchParams={searchParams} prevStep={() => setStep(3)} onComplete={handleFinalBooking} />}
           {step === 5 && <SuccessScreen key="s5" onDashboard={(p) => navigate(p)} />}
        </AnimatePresence>
      </div>
    </MainLayout>
  );
};

export default FlightBookingFlow;
