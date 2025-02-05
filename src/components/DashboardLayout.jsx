import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import { useState } from "react";

function DashboardLayout() {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <>
      <div className="h-full">
        <div
          className={`md:pl-[80px] h-16 z-20 fixed inset-y-0 w-full md:${
            isOpen ? "pl-[200px]" : "pl-0"
          }`}
        >
          <Navbar isOpen={isOpen} />
        </div>
        <div className="hidden md:flex h-full flex-col fixed inset-y-0 z-30">
          <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>
        <main
          className={`md:pl-[100px] pt-[80px] min-h-[100vh] mb-5 px-2 items-center flex flex-col md:items-start z-0 ${
            isOpen && "md:pl-[240px]"
          }`}
        >
          <Outlet />
        </main>
      </div>
      <Footer />
    </>
  );
}

export default DashboardLayout;
