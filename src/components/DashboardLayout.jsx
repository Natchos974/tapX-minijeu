import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

function DashboardLayout({ data }) {
  const [isOpen, setIsOpen] = useState(true);
  const sidebarRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <>
      <div className="h-full">
        <div
          className={`md:pl-[80px] h-16 z-20 fixed inset-y-0 w-full md:${
            isOpen ? "pl-[200px]" : "pl-0"
          }`}
        >
          <Navbar isOpen={isOpen} data={data} />
        </div>
        <div
          ref={sidebarRef}
          className="hidden md:flex h-full flex-col fixed inset-y-0 z-30"
        >
          <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} data={data} />
        </div>
        <main
          className={`md:ml-[80px] mt-[80px] min-h-[100vh] mb-5 max-w-[2000px] px-2 md:px-4 items-center flex flex-col md:items-start z-0`}
        >
          <Outlet />
        </main>
      </div>
      <Footer />
    </>
  );
}

export default DashboardLayout;
