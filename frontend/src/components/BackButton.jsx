import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const BackButton = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Hide back button on the landing page or if there's no history to go back to (optional)
  // For "every page", we can just show it everywhere except maybe landing page.
  if (location.pathname === '/') return null;

  return (
    <AnimatePresence>
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => navigate(-1)}
        className="fixed top-6 left-4 z-[100] bg-white shadow-xl shadow-primary/10 border border-gray-100 p-2.5 rounded-2xl flex items-center justify-center text-primary hover:text-secondary transition-all group"
      >
        <ChevronLeft size={20} className="group-hover:-translate-x-0.5 transition-transform" />
      </motion.button>
    </AnimatePresence>
  );
};

export default BackButton;
