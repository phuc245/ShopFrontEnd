import Footer from "@/components/home/footer";
import Header from "@/components/home/header";
import React from "react";
import { Outlet } from "react-router-dom";

function LayoutHomePages() {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default LayoutHomePages;
