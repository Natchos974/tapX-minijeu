import { NavLink } from "react-router-dom";

function SidebarItems({ href, icon: Icon, label, isOpen, onClick }) {
  return (
    <NavLink
      to={href}
      className={({ isActive, isPending }) =>
        isPending
          ? "pending-link"
          : isActive
          ? "active-link"
          : "flex items-center text-slate-500 pl-3 text-sm gap-x-2 font-[500] transition-all hover:text-slate-600 "
      }
      onClick={onClick}
    >
      <div className="flex items-center gap-x-2 py-4">
        <Icon size={30} />
      </div>
      {isOpen ? label : ""}
    </NavLink>
  );
}

export default SidebarItems;
