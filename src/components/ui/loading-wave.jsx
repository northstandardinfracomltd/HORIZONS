
import React from "react";
import { motion } from "framer-motion";

const LoadingWave = () => {
  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <motion.div
        initial={{ scaleX: 0, originX: 0 }}
        animate={{ scaleX: 1, originX: 0 }}
        exit={{ scaleX: 0, originX: 1 }}
        transition={{ duration: 2, ease: "easeInOut" }}
        className="h-[3px] bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
      />
    </div>
  );
};

export default LoadingWave;
