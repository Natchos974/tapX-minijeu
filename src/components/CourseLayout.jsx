import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import CourseNavbar from "./CourseNavbar";

function CourseLayout() {
  return (
    <>
      <div className="h-full">
        <div className="h-16 fixed inset-y-0 w-full z-99">
          <CourseNavbar />
        </div>
        <main className="pt-[80px] min-h-screen px-2 mb-5 items-center md:items-start z-0">
          <Outlet />
        </main>
      </div>
      <Footer />
    </>
  );
}

export default CourseLayout;
