import { CheckCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const Badge = ({ type, isAchieved, label }) => {
  const getBadgeContent = () => {
    switch (type) {
      case "zoneValidation":
        return {
          message: isAchieved
            ? "Cette zone a déjà été validée !"
            : "Cette zone n'a pas encore été validée",
          icon: CheckCheck,
        };
    }
  };

  const { message, icon } = getBadgeContent();
  const Icon = icon;
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <div
            className={cn(
              "text-slate-500 bg-zinc-400 flex justify-center items-center gap-2 rounded-full p-2 mt-2",
              isAchieved && "text-emerald-200 bg-green-500"
            )}
          >
            <Icon size={20} />
            {label && isAchieved && label}
          </div>
        </TooltipTrigger>
        <TooltipContent>{message}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default Badge;
