import React, { useState } from "react";
import { motion } from "framer-motion";
import coursemosLogo from "./assets/coursemos_logo.svg";
import Header from "./components/Header";
import Footer from "./components/Footer";

// SwipeCard를 react-swipeable로 감싼 컴포넌트
// Removed SwipeableCard component and related imports
// import { useSwipeable } from "react-swipeable";

function App() {
  const [page, setPage] = useState('main');

  // 미구현 페이지 컴포넌트
  const NotImplemented = ({ title }: { title: string }) => (
    <div className="flex flex-col items-center justify-center h-[400px]">
      <span className="text-2xl font-bold mb-2 text-blue-500">{title}</span>
      <span className="mb-4 text-base text-gray-700">아직 미구현된 페이지입니다.</span>
      <button
        className="px-7 py-3 rounded-2xl shadow-lg font-semibold text-lg bg-blue-200 hover:bg-blue-300 text-black mt-4 transition-all duration-200"
        onClick={() => setPage('main')}
      >
        돌아가기
      </button>
    </div>
  );
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-pink-50 flex flex-col items-center justify-center relative overflow-hidden">
  {/* 헤더 */}
  <Header onNav={setPage} />
      {/* 중앙 asset 배경 */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none select-none opacity-20">
        <img src={coursemosLogo} alt="Coursemos Logo" className="w-[320px] md:w-[400px] lg:w-[458px] blur-sm" />
      </div>
      {/* 메인 콘텐츠 */}
       <main className="flex-1 w-full max-w-md mx-auto flex flex-col justify-center items-center min-h-[500px] py-8 z-10 relative">
         <motion.div
           key={page}
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           exit={{ opacity: 0, y: -30 }}
           transition={{ duration: 0.4 }}
           className="w-full h-full"
         >
           {page === 'main' && (
             <div className="flex flex-col justify-between items-center h-full w-full py-8">
               <div className="flex flex-col gap-16 w-full items-center">
                 <div className="w-full flex flex-col items-start gap-4">
                   <span className="text-base font-semibold text-gray-900">추천 데이트 코스는 여기!</span>
                   <button
                     className="flex items-center gap-2 px-6 py-3 rounded-full bg-pink-50 text-gray-900 font-bold shadow transition-all hover:bg-pink-100 focus:outline-none"
                     onClick={() => setPage('recommend')}
                   >
                     오른쪽으로 스와이프 <span className="ml-1">→</span>
                   </button>
                 </div>
                 <div className="w-full flex flex-col items-end gap-4">
                   <span className="text-base font-semibold text-gray-900">간단한 정보 입력으로 맞춤 코스 추천!</span>
                   <button
                     className="flex items-center gap-2 px-6 py-3 rounded-full bg-blue-50 text-gray-900 font-bold shadow transition-all hover:bg-blue-100 focus:outline-none"
                     onClick={() => setPage('custom')}
                   >
                     ← 왼쪽으로 스와이프
                   </button>
                 </div>
               </div>
               {/* 중복된 로고 제거됨 */}
             </div>
           )}
           {page === 'signup' && <NotImplemented title="회원가입" />}
           {page === 'login' && <NotImplemented title="로그인" />}
           {page === 'recommend' && <NotImplemented title="추천 데이트 코스" />}
           {page === 'custom' && <NotImplemented title="맞춤 데이트 코스" />}
         </motion.div>
       </main>
  {/* 푸터 */}
  <Footer />
    </div>
  );
}
export default App;
