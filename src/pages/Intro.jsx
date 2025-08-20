import { useRef, useState } from "react";

export default function Intro({ onSwipeRight, onSwipeLeft }) {
  const startX = useRef(null);
  const [expanding, setExpanding] = useState(false);

  const handleTouchStart = (e) => {
    startX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (startX.current === null) return;
    const dx = e.changedTouches[0].clientX - startX.current;
    const threshold = 50;

    if (dx > threshold) {
      // 오른쪽 스와이프: 기존 로직 유지
      onSwipeRight?.();
    } else if (dx < -threshold) {
      // 왼쪽 스와이프 → 라벨 확장 후 페이지 전환
      setExpanding(true);
      // 라벨 width 애니메이션이 끝난 직후 전환 (duration 200ms와 맞춤)
      setTimeout(() => {
        onSwipeLeft?.();
        // 다음에 Intro로 돌아올 때를 대비해 원복
        setExpanding(false);
      }, 220);
    }
    startX.current = null;
  };

  return (
    <div
      className="h-screen overflow-hidden relative"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* 우측 상단 핑크 라벨 (ProgressDock와 같은 Y, 같은 높이) */}
      <div className="absolute flex flex-col items-end top-[15vh] right-0 z-50">
        <p className="pr-2">간단한 정보 입력으로 맞춤 코스 추천!</p>
        <div
          className={[
            "flex items-center justify-center shadow-xl",
            "h-[6vh]", // ProgressDock와 동일 높이
            expanding ? "w-screen" : "w-[50vw]", // ← 가로 확장 애니메이션
            "rounded-l-3xl bg-[#FABAE170]",
            "transition-[width] duration-200 ease-out",
          ].join(" ")}
        >
          <div className="flex items-center justify-center pointer-events-none">
            <img src="/LeftArrow.png" alt="왼쪽스와이프" />
            <p className="ml-3 font-semibold text-gray-600">왼쪽으로 스와이프!</p>
          </div>
        </div>
      </div>

      {/* 워터마크 (중앙) */}
      <div className="absolute inset-0 flex items-center justify-center">
        <img src="/watermark.png" alt="워터마크" />
      </div>

      {/* (선택) 오른쪽 스와이프 안내가 필요하면 아래를 유지/조정 */}
      <div className="absolute flex flex-col items-start bottom-[15vh] left-0">
        <p className="pl-2">추천 데이트 코스는 여기!!</p>
        <div className="flex items-center justify-center h-[5vh] w-[50vw] rounded-r-3xl bg-[#ADC3FF70] shadow-xl">
          <div className="flex items-center justify-center">
            <p className="mr-3 font-semibold text-gray-500">오른쪽으로 스와이프!</p>
            <img src="/RightArrow.png" alt="오른쪽스와이프" />
          </div>
        </div>
      </div>
    </div>
  );
}
