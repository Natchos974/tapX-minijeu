import { Menu, X } from "lucide-react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { supabase } from "../utils/supabaseClient";

function MobileMenu() {
  const Routes = [
    {
      label: "Accueil",
      href: "/",
    },
    {
      label: "Mes cartes NFC",
      href: "/mes-cartes",
    },
    {
      label: "Mini-jeu",
      href: "/mini-jeu",
    },
  ];
  const [navOpen, setNavOpen] = useState(false);
  return (
    <button className="md:hidden" onClick={() => setNavOpen((prev) => !prev)}>
      <span>{navOpen ? <X /> : <Menu />}</span>
      <div className={"navbar " + (navOpen ? "active " : "")}>
        {Routes.map((item) => (
          <NavLink
            key={item.label}
            to={item.href}
            className={({ isActive, isPending }) =>
              isPending
                ? "pending-link"
                : isActive
                ? "active-link"
                : "flex items-center text-slate-500 text-base pl-6 gap-x-2 font-medium hover:text-slate-600"
            }
          >
            {item.label}
          </NavLink>
        ))}
        <NavLink
          key="deconnexion"
          href={null}
          onClick={() => supabase.auth.signOut()}
          className={
            "flex items-center text-slate-500 text-base pl-6 gap-x-2 font-medium hover:text-slate-600"
          }
        >
          Se déconnecter
        </NavLink>
      </div>
    </button>
  );
}

export default MobileMenu;
