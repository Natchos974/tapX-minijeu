import { ArrowLeft } from "lucide-react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";

function CourseNavbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id, chapterId } = useParams();
  //console.log(id, chapterId);
  return (
    <div className="p-4 border-b h-full font-semibold flex gap-5 bg-white shadow-sm justify-end items-center">
      <Link
        onClick={(e) => {
          e.preventDefault();
          if (location.pathname.includes("/chapters")) {
            // Navigate to the related course page
            navigate(`/courses/${id}`);
          } else {
            // Navigate to the root
            navigate("/");
          }
        }}
        className="flex gap-2 font-semibold border rounded-md hover:bg-slate-100 p-2"
      >
        <ArrowLeft />
        Retour
      </Link>
    </div>
  );
}

export default CourseNavbar;
