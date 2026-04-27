import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';

const SplashScreen = () => {
  const [phase, setPhase] = useState('logo');
  const navigate = useNavigate();

  useEffect(() => {
    // Logo animation duration (6.5 seconds)
    const logoTimeout = setTimeout(() => {
      // Trigger slow exit phase
      setPhase('exit');
      
      // Navigate after exit animation (e.g., 2 seconds later for "slow motion")
      setTimeout(() => {
        navigate('/portal-selection');
      }, 2000);
    }, 6500);

    return () => clearTimeout(logoTimeout);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface overflow-hidden p-4">
      <AnimatePresence mode="wait">
        {phase === 'logo' && (
          <motion.div
            key="logo"
            id="logo"
            initial={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.2, filter: 'blur(10px)' }}
            transition={{ duration: 2, ease: "easeInOut" }}
            className="flex flex-col items-center"
          >
            <Logo size="lg" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SplashScreen;
