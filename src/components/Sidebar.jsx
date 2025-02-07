import {
  ChevronLeft,
  ChevronRight,
  House,
  Layout,
  LayoutList,
  LockIcon,
  LogOut,
  MapPinHouse,
  Rotate3D,
} from "lucide-react";
import { supabase } from "../utils/supabaseClient";
import { Logo } from "./Logo";
import { Link } from "react-router-dom";
import { useSession } from "../utils/useSession";
import { jwtDecode } from "jwt-decode";
import SidebarItems from "./SidebarItems";

export default function Sidebar({ isOpen, setIsOpen }) {
  const session = useSession();

  const Routes = [
    {
      icon: House,
      label: "Accueil",
      href: "/",
    },
    {
      icon: LayoutList,
      label: "Détails par zone",
      href: "/zone",
    },
    {
      icon: Rotate3D,
      label: "Vue 3D",
      href: "/3d-view",
    },
    {
      icon: MapPinHouse,
      label: "Vue drone",
      href: "/vue-drone",
    },
    {
      icon: Layout,
      label: "Vue intérieure",
      href: "/vue-interieure",
    },
  ];
  let isAdmin = null;
  if (session) {
    const jwt = jwtDecode(session.access_token);
    isAdmin = jwt.user_role === "admin";
  }

  return (
    <div className="h-full border-r rounded-r-xl py-3 min-w-[80px] items-center flex flex-col overflow-y-auto bg-slate-50 shadow-sm">
      <Link to={"/"} className="pb-4 px-3 w-full">
        <Logo isOpen={isOpen} />
      </Link>

      <div className="flex flex-col w-full pb-3">
        {Routes.map((route) => (
          <SidebarItems
            key={route.href}
            href={route.href}
            icon={route.icon}
            label={route.label}
            isOpen={isOpen}
          />
        ))}
      </div>
      <div className="h-[1px] bg-slate-200 mb-3 w-full"></div>
      <div className="flex flex-col w-full">
        {isAdmin && (
          <SidebarItems
            label="Admin"
            icon={LockIcon}
            href="/admin"
            isOpen={isOpen}
          />
        )}
      </div>
      <div className="flex flex-col w-full h-full">
        <button
          type="button"
          onClick={() => supabase.auth.signOut()}
          className="flex items-center text-red-500 pl-3 gap-x-2 font-[500] transition-all  hover:bg-gray-200/80"
        >
          <div className="flex items-center gap-x-2 py-4">
            <LogOut size={30} />
            {isOpen && <p>Se déconnecter</p>}
          </div>
        </button>
        <div className="mt-auto flex w-full items-center justify-end font-semibold text-l transition-all  hover:pr-2">
          <button type="button" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <ChevronLeft /> : <ChevronRight />}
          </button>
        </div>
      </div>
    </div>
  );
}
