import React, { useState } from "react";
import { useSwipeable } from "react-swipeable";
import { motion, AnimatePresence } from "framer-motion";

interface SwipeItem {
  id: string;
  title: string;
  description: string;
  mascot?: any;
}

interface SwipeStackProps {
  items: SwipeItem[];
  onSave: (item: SwipeItem) => void;
  onDelete: (item: SwipeItem) => void;
}

function SwipeStack({ items, onSave, onDelete }: SwipeStackProps) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(null);

  const handlers = useSwipeable({
    onSwipedLeft: () => handleDelete(),
    onSwipedRight: () => handleSave(),
    trackMouse: true,
  });

  function handleSave() {
    if (index < items.length) {
      onSave(items[index]);
      setDirection("right");
      setTimeout(() => {
        setIndex((i) => i + 1);
        setDirection(null);
      }, 300);
    }
  }

  function handleDelete() {
    if (index < items.length) {
      onDelete(items[index]);
      setDirection("left");
      setTimeout(() => {
        setIndex((i) => i + 1);
        setDirection(null);
      }, 300);
    }
  }

  const current = items[index];

  return (
    <div {...handlers} className="relative w-full max-w-md h-[340px] flex items-center justify-center select-none">
      <AnimatePresence>
        {current && (
          <motion.div
            key={current.id}
            initial={{ x: 0, opacity: 1 }}
            animate={{ x: direction === "right" ? 300 : direction === "left" ? -300 : 0, opacity: direction ? 0 : 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="absolute w-full h-full bg-white rounded-3xl shadow-2xl p-6 flex flex-col items-center justify-center gap-4"
          >
            {current.mascot && <div className="mb-2">{current.mascot}</div>}
            <h3 className="text-lg font-bold mb-1 flex items-center gap-2">{current.title}</h3>
            <p className="text-base text-gray-700 text-center mb-2">{current.description}</p>
            <div className="flex gap-4 mt-4">
              <button
                className="px-5 py-2 rounded-full bg-pink-100 text-pink-600 font-bold shadow hover:bg-pink-200 transition"
                onClick={handleDelete}
              >삭제</button>
              <button
                className="px-5 py-2 rounded-full bg-blue-100 text-blue-600 font-bold shadow hover:bg-blue-200 transition"
                onClick={handleSave}
              >저장</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {!current && (
        <div className="absolute w-full h-full flex flex-col items-center justify-center text-gray-400 text-lg font-bold">
          모든 코스를 확인했습니다!
        </div>
      )}
    </div>
  );
}

export default SwipeStack;
