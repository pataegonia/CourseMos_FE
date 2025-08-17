import React from "react";
import rabbitFace from "../assets/emojione_rabbit-face.svg";

interface HeaderProps {
  onNav: (page: string) => void;
}

function Header({ onNav }: HeaderProps) {
  return (
    <header className="w-full flex items-center justify-between h-16 px-8 bg-white shadow-lg border-b border-gray-100 z-30">
      <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">coursemos</h1>
      <nav className="flex items-center gap-4">
        <button className="text-sm font-semibold text-gray-700 hover:text-blue-600 px-3 py-1" onClick={() => onNav('signup')}>회원가입</button>
        <button className="text-sm font-semibold text-gray-700 hover:text-blue-600 px-3 py-1" onClick={() => onNav('login')}>로그인</button>
        <a href="#" className="text-sm font-semibold text-blue-600 hover:underline">문의하기</a>
        <div className="w-10 h-10 rounded-full bg-white border-2 border-gray-200 shadow flex items-center justify-center ml-2">
          <img src={rabbitFace} alt="프로필" className="w-8 h-8 rounded-full object-cover" />
        </div>
      </nav>
    </header>
  );
}

export default Header;
