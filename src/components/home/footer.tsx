import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-4 mt-auto">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-start space-y-4 md:space-y-0">
        {/* Contact Information */}
        <div className="text-center md:text-left space-y-1 md:pl-4">
          <h4 className="text-lg font-semibold">Liên Hệ</h4>
          <p className="text-sm">Email: contact@example.com</p>
          <p className="text-sm">Điện thoại: +1 234 567 890</p>
        </div>

        {/* Social Media Links */}
        <div className="text-center flex flex-col items-center space-y-2 md:pr-4">
          <h4 className="text-lg font-semibold">Theo dõi chúng tôi</h4>
          <div className="flex space-x-4 mt-1">
            <a href="#" className="hover:text-blue-400" aria-label="Facebook">
              <FaFacebook className="w-6 h-6" />
            </a>
            <a href="#" className="hover:text-blue-400" aria-label="Twitter">
              <FaTwitter className="w-6 h-6" />
            </a>
            <a href="#" className="hover:text-blue-400" aria-label="Instagram">
              <FaInstagram className="w-6 h-6" />
            </a>
            <a href="#" className="hover:text-blue-400" aria-label="LinkedIn">
              <FaLinkedin className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="text-center mt-4 border-t border-gray-700 pt-3">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Công ty của bạn. Tất cả quyền được
          bảo lưu.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
