import React from "react";

export type TabsProps = {
  activeIndex: number;
  onTabChange: (index: number) => void;
};

function Tabs({ activeIndex, onTabChange }: TabsProps) {
  return (
    <div className="flex justify-center gap-4 my-4">
      <button
        className={`px-4 py-2 rounded-2xl font-medium text-lg transition-colors duration-200 shadow-md ${
          activeIndex === 0
            ? "bg-pink-100 text-black"
            : "bg-gray-100 text-gray-400 hover:bg-pink-50"
        }`}
        onClick={() => onTabChange(0)}
      >
        추천 코스
      </button>
      <button
        className={`px-4 py-2 rounded-2xl font-medium text-lg transition-colors duration-200 shadow-md ${
          activeIndex === 1
            ? "bg-blue-100 text-black"
            : "bg-gray-100 text-gray-400 hover:bg-blue-50"
        }`}
        onClick={() => onTabChange(1)}
      >
        맞춤 추천
      </button>
    </div>
  );
}

export default Tabs;
