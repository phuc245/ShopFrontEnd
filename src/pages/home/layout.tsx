import Footer from "@/components/home/footer";
import Header from "@/components/home/header";
import React from "react";
import { Outlet } from "react-router-dom";

function LayoutHomePages() {
  return (
    <div className="flex flex-col min-h-screen">
      {" "}
      {/* Thay đổi "h-screen" thành "min-h-screen" */}
      <Header />
      <div className="flex-grow">
        {" "}
        {/* Đảm bảo phần nội dung có thể co giãn */}
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default LayoutHomePages;
