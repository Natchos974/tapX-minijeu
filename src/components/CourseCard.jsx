import { cn } from "@/lib/utils";

import { useTransition } from "react";
import Badge from "./Badge";
import { useNavigate } from "react-router-dom";

function CourseCard({ id, title, image, isValidated }) {
  const [isPending, startTransition] = useTransition();
  const navigate = useNavigate();
  const onClick = () => {
    startTransition(() => {
      navigate(`/zone/${id}`);
    });
  };

  return (
    <div
      onClick={onClick}
      className={cn("cursor-pointer", isPending && "cursor-wait")}
    >
      <div className="group shadow-sm transition overflow-hidden border hover:border-slate-300 rounded-lg p-3 h-full">
        <div className="w-full md:aspect-video overflow-hidden">
          <img
            src={image}
            alt={title}
            className="object-contain w-[100px] md:w-full md:h-full"
          />
        </div>
        <h2 className="text-lg text-slate-600 md:text-base font-medium pt-5 min-h-[70px] group-hover:text-sky-700 transition line-clamp-2">
          {title}
        </h2>

        <>
          <div className="flex gap-3">
            <Badge type="zoneValidation" isAchieved={isValidated} />
          </div>
        </>
      </div>
    </div>
  );
}

export default CourseCard;
