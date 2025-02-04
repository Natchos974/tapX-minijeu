import { LockIcon, LogOut } from "lucide-react";
import { supabase } from "../utils/supabaseClient";
import { Logo } from "./Logo";
import SidebarRoutes from "./SidebarRoutes";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="h-full border-r pb-3 items-center flex flex-col overflow-y-auto bg-slate-50 shadow-sm">
      <Link className="p-6" to={"/"}>
        <Logo />
      </Link>
      <div className="flex flex-col w-full flex-grow">
        <SidebarRoutes />
      </div>
      <Link
        className="p-3 border rounded-lg border-slate-200 mb-3 hover:bg-zinc-100"
        to={"/admin"}
      >
        <LockIcon />
      </Link>
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
