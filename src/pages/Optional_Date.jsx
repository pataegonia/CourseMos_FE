import { useState } from "react";
import Calendar from "../components/Calendar";

export default function Optional_Date({ onPrev }) {
  const [selectedDate, setSelectedDate] = useState(null);

  return (
    <div className="h-screen overflow-hidden relative">
      {/* 상단 좌측 */}
      <div className="absolute flex flex-col items-start top-[15vh] left-0">
        <p className="pl-2 text-white">.</p>
        <div
          className="flex items-center justify-center h-[5vh] w-[50vw] rounded-r-3xl bg-[#FABAE170] cursor-pointer active:scale-95 transition"
          onClick={onPrev}
        >
          <div className="flex items-center justify-center">
            <p className="mr-3 font-semibold text-gray-600">날짜 확정하기</p>
            <img src="/RightArrow.png" alt="오른쪽스와이프" />
          </div>
        </div>
      </div>

      {/* 가운데 달력 */}
      <div className="absolute inset-0 flex items-center justify-center px-4">
        <Calendar value={selectedDate} onChange={setSelectedDate} />
      </div>

      {/* 하단 우측 */}
      <div className="absolute flex flex-col items-end bottom-[15vh] right-0">
        <p className="pr-2">간단한 정보 입력으로 맞춤 코스 추천!</p>
        <div className="flex items-center justify-center h-[5vh] w-[50vw] rounded-l-3xl bg-[#ADC3FF70]">
          <div className="flex items-center justify-center">
            <img src="/LeftArrow.png" alt="왼쪽스와이프" />
            <p className="ml-3 font-semibold text-gray-500">왼쪽으로 스와이프!</p>
          </div>
        </div>
      </div>
    </div>
  );
}
