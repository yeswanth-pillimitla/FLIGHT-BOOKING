import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Plane, Users, Truck, Hotel, Palmtree, Compass, ChevronRight } from 'lucide-react';
import MainLayout from '../components/MainLayout';
import { motion } from 'framer-motion';

const BookingHubPage = () => {
  const navigate = useNavigate();

  const leftServices = [
    { title: 'Flight Booking', icon: Plane, path: '/flight-booking', color: 'text-secondary', bg: 'bg-surface' },
    { title: 'Group Booking', icon: Users, path: '/group-booking', color: 'text-primary', bg: 'bg-gray-100' },
    { title: 'Cargo Booking', icon: Truck, path: '/cargo-booking', color: 'text-accent', bg: 'bg-surface' },
  ];

  const rightServices = [
    { title: 'Hotels', icon: Hotel, path: '/hotel-booking', color: 'text-secondary', bg: 'bg-surface' },
    { title: 'Resorts', icon: Palmtree, path: '/resort-booking', color: 'text-secondary', bg: 'bg-gray-100' },
    { title: 'Experiences', icon: Compass, path: '/experience-booking', color: 'text-accent', bg: 'bg-surface' },
  ];

  const ServiceCard = ({ service, index }) => (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      onClick={() => service.path !== '#' && navigate(service.path)}
      className="bg-white border border-gray-100 rounded-[32px] shadow-sm hover:border-secondary transition-all cursor-pointer group flex flex-col items-center justify-center space-y-4 relative overflow-hidden p-5"
    >
      <div className={`p-4 rounded-3xl ${service.bg} group-hover:scale-110 transition-transform duration-500`}>
        <service.icon className={service.color} size={32} />
      </div>
      <div className="text-center z-10">
        <h3 className="font-bold text-sm text-gray-800 group-hover:text-secondary transition-colors">{service.title}</h3>
      </div>
      <div className="absolute top-2 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
        <ChevronRight size={16} className="text-secondary" />
      </div>
    </motion.div>
  );

  return (
    <MainLayout>
      <div className="space-y-10 py-4">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-black text-gray-900 tracking-tight uppercase">Booking <span className="text-secondary">Hub</span></h1>
          <p className="text-gray-400 text-sm font-medium tracking-widest uppercase">Select a service to get started</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-4">
             <div className="px-2"><p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-2">Transport</p></div>
             {leftServices.map((service, i) => <ServiceCard key={service.title} service={service} index={i} />)}
          </div>
          <div className="space-y-4">
             <div className="px-2"><p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-2">Stays & Fun</p></div>
             {rightServices.map((service, i) => <ServiceCard key={service.title} service={service} index={i + 3} />)}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default BookingHubPage;
