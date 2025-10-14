import { Link } from "react-router-dom";
import MobileMenu from "./MobileMenu";

function Navbar({ data }) {
  return (
    <div className="p-4 z-50 border-b h-full font-semibold flex gap-5 bg-slate-50 shadow-sm justify-between md:justify-end items-center">
      <MobileMenu data={data} className="justify-start" />

      <div className="relative">
        <Link to="/account">
          <img
            src="avatar.png"
            alt="Avatar"
            className="rounded-full border-[3px] border-emerald-400 object-contain"
            style={{ width: "50px", height: "50px" }}
          />
        </Link>
        <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-400 transform translate-x-[-20%] translate-y-[-90%]">
          <span className="inset-0 absolute rounded-full bg-emerald-400 animate-ping"></span>
        </span>
      </div>
    </div>
  );
}

export default Navbar;
