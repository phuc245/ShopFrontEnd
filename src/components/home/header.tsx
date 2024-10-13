// src/components/Header.js

import React from "react";
import Logo from "@/assets/logo.jpg";

const Header = () => {
  return (
    <header className="bg-blue-600 text-white">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold">
          <img
            src={Logo}
            alt=""
            className="rounded-full object-cover w-60 h-20 object-center"
          />
        </div>
        <nav className="hidden md:flex space-x-8">
          <a href="/" className="hover:text-blue-300">
            Trang chủ
          </a>
          <a href="/about" className="hover:text-blue-300">
            Giới thiệu
          </a>
          <a href="/services" className="hover:text-blue-300">
            Dịch vụ
          </a>
          <a href="/contact" className="hover:text-blue-300">
            Liên hệ
          </a>
        </nav>
        <div className="hidden md:flex items-center space-x-4">
          <a
            href="/signup"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Đăng Ký
          </a>
          <a
            href="/login"
            className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"
          >
            Đăng Nhập
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
