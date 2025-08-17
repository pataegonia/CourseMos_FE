import React from "react";
import { motion } from "framer-motion";

interface SwipeCardProps {
  direction: "left" | "right";
  title: string;
  description: string;
  highlight?: string;
  onSwipe: () => void;
  color?: string;
  children?: any;
}

function SwipeCard({ direction, title, description, highlight, onSwipe, color = "bg-white", children }: SwipeCardProps) {
  return (
    <motion.div
      className={`relative w-full max-w-md rounded-3xl shadow-xl p-6 ${color} flex flex-col items-center justify-center select-none`}
      initial={{ x: direction === "right" ? 120 : -120, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: direction === "right" ? 120 : -120, opacity: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="flex flex-col items-center gap-2 w-full">
        <div className="flex items-center gap-2 mb-2">
          {direction === "left" && <span className="text-2xl">👈</span>}
          <span className="text-lg font-bold text-gray-800">{title}</span>
          {direction === "right" && <span className="text-2xl">👉</span>}
        </div>
        <div className="w-full text-center text-base text-gray-600 mb-2">
          {description}
          {highlight && <span className="ml-2 px-2 py-1 rounded bg-blue-100 text-blue-600 text-xs font-semibold">{highlight}</span>}
        </div>
        {children}
      </div>
      <button
        className={`absolute bottom-4 left-1/2 -translate-x-1/2 px-6 py-2 rounded-full font-bold shadow bg-gradient-to-r ${direction === "right" ? "from-blue-400 to-blue-300 text-white" : "from-pink-400 to-pink-300 text-white"} hover:scale-105 transition-all duration-200`}
        onClick={onSwipe}
      >
        {direction === "right" ? "오른쪽으로 스와이프" : "왼쪽으로 스와이프"}
      </button>
    </motion.div>
  );
}

export default SwipeCard;
