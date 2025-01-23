import { cn } from "@/lib/utils";
import { BookOpen } from "lucide-react";
import { useTransition } from "react";
import Badge from "./Badge";
import { useLocation, useNavigate } from "react-router-dom";
import ProgressBar from "./ProgressBar";

function CourseCard({ id, title, image, chapters, progress, note, signature }) {
  const [isPending, startTransition] = useTransition();
  const { pathname } = useLocation();
  const isHomePage = pathname === "/" ? true : false;
  const navigate = useNavigate();
  const onClick = () => {
    startTransition(() => {
      navigate(`/courses/${id}`);
    });
  };

  return (
    <div
      onClick={onClick}
      className={cn("cursor-pointer", isPending && "cursor-wait")}
    >
      <div className="group shadow-sm transition overflow-hidden border hover:border-slate-300 rounded-lg p-3 h-full">
        <div className="w-full rounded-md md:aspect-video overflow-hidden">
          <img
            src={image}
            alt={title}
            className="object-contain w-[100px] md:w-full md:h-full"
          />
        </div>
        <h2 className="text-lg md:text-base font-medium pt-5 min-h-[70px] group-hover:text-sky-700 transition line-clamp-2">
          {title}
        </h2>
        <div className="flex gap-x-1 items-center">
          <BookOpen size={20} color="gray"></BookOpen>
          <span className="text-sm text-gray-600">{chapters} chapitre(s)</span>
        </div>
        {isHomePage && (
          <>
            <ProgressBar progress={progress} />
            <div className="flex gap-3">
              <Badge type="courseSignature" isAchieved={signature} />
              <Badge type="teacherValidation" isAchieved={note} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default CourseCard;
