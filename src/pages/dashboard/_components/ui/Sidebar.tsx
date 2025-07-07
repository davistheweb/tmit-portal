import React from "react";
import { Link } from "react-router";
import { Home, User, CreditCard, LogOut, ChevronLeft } from "lucide-react";

interface SidebarProps {
  isMobile: boolean;
  sidebarOpen: boolean;
  closeSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  isMobile,
  sidebarOpen,
  closeSidebar,
}) => {
  const navLinks = [
    { name: "Dashboard", icon: <Home className="w-4 h-4" />, href: "/dashboard" },
    { name: "Profile", icon: <User className="w-4 h-4" />, href: "/dashboard/profile" },
    { name: "Fees", icon: <CreditCard className="w-4 h-4" />, href: "/fees" },
    { name: "Sign Out", icon: <LogOut className="w-4 h-4" />, href: "/logout" },
  ];

  return (
    <div
      className={`fixed z-20 inset-y-0 left-0 transform ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full md:-translate-x-64"
      } transition-transform duration-200 ease-in-out bg-white border-r w-64 p-4 flex flex-col`}
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <img src="/your-logo.png" alt="Logo" className="h-10 w-10 mr-2" />
          <span className="text-xl font-bold">FUTO Portal</span>
        </div>
        {!isMobile && (
          <button
            onClick={closeSidebar}
            className="text-gray-600 hover:text-gray-800"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        )}
      </div>

      <nav className="flex-1 space-y-2">
        {navLinks.map((link) => (
          <Link
            key={link.name}
            to={link.href}
            className="flex items-center px-3 py-2 text-gray-700 hover:bg-gray-100 rounded"
          >
            {link.icon}
            <span className="ml-3">{link.name}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
