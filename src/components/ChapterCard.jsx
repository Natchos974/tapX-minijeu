import { cn } from "@/lib/utils";
import { CheckCircle } from "lucide-react";
import { useTransition } from "react";
import { useNavigate } from "react-router-dom";

function ChapterCard({ id, title, isCompleted }) {
  const [isPending, startTransition] = useTransition();
  const navigate = useNavigate();
  const onClick = () => {
    startTransition(() => {
      const currentPath = location.pathname;
      const newPath = `${currentPath}/chapters/${id}`;
      navigate(newPath);
    });
  };

  return (
    <div
      onClick={onClick}
      className={cn("cursor-pointer", isPending && "cursor-wait")}
    >
      <div
        className={cn(
          "flex flex-col justify-between gap-3 group shadow-sm transition overflow-hidden border rounded-lg p-3 h-full",
          isCompleted && "bg-emerald-100"
        )}
      >
        <h2 className="text-lg md:text-base font-medium group-hover:text-sky-700 transition line-clamp-2">
          {title}
        </h2>
        {isCompleted && (
          <div className="flex gap-x-1 items-center text-sm text-emerald-700">
            <CheckCircle />
            Chapitre validé
          </div>
        )}
      </div>
    </div>
  );
}

export default ChapterCard;
