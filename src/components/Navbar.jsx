import { Link } from "react-router-dom";
import MobileMenu from "./MobileMenu";
import { useEffect, useRef } from "react";

function Navbar({ data }) {
  const logoRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (event) => {
      const { left, top, width, height } =
        logoRef.current.getBoundingClientRect();
      const x = event.clientX - (left + width / 2);
      const y = event.clientY - (top + height / 2);

      logoRef.current.style.setProperty("--motion-translateX", `${x / 2}px`);
      logoRef.current.style.setProperty("--motion-translateY", `${y / 2}px`);
    };

    const handleMouseLeave = () => {
      logoRef.current.style.setProperty("--motion-translateX", "0px");
      logoRef.current.style.setProperty("--motion-translateY", "0px");
    };

    const logoElement = logoRef.current;
    logoElement.addEventListener("mousemove", handleMouseMove);
    logoElement.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      logoElement.removeEventListener("mousemove", handleMouseMove);
      logoElement.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div className="p-4 z-50 border-b h-full font-semibold flex gap-5 bg-white shadow-sm justify-between md:justify-end items-center">
      <MobileMenu data={data} className="justify-start" />
      <div
        ref={logoRef}
        className="transform transition-transform duration-100 ease-in-out"
        style={{
          transform: `translateX(var(--motion-translateX)) translateY(var(--motion-translateY))`,
        }}
      >
        <img width={28} height={28} alt="logo insta" src="/instaLogo.svg" />
      </div>
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
