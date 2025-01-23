import { LogOut } from "lucide-react";
import { supabase } from "../utils/supabaseClient";
import { Logo } from "./Logo";
import SidebarRoutes from "./SidebarRoutes";

export default function Sidebar() {
  return (
    <div className="h-full border-r pb-3 items-center flex flex-col overflow-y-auto bg-slate-50 shadow-sm">
      <div className="p-6">
        <Logo />
      </div>
      <div className="flex flex-col w-full flex-grow">
        <SidebarRoutes />
      </div>
      <button
        className="flex items-center justify-center text-red-500 border-red-500 border gap-2 font-semibold text-l w-12 hover:bg-zinc-100 h-11 hover:text-zinc-70 rounded-md"
        type="button"
        onClick={() => supabase.auth.signOut()}
      >
        <LogOut />
      </button>
    </div>
  );
}
