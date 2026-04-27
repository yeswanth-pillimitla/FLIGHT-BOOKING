import React, { useState } from 'react';
import { Compass, MapPin, Calendar, Users, Camera, Music, Utensils, X, Clock, IndianRupee, CheckCircle2, ArrowRight } from 'lucide-react';
import MainLayout from '../components/MainLayout';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const ExperienceBookingPage = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState(null);

  const experiences = [
    { title: 'Cultural Tours', icon: Compass, color: 'text-secondary', bg: 'bg-blue-50' },
    { title: 'Adventure', icon: Camera, color: 'text-primary', bg: 'bg-gray-100' },
    { title: 'Music', icon: Music, color: 'text-primary-deep', bg: 'bg-gray-200' },
    { title: 'Dining', icon: Utensils, color: 'text-accent', bg: 'bg-orange-50' },
  ];

  const categoryDetails = {
    'Cultural Tours': {
      desc: 'Immerse yourself in the rich tapestry of local heritage. From ancient monuments to bustling local markets, explore the traditions that shape the city.',
      highlights: ['Guided heritage walks', 'Historical monument visits', 'Traditional craft workshops', 'Local market food tasting'],
      duration: 'Full Day',
      price: '₹2,500 - ₹8,000'
    },
    'Adventure': {
      desc: 'Get your adrenaline pumping with our curated outdoor activities. Perfect for thrill-seekers looking to escape the ordinary.',
      highlights: ['Mountain trekking & hiking', 'Riverside camping', 'Ziplining through forests', 'White water rafting'],
      duration: 'Half Day / Full Day',
      price: '₹1,500 - ₹5,500'
    },
    'Music': {
      desc: 'Experience the heartbeat of the city through its vibrant music scene. From soulful cultural performances to high-energy DJ nights.',
      highlights: ['Live acoustic concerts', 'Underground DJ nights', 'Open mic storytelling', 'Classical cultural shows'],
      duration: 'Evening (4-6 Hours)',
      price: '₹500 - ₹3,500'
    },
    'Dining': {
      desc: 'A culinary journey through the finest flavors. Experience everything from authentic street food to premium rooftop fine dining.',
      highlights: ['Street food crawling', 'Rooftop sunset dinners', 'Luxury buffet experiences', 'Chef\'s table tastings'],
      duration: 'Evening (3-4 Hours)',
      price: '₹1,200 - ₹6,000'
    }
  };

  const handleBookNow = (catName) => {
    navigate('/experience-booking-form', { state: { category: catName || selectedCategory } });
  };

  return (
    <MainLayout>
      <div className="space-y-8 pb-16">
        <div className="flex items-center space-x-3 mb-6">
          <div className="bg-gray-100 p-3 rounded-2xl">
            <Compass className="text-secondary" size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-black text-gray-900 tracking-tight">EXPERIENCES</h1>
            <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">Curated activities for your journey</p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {experiences.map((exp, i) => (
            <motion.div
              key={exp.title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`bg-white border border-gray-100 rounded-[32px] shadow-sm hover:border-secondary transition-all cursor-pointer group flex flex-col items-center space-y-3 relative overflow-hidden ${selectedCategory === exp.title ? 'border-secondary/40 shadow-xl shadow-gray-100 scale-105' : 'hover:border-gray-200 shadow-sm'}`}
              onClick={() => setSelectedCategory(selectedCategory === exp.title ? null : exp.title)}
            >
              {selectedCategory === exp.title && (
                <div className="absolute top-0 right-0 w-16 h-16 bg-secondary/5 rounded-bl-full flex items-center justify-center translate-x-2 -translate-y-2">
                  <CheckCircle2 size={16} className="text-secondary translate-x-[-4px] translate-y-[4px]" />
                </div>
              )}
              <div className={`${exp.bg} p-4 rounded-2xl group-hover:rotate-6 transition-transform shadow-sm`}>
                <exp.icon className={exp.color} size={28} />
              </div>
              <p className={`font-black text-[11px] uppercase tracking-widest ${selectedCategory === exp.title ? 'text-secondary' : 'text-gray-800'}`}>{exp.title}</p>
            </motion.div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {selectedCategory && (
            <motion.div
              key={selectedCategory}
              initial={{ opacity: 0, height: 0, y: 20 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: 20 }}
              className="overflow-hidden"
            >
              <div className="bg-white border border-gray-100 rounded-[32px] p-8 shadow-2xl shadow-gray-100 relative group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-surface rounded-bl-full opacity-50 group-hover:scale-110 transition-transform"></div>
                <div className="relative z-10 space-y-6">
                  <div className="space-y-2">
                    <h2 className="text-3xl font-black text-gray-900 uppercase tracking-tighter italic">
                      {selectedCategory} <span className="text-secondary">Details</span>
                    </h2>
                    <p className="text-gray-500 text-sm leading-relaxed max-w-2xl font-medium">
                      {categoryDetails[selectedCategory].desc}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <h4 className="text-[10px] font-black text-secondary uppercase tracking-[0.2em] flex items-center">
                        <CheckCircle2 size={14} className="mr-2" /> Key Highlights
                      </h4>
                      <div className="grid grid-cols-1 gap-3">
                        {categoryDetails[selectedCategory].highlights.map((h, idx) => (
                          <div key={idx} className="flex items-center space-x-3 bg-blue-50/50 p-3 rounded-xl border border-blue-50">
                            <div className="w-1.5 h-1.5 rounded-full bg-secondary/40" />
                            <span className="text-xs font-bold text-gray-700">{h}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-blue-50/30 p-4 rounded-2xl border border-blue-50 space-y-1">
                          <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest flex items-center"><Clock size={12} className="mr-1" /> Duration</p>
                          <p className="font-black text-gray-900 text-sm">{categoryDetails[selectedCategory].duration}</p>
                        </div>
                        <div className="bg-blue-50/30 p-4 rounded-2xl border border-blue-50 space-y-1">
                          <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest flex items-center"><IndianRupee size={12} className="mr-1" /> Price Range</p>
                          <p className="font-black text-secondary text-sm">{categoryDetails[selectedCategory].price}</p>
                        </div>
                      </div>
                      
                      <button 
                        onClick={() => handleBookNow()}
                        className="w-full bg-secondary hover:bg-primary text-white py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-xs transition-all shadow-xl shadow-gray-200 flex items-center justify-center space-x-3 active:scale-95"
                      >
                        <span>Book Experience</span>
                        <ArrowRight size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="space-y-6 pt-4">
           <h3 className="font-black text-lg px-2 text-gray-900 uppercase tracking-tight italic">Top Rated <span className="text-secondary">Experiences</span></h3>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { name: 'Taj Mahal Private Tour', location: 'Agra, India', price: '₹6,500', img: 'https://h2.gifposter.com/bingImages/TajMahalReflection_1920x1080.jpg' },
                { name: 'London Eye & River Cruise', location: 'London, UK', price: '₹4,500', img: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&q=80&w=600' },
                { name: 'Eiffel Tower Gourmet Lunch', location: 'Paris, France', price: '₹12,500', img: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&q=80&w=600' },
                { name: 'Sunset Yacht Cruise', location: 'Santorini, Greece', price: '₹9,800', img: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&q=80&w=600' }
              ].map((exp, i) => (
                <motion.div 
                  key={exp.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 + (i * 0.1) }}
                  onClick={() => handleBookNow(exp.name)}
                  className="relative h-64 rounded-[40px] overflow-hidden bg-white border border-gray-100 shadow-xl group cursor-pointer"
                >
                   <img src={exp.img} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={exp.name} />
                   <div className="absolute inset-0 bg-gradient-to-t from-primary-deep/90 via-primary-deep/10 to-transparent"></div>
                   <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end">
                      <div className="space-y-1">
                         <p className="font-black text-white text-2xl tracking-tighter uppercase italic group-hover:text-blue-300 transition-colors leading-none">{exp.name}</p>
                         <div className="flex items-center text-gray-200 text-[10px] font-black uppercase tracking-widest">
                            <MapPin size={12} className="mr-1 text-accent" />
                            <span>{exp.location}</span>
                         </div>
                      </div>
                      <div className="text-right">
                         <p className="text-accent font-black text-2xl leading-none">{exp.price}</p>
                         <p className="text-[9px] text-white/50 uppercase tracking-widest font-black mt-1">per person</p>
                      </div>
                   </div>
                </motion.div>
              ))}
           </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ExperienceBookingPage;
