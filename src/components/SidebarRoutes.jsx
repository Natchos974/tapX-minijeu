import { Layout, Compass } from "lucide-react";
import SidebarItems from "./SidebarItems";

function SidebarRoutes() {
  const studentRoutes = [
    {
      icon: Layout,
      label: "Mes cours",
      href: "/",
    },
    {
      icon: Compass,
      label: "Catalogue de cours",
      href: "/search",
    },
  ];

  return (
    <div className="flex flex-col w-full">
      {studentRoutes.map((route) => (
        <SidebarItems
          key={route.href}
          href={route.href}
          icon={route.icon}
          label={route.label}
        />
      ))}
    </div>
  );
}

export default SidebarRoutes;
