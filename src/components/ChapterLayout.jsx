import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import CourseNavbar from "./CourseNavbar";

function ChapterLayout() {
  return (
    <>
      <div className="h-full">
        <div className="h-16 sticky inset-y-0 w-full z-10 bg-white">
          <CourseNavbar />
        </div>
        <main className="pt-[80px] px-2 mb-5 min-h-screen items-center flex flex-col md:items-start z-0">
          <Outlet />
        </main>
      </div>
      <Footer />
    </>
  );
}

export default ChapterLayout;
