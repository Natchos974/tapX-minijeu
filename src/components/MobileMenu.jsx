import { Menu, X } from "lucide-react";
import { useState } from "react";
import { NavLink } from "react-router-dom";

function MobileMenu() {
  const studentRoutes = [
    {
      label: "Mes cours",
      href: "/",
    },
    {
      label: "Catalogue de cours",
      href: "/search",
    },
  ];
  const [navOpen, setNavOpen] = useState(false);
  return (
    <button className="md:hidden" onClick={() => setNavOpen((prev) => !prev)}>
      <span>{navOpen ? <X /> : <Menu />}</span>
      <div className={"navbar " + (navOpen ? "active " : "")}>
        {studentRoutes.map((item) => (
          <NavLink
            key={item.label}
            to={item.href}
            className={({ isActive, isPending }) =>
              isPending
                ? "pending-link"
                : isActive
                ? "active-link"
                : "flex items-center text-slate-500 text-lg pl-6 gap-x-2 font-[500] transition-all hover:text-slate-600"
            }
          >
            {item.label}
          </NavLink>
        ))}
      </div>
    </button>
  );
}

export default MobileMenu;
