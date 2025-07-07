import React from "react";
import { Menu, X, Bell } from "lucide-react";
import ProfileDropdown from "./ProfileDropdown";

interface HeaderProps {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  profileOpen: boolean;
  setProfileOpen: (open: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({
  sidebarOpen,
  toggleSidebar,
  profileOpen,
  setProfileOpen,
}) => {
  return (
    <header className="flex items-center justify-between px-4 py-3 border-b bg-white shadow-sm relative">
      <button onClick={toggleSidebar} className="text-gray-700">
        {sidebarOpen ? <X /> : <Menu />}
      </button>

      <h1 className="text-lg font-semibold">Dashboard</h1>

      <div className="flex items-center gap-4">
        <button className="relative text-gray-700 hover:text-gray-900">
          <Bell className="w-5 h-5" />
          <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500"></span>
        </button>

        <div className="relative">
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="block rounded-full overflow-hidden border-2 border-gray-300 focus:outline-none"
          >
            <img
              src="/avatar.jpg"
              alt="User Avatar"
              className="h-8 w-8 object-cover"
            />
          </button>

          <ProfileDropdown open={profileOpen} setOpen={setProfileOpen} />
        </div>
      </div>
    </header>
  );
};

export default Header;
