import React from 'react';
import { motion } from 'framer-motion';

const LoadingSpinner = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex items-center justify-center space-x-2 text-purple-600"
    >
      <div className="w-4 h-4 rounded-full bg-purple-600 animate-bounce" />
      <div className="w-4 h-4 rounded-full bg-blue-600 animate-bounce [animation-delay:-.3s]" />
      <div className="w-4 h-4 rounded-full bg-cyan-600 animate-bounce [animation-delay:-.5s]" />
    </motion.div>
  );
};

export default LoadingSpinner;