import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft } from "lucide-react";

export type CardProps = {
  direction: "left" | "right" | "none";
  title: string | ReturnType<typeof React.createElement>;
  description: string | ReturnType<typeof React.createElement>;
  buttonText: string;
  onButtonClick: () => void;
  bgColor: string;
};

function Card(props: CardProps) {
  const { direction, title, description, buttonText, onButtonClick, bgColor } = props;
  return (
    <motion.div
  className={`w-full max-w-md mx-auto rounded-3xl shadow-2xl p-8 mb-6 ${bgColor} bg-gradient-to-br from-white via-transparent to-${direction === "right" ? "pink-100" : "blue-100"} transition-all duration-300 hover:scale-[1.03]`}
      initial={{ opacity: 0, x: direction === "right" ? 100 : -100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: direction === "right" ? 100 : -100 }}
      transition={{ duration: 0.4 }}
    >
  <h2 className="text-2xl font-extrabold mb-3 text-gray-800 tracking-tight leading-tight animate-fade-in-up">{title}</h2>
  <p className="mb-6 text-base text-gray-700 animate-fade-in-up delay-100">{description}</p>
      <button
        className={`flex items-center gap-2 px-7 py-3 rounded-2xl shadow-lg font-semibold text-lg transition-all duration-200 border border-transparent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${direction === "right" ? "pink-300" : "blue-300"} ${
          direction === "right"
            ? "bg-pink-100 hover:bg-pink-200 text-black hover:scale-105"
            : "bg-blue-100 hover:bg-blue-200 text-black hover:scale-105"
        } animate-fade-in-up delay-200`}
        onClick={onButtonClick}
      >
        {direction === "left" ? <ArrowLeft size={22} /> : null}
        {buttonText}
        {direction === "right" ? <ArrowRight size={22} /> : null}
      </button>
    </motion.div>
  );
// ...existing code...

}
export default Card;
