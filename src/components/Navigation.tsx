import React from "react";

interface NavigationProps {
  onNav: (page: string) => void;
}

function Navigation({ onNav }: NavigationProps) {
  return (
    <nav className="flex items-center gap-4">
      <button className="text-sm font-semibold text-gray-700 hover:text-blue-600 px-3 py-1" onClick={() => onNav('signup')}>회원가입</button>
      <button className="text-sm font-semibold text-gray-700 hover:text-blue-600 px-3 py-1" onClick={() => onNav('login')}>로그인</button>
      <a href="#" className="text-sm font-semibold text-blue-600 hover:underline">문의하기</a>
    </nav>
  );
}

export default Navigation;
