import { CheckCircle, Lock, PlayCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useTransition } from "react";

function SignatureItem({ courseId, isAvailable, isSigned }) {
  const Icon = isSigned ? CheckCircle : isAvailable ? PlayCircle : Lock;
  const [isPending] = useTransition();
  const navigate = useNavigate();
  const onClick = () => {
    navigate(`/courses/${courseId}/signature`);
  };

  return (
    <button
      onClick={onClick}
      className={cn(
        "flex flex-col justify-between gap-3 group shadow-sm transition overflow-hidden border rounded-lg p-3 h-full bg-slate-200",
        isPending && "cursor-wait",
        isAvailable && "bg-inherit",
        isSigned && isAvailable && "bg-emerald-100"
      )}
      disabled={!isAvailable}
    >
      <h2
        className={cn(
          "text-lg md:text-base font-medium transition line-clamp-2",
          isAvailable && "group-hover:text-sky-700"
        )}
      >
        Signature
      </h2>
      <div className="flex gap-x-1 items-center text-slate-500">
        <Icon
          size={22}
          className={cn(
            "text-slate-500",
            isAvailable && "text-inherit",
            isAvailable && isSigned && "text-emerald-600"
          )}
        />
        <p
          className={cn(
            "text-lg text-slate-500 md:text-base transition line-clamp-2",
            isAvailable && "text-inherit",
            isAvailable && isSigned && "text-emerald-600"
          )}
        >
          {isSigned
            ? "Cours déjà signé"
            : isAvailable
            ? "Signature disponible"
            : "Signature indisponible"}
        </p>
      </div>
    </button>
  ); /*
  return (
    <button
      onClick={onClick}
      type="button"
      className={cn(
        "flex items-center gap-x-2 text-slate-500 text-sm font-[500] pl-6 transition-all hover:bg-slate-300/70",
        isSigned && "bg-emerald-500/20 text-emerald-600 hover:bg-emerald-500/30"
      )}
      disabled={!isAvailable}
    >
      <div className="flex items-center gap-x-2 py-4">
        <Icon
          size={22}
          className={cn("text-slate-500", isSigned && "text-emerald-600")}
        />
        Signature
      </div>
      <div className="ml-auto opacity-0 border-2 border-slate-700 h-full transition-all" />
    </button>
  );*/
}

export default SignatureItem;
