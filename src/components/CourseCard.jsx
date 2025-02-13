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
      <div className="flex flex-col group shadow-sm transition overflow-hidden border hover:border-slate-300 hover:bg-slate-50 rounded-lg p-2 md:p-3 h-full">
        <div className="w-full md:aspect-video overflow-hidden">
          <img
            src={image}
            alt={title}
            className="object-contain w-full md:h-full"
          />
        </div>
        <div className="flex gap-2 pt-5 justify-between">
          <h2 className="flex items-center text-slate-500 text-base font-medium   group-hover:text-[#0680FC] transition line-clamp-2">
            {title}
          </h2>
          <div className="flex gap-3">
            <Badge type="zoneValidation" isAchieved={isValidated} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseCard;
