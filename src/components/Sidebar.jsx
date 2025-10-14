import {
  ChevronLeft,
  ChevronRight,
  Gamepad2,
  House,
  LockIcon,
  LogOutIcon,
  NfcIcon,
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
      icon: NfcIcon,
      label: "Mes cartes NFC",
      href: "/mes-cartes",
    },
    {
      icon: Gamepad2,
      label: "Paramétrage mini-jeu",
      href: "/mini-jeu",
    },
  ];
  let isAdmin = null;
  if (session) {
    const jwt = jwtDecode(session.access_token);
    isAdmin = jwt.user_role === "admin";
  }

  return (
    <div className="h-full border-r rounded-r-xl py-3 min-w-[80px] items-center flex flex-col overflow-y-auto bg-slate-50 shadow-sm">
      <Link to={"/"} className="pb-4 px-1 w-full">
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
            onClick={() => {
              setIsOpen(false);
              console.log(isOpen);
            }}
          />
        )}
      </div>
      <div className="flex flex-col w-full">
        <SidebarItems
          label="Se déconnecter"
          icon={LogOutIcon}
          isOpen={isOpen}
          href={null}
          onClick={() => supabase.auth.signOut()}
        />
      </div>
      <div className="flex flex-col w-full h-full">
        <div className="mt-auto flex w-full items-center justify-end font-semibold text-l transition-all  hover:pr-2">
          <button type="button" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <ChevronLeft /> : <ChevronRight />}
          </button>
        </div>
      </div>
    </div>
  );
}
