import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

function SidebarItems({ href, icon: Icon, label }) {
  return (
    <NavLink
      to={href}
      className={({ isActive, isPending }) =>
        isPending
          ? "pending-link"
          : isActive
          ? "active-link"
          : "flex items-center text-slate-500 text-sm pl-6 gap-x-2 font-[500] transition-all hover:text-slate-600 hover:bg-gray-200/80"
      }
    >
      <div className="flex items-center gap-x-2 py-4">
        <Icon size={30} />
      </div>
      {label}
    </NavLink>
  );
}

SidebarItems.propTypes = {
  href: PropTypes.string.isRequired,
  icon: PropTypes.any,
  label: PropTypes.string.isRequired,
};

export default SidebarItems;
