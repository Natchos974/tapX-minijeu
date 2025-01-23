import { CheckCircle, Signature } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const Badge = ({ type, isAchieved }) => {
  const getBadgeContent = () => {
    switch (type) {
      case "courseSignature":
        return {
          message: isAchieved
            ? "Vous avez déjà signé le cours !"
            : "Vous n'avez pas encore signé le cours",
          icon: Signature,
        };
      case "teacherValidation":
        return {
          message: isAchieved
            ? "Vous avez déjà validé l'épreuve pratique"
            : "Vous n'avez pas encore validé la pratique",
          icon: CheckCircle,
        };
    }
  };

  const { message, icon } = getBadgeContent();
  const Icon = icon;
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Icon
            size={40}
            className={cn(
              "text-slate-500 bg-zinc-400 rounded-full p-2 mt-2",
              isAchieved && "text-emerald-200 bg-green-500"
            )}
          />
        </TooltipTrigger>
        <TooltipContent>{message}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default Badge;
