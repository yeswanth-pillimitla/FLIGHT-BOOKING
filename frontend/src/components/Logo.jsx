import React from 'react';
import { motion } from 'framer-motion';

const Logo = ({ className = '', size = 'md' }) => {
  const sizes = {
    sm: { text: 'text-xl', icon: 20, gap: 'gap-2' },
    md: { text: 'text-3xl', icon: 32, gap: 'gap-3' },
    lg: { text: 'text-5xl md:text-6xl', icon: 48, gap: 'gap-4' },
  };

  const currentSize = sizes[size] || sizes.md;

  return (
    <div className={`relative flex items-center ${currentSize.gap} ${className}`}>
      {/* Sky Text */}
      <motion.span
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`${currentSize.text} font-extrabold text-primary tracking-tighter`}
      >
        Sky
      </motion.span>

      {/* Plane icon passing through */}
      <div className="relative">
        <motion.div
          initial={{ x: -50, y: 10, opacity: 0, rotate: 45 }}
          animate={{ x: 0, y: 0, opacity: 1, rotate: 45 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "backOut" }}
          className="relative z-10"
        >
          <svg
            width={currentSize.icon}
            height={currentSize.icon}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-secondary"
          >
            <path d="M17.8 19.2L16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" />
          </svg>
        </motion.div>

        {/* Animated streak */}
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: '150%', opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="absolute top-1/2 left-[-20%] h-[2px] bg-gradient-to-r from-transparent via-secondary/40 to-transparent -translate-y-1/2 z-0"
        />
      </div>

      {/* Fly Text */}
      <motion.span
        initial={{ x: 20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`${currentSize.text} font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-secondary to-primary tracking-tighter`}
      >
        Fly
      </motion.span>
    </div>
  );
};

export default Logo;
