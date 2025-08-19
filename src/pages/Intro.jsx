import { useRef } from "react";

export default function Intro({ onSwipeRight, onSwipeLeft }) {
  const startX = useRef(null);

  const handleTouchStart = (e) => {
    startX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (startX.current === null) return;
    const dx = e.changedTouches[0].clientX - startX.current;
    const threshold = 50;

    if (dx > threshold) {
      onSwipeRight?.();
    } else if (dx < -threshold) {
      onSwipeLeft?.();
    }
    startX.current = null;
  };

  return (
    <div
      className="h-screen overflow-hidden relative"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* 오른쪽 스와이프 */}
      <div className="absolute flex flex-col items-start top-[15vh] left-0">
        <p className="pl-2">추천 데이트 코스는 여기!!</p>
        <div className="flex items-center justify-center h-[5vh] w-[50vw] rounded-r-3xl bg-[#FABAE170]">
          <div className="flex items-center justify-center">
            <p className="mr-3 font-semibold text-gray-500">오른쪽으로 스와이프!</p>
            <img src="/RightArrow.png" alt="오른쪽스와이프" />
          </div>
        </div>
      </div>

      {/* 워터마크 */}
      <div className="absolute inset-0 flex items-center justify-center">
        <img src="/watermark.png" alt="워터마크"/>
      </div>

      {/* 왼쪽 스와이프 */}
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
