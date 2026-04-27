import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Compass, ArrowLeft, CheckCircle2 } from 'lucide-react';
import MainLayout from '../components/MainLayout';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const ExperienceBookingFormPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const category = location.state?.category || 'Special Experience';

  const [formData, setFormData] = useState({
    name: '',
    date: '',
    people: 1,
    budget: '',
    targetLocation: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success(`Booking request for ${category} submitted! Our team will contact you shortly.`);
    setTimeout(() => navigate('/experience-booking'), 2000);
  };

  return (
    <MainLayout>
      <div className="max-w-2xl mx-auto space-y-8 pb-20">
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center text-secondary font-black text-[10px] uppercase tracking-widest hover:translate-x-[-4px] transition-transform"
        >
          <ArrowLeft size={16} className="mr-2" /> Back to Experiences
        </button>

        <div className="bg-white rounded-[40px] shadow-2xl shadow-gray-100 overflow-hidden border border-gray-100">
          <div className="bg-primary p-10 text-white relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-bl-full"></div>
            <h1 className="text-4xl font-black uppercase tracking-tighter italic leading-none">
              Book Your <span className="text-accent">{category}</span>
            </h1>
            <p className="text-white/70 text-[11px] font-bold uppercase tracking-[0.2em] mt-3 flex items-center">
              <CheckCircle2 size={14} className="mr-2 text-accent" /> Personalized Travel Planning
            </p>
          </div>

          <form onSubmit={handleSubmit} className="p-10 space-y-8">
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Full Name</label>
                <input 
                  required 
                  type="text" 
                  className="w-full bg-surface border border-gray-100 rounded-2xl p-4 text-dark font-bold focus:border-primary transition-colors outline-none p-4 text-sm" 
                  placeholder="Enter your full name" 
                  value={formData.name} 
                  onChange={e => setFormData({...formData, name: e.target.value})} 
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Preferred Date</label>
                  <input 
                    required 
                    type="date" 
                    className="w-full bg-surface border border-gray-100 rounded-2xl p-4 text-dark font-bold focus:border-primary transition-colors outline-none p-4 text-sm" 
                    value={formData.date} 
                    onChange={e => setFormData({...formData, date: e.target.value})} 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Number of People</label>
                  <div className="relative">
                    <select 
                      className="w-full bg-surface border border-gray-100 rounded-2xl p-4 text-dark font-bold focus:border-primary transition-colors outline-none p-4 text-sm appearance-none" 
                      value={formData.people} 
                      onChange={e => setFormData({...formData, people: e.target.value})}
                    >
                      {[1,2,3,4,5,6,7,8,10,12].map(n => <option key={n} value={n}>{n} People</option>)}
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                      ▼
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Budget Range (INR)</label>
                  <input 
                    required 
                    type="number" 
                    className="w-full bg-surface border border-gray-100 rounded-2xl p-4 text-dark font-bold focus:border-primary transition-colors outline-none p-4 text-sm" 
                    placeholder="e.g. 15000" 
                    value={formData.budget} 
                    onChange={e => setFormData({...formData, budget: e.target.value})} 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Specific Location</label>
                  <input 
                    required 
                    type="text" 
                    className="w-full bg-surface border border-gray-100 rounded-2xl p-4 text-dark font-bold focus:border-primary transition-colors outline-none p-4 text-sm" 
                    placeholder="e.g. South Delhi" 
                    value={formData.targetLocation} 
                    onChange={e => setFormData({...formData, targetLocation: e.target.value})} 
                  />
                </div>
              </div>
            </div>

            <div className="pt-4">
              <button 
                type="submit" 
                className="w-full bg-primary hover:bg-primary-deep text-white py-5 rounded-3xl font-black uppercase tracking-[0.3em] text-[11px] transition-all shadow-xl shadow-primary/20 active:scale-95"
              >
                Confirm Booking Request
              </button>
              <p className="text-center text-[9px] text-gray-400 mt-4 font-bold uppercase tracking-widest">
                By clicking, you agree to our terms of service
              </p>
            </div>
          </form>
        </div>
      </div>
    </MainLayout>
  );
};

export default ExperienceBookingFormPage;
