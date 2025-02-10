import { NavLink } from "react-router-dom";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

function SidebarItems({ href, icon: Icon, label, isOpen, onClick, subItems }) {
  if (subItems) {
    console.log(subItems);
  }
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <NavLink
            to={href || "#"} // Use a fallback to prevent NavLink errors
            className={({ isActive, isPending }) =>
              isPending
                ? "pending-link"
                : !href || !isActive // Check if href is null or undefined
                ? "flex items-center text-slate-500 pl-3 text-sm gap-x-2 font-[500] transition-all hover:text-slate-600 hover:pl-4"
                : isActive
                ? "active-link"
                : "flex items-center text-slate-500 pl-3 text-sm gap-x-2 font-[500] hover:text-slate-600 hover:pl-4 transform transition-transform duration-300 ease-in-out "
            }
            onClick={onClick}
          >
            <div className="flex items-center gap-x-2 py-4">
              <Icon size={30} />
            </div>
            {isOpen && <span className="transition-all">{label}</span>}
          </NavLink>
        </TooltipTrigger>
        {!isOpen && <TooltipContent side="right">{label}</TooltipContent>}
      </Tooltip>
    </TooltipProvider>
  );
}

export default SidebarItems;
