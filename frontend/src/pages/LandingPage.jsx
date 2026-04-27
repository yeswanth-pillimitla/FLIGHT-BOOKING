import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, ShieldCheck } from 'lucide-react';
import Logo from '../components/Logo';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2.5, ease: "easeOut" }}
      className="min-h-screen flex items-center justify-center relative p-4 overflow-hidden"
      style={{ 
        backgroundImage: 'url("https://png.pngtree.com/thumb_back/fh260/background/20240522/pngtree-airplane-flying-over-the-cloudy-sky-image_15692752.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="absolute inset-0 bg-white/20 backdrop-blur-[2px] pointer-events-none" />

      <div className="w-full max-w-4xl relative z-10 flex flex-col items-center">
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex flex-col items-center text-center space-y-4 mb-16"
        >
          <Logo size="lg" className="mb-2" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-3xl mx-auto px-4">
          <motion.div 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            onClick={() => navigate('/login')}
            className="group cursor-pointer bg-white border border-gray-100 hover:border-secondary p-10 rounded-[40px] transition-all duration-500 flex flex-col items-center space-y-6 text-center shadow-sm hover:shadow-2xl hover:shadow-secondary/10"
          >
            <div className="bg-surface p-6 rounded-3xl group-hover:scale-110 transition-transform duration-500 group-hover:bg-secondary/10">
              <User size={48} className="text-primary group-hover:text-secondary transition-colors" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-dark uppercase tracking-tight mb-2">User Portal</h2>
              <p className="text-sm text-gray-400 font-medium">Book flights, manage tickets, and explore destinations.</p>
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest text-white mt-4 px-8 py-3 bg-primary rounded-2xl group-hover:bg-secondary transition-all shadow-lg shadow-primary/20 group-hover:shadow-secondary/20">
              Enter User
            </span>
          </motion.div>

          <motion.div 
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            onClick={() => navigate('/admin-login')}
            className="group cursor-pointer bg-white border border-gray-100 hover:border-primary p-10 rounded-[40px] transition-all duration-500 flex flex-col items-center space-y-6 text-center shadow-sm hover:shadow-2xl hover:shadow-primary/10"
          >
            <div className="bg-surface p-6 rounded-3xl group-hover:scale-110 transition-transform duration-500 group-hover:bg-primary/10">
              <ShieldCheck size={48} className="text-gray-400 group-hover:text-primary transition-colors" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-dark uppercase tracking-tight mb-2">Admin Portal</h2>
              <p className="text-sm text-gray-400 font-medium">Manage fleet, analyze revenue, and oversee operations.</p>
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest text-white mt-4 px-8 py-3 bg-dark rounded-2xl group-hover:bg-primary transition-all shadow-lg shadow-dark/20 group-hover:shadow-primary/20">
              Enter Admin
            </span>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default LandingPage;
