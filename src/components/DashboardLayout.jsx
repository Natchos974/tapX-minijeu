import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

function DashboardLayout() {
  return (
    <>
      <div className="h-full">
        <div className="md:pl-56 h-16 fixed inset-y-0 w-full">
          <Navbar />
        </div>
        <div className="hidden md:flex h-full w-56 flex-col fixed inset-y-0 z-50">
          <Sidebar />
        </div>
        <main className="md:pl-60 pt-[80px] px-2 mb-5 min-h-screen items-center flex flex-col md:items-start z-0">
          <Outlet />
        </main>
      </div>
      <Footer />
    </>
  );
}

export default DashboardLayout;
