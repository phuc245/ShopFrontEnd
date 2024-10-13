// src/components/Footer.js

import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <div className="text-center md:text-left">
          <h4 className="text-lg font-semibold">Liên Hệ</h4>
          <p>Email: contact@example.com</p>
          <p>Điện thoại: +1 234 567 890</p>
        </div>
        <div className="mt-4 md:mt-0">
          <h4 className="text-lg font-semibold">Theo dõi chúng tôi</h4>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-blue-400">
              Facebook
            </a>
            <a href="#" className="hover:text-blue-400">
              Twitter
            </a>
            <a href="#" className="hover:text-blue-400">
              Instagram
            </a>
            <a href="#" className="hover:text-blue-400">
              LinkedIn
            </a>
          </div>
        </div>
      </div>
      <div className="text-center mt-4 border-t border-gray-700 pt-4">
        <p>
          &copy; {new Date().getFullYear()} Công ty của bạn. Tất cả quyền được
          bảo lưu.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
