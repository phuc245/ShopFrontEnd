import Footer from "@/components/home/footer";
import Header from "@/components/home/header";
import React from "react";
import { Outlet } from "react-router-dom";

function LayoutHomePages() {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default LayoutHomePages;
