import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Plane, Hotel, Package, MapPin, Star, ArrowRight, Percent } from 'lucide-react';
import MainLayout from '../components/MainLayout';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

const HomePage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [bookingCount, setBookingCount] = React.useState(0);

  React.useEffect(() => {
    const fetchBookingCount = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;
        const response = await fetch('http://localhost:5000/api/bookings/my-bookings', { headers: { 'Authorization': `Bearer ${token}` } });
        const data = await response.json();
        if (data.success) setBookingCount(data.bookings.length);
      } catch (error) { console.error('Failed to fetch bookings', error); }
    };
    fetchBookingCount();
  }, []);

  const isFirstBooking = bookingCount === 0;
  const discountAmount = isFirstBooking ? 50 : 10;
  const promotionalBanner = {
    title: `Get ${discountAmount}% off`,
    subtitle: isFirstBooking ? "on your first flight booking with SkyFly" : "on your next journey with SkyFly",
    code: isFirstBooking ? "SKYFLY50" : "SKYFLY10",
    image: "/images/passengers-boarding-ryanair-flight-in-london.jpg"
  };

  const categories = [
    { title: 'FLIGHT', icon: Plane, color: 'bg-surface', text: 'text-secondary', desc: '', path: '/flight-booking', img: '/images/flight-deal.png' },
    { title: 'Hotel Deals', icon: Hotel, color: 'bg-surface', text: 'text-accent', desc: 'Luxury stays', path: '/hotel-booking', img: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=400' },
    { title: 'Experiences', icon: Package, color: 'bg-surface', text: 'text-secondary', desc: 'Best value', path: '/experience-booking', img: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=400' }
  ];

  const featuredDestinations = [
    { name: 'Maldives', img: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&q=80&w=600', rating: 4.9 },
    { name: 'Paris', img: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&q=80&w=600', rating: 4.8 },
    { name: 'Tokyo', img: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=600', rating: 4.7 },
    { name: 'Dubai', img: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=600', rating: 4.9 },
    { name: 'London', img: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&q=80&w=600', rating: 4.8 },
    { name: 'New York', img: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&q=80&w=600', rating: 4.7 },
    { name: 'Sydney', img: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&q=80&w=600', rating: 4.9 }
  ];

  return (
    <MainLayout>
      <div className="space-y-8 pb-10 relative z-10">
        {/* Hero Section */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="relative h-80 rounded-[40px] overflow-hidden group shadow-2xl">
          <img src="/images/flight.webp" className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" alt="Hero" />
          <div className="absolute inset-0 bg-white/30 backdrop-blur-[1px]"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent"></div>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 space-y-4">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.3 }}
              className="bg-primary px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-white shadow-lg">
              {isFirstBooking ? 'Exclusive Welcome Offer' : 'Loyalty Reward Offer'}
            </motion.div>
            <div className="space-y-1">
               <h1 className="text-4xl md:text-5xl font-black text-dark tracking-tighter uppercase leading-none">
                 Explore the <span className="text-secondary">Sky</span> With Us
               </h1>
               <p className="text-dark/70 text-sm font-bold uppercase tracking-widest">
                 Hi {user?.name || 'Traveler'}, {promotionalBanner.subtitle}
               </p>
            </div>
            <div className="pt-2 flex flex-col items-center space-y-3">
               <button onClick={(e) => { e.stopPropagation(); navigate('/flight-booking'); }}
                 className="bg-accent text-white px-10 py-3.5 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-orange-600 hover:scale-105 active:scale-95 transition-all shadow-xl">
                 {isFirstBooking ? 'Book My First Flight' : 'Book My Next Flight'}
               </button>
               <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-gray-200">
                  <span className="text-[10px] text-gray-500 font-bold">Use Code:</span>
                  <span className="text-[10px] text-accent font-black tracking-widest">{promotionalBanner.code}</span>
               </div>
            </div>
          </div>
        </motion.div>

        {/* Categories */}
        <div className="grid grid-cols-1 gap-4">
          <div className="flex items-center justify-between px-2 mb-1">
            <h3 className="font-bold text-lg text-dark uppercase tracking-tight">Special Deals</h3>
            <button onClick={() => navigate('/book')} className="text-secondary text-xs font-bold flex items-center">View All <ArrowRight size={14} className="ml-1" /></button>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {categories.map((cat, i) => (
              <motion.div key={cat.title} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.1 }}
                onClick={() => navigate(cat.path)}
                className="relative bg-white border border-gray-100 rounded-3xl overflow-hidden h-32 flex flex-col items-center justify-center text-center cursor-pointer group hover:border-secondary transition-all shadow-sm">
                <img src={cat.img} className="absolute inset-0 w-full h-full object-cover opacity-10 group-hover:scale-110 transition-transform duration-700" alt="" />
                <div className="relative z-10 flex flex-col items-center space-y-2">
                   <div className={`bg-gray-50 p-2 rounded-xl group-hover:scale-110 transition-transform shadow-sm`}>
                     <cat.icon className="text-primary" size={18} />
                   </div>
                   <div>
                     <p className="text-[10px] font-black text-dark uppercase tracking-widest">{cat.title}</p>
                     <p className="text-[7px] text-gray-400 font-extrabold uppercase tracking-tight">{cat.desc}</p>
                   </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Featured Destinations */}
        <div className="space-y-4">
          <div className="flex items-center justify-between px-2">
            <h3 className="font-bold text-lg text-gray-900">Popular destinations</h3>
          </div>
          <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4 px-1">
            {featuredDestinations.map((dest, i) => (
              <motion.div key={dest.name} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 + 0.3 }}
                onClick={() => navigate('/flight-booking')}
                className="relative min-w-[180px] h-64 rounded-[32px] overflow-hidden glass-card shrink-0 cursor-pointer group">
                <img src={dest.img} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={dest.name} />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900 via-blue-900/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity"></div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 scale-90 group-hover:scale-100">
                  <button className="bg-white text-blue-900 px-6 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-2xl hover:bg-orange-500 hover:text-white transition-all transform translate-y-4 group-hover:translate-y-0">Book Now</button>
                </div>
                <div className="absolute top-3 right-3 bg-white/90 px-2 py-1 rounded-lg flex items-center space-x-1 shadow-sm">
                  <Star size={10} className="text-orange-500 fill-orange-500" />
                  <span className="text-[10px] font-bold text-gray-800">{dest.rating}</span>
                </div>
                <div className="absolute bottom-5 left-5 right-5 transition-transform duration-500 group-hover:-translate-y-2">
                  <p className="font-black text-white text-xl tracking-tight leading-tight">{dest.name}</p>
                  <div className="flex items-center text-white/70 space-x-1.5 mt-1">
                    <MapPin size={10} className="text-orange-400" />
                    <span className="text-[9px] font-black uppercase tracking-widest">Explore</span>
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

export default HomePage;
