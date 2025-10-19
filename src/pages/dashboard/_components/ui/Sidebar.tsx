import React, { useState } from "react";
import { Link } from "react-router";
import {
  Home,
  User,
  CreditCard,
  ChevronLeft,
  BookText,
  House,
  ChevronDown,
  Wallet,
} from "lucide-react";
import { schoolLogo } from "@/assets";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface SidebarProps {
  isMobile: boolean;
  sidebarOpen: boolean;
  closeSidebar: () => void;
}

const feesItems = [
  {
    name: "Payment",
    href: "/dashboard/fees/payment",
  },
  {
    name: "History",
    href: "/dashboard/fees/history",
  },
];

const Sidebar: React.FC<SidebarProps> = ({
  isMobile,
  sidebarOpen,
  closeSidebar,
}) => {
  const [feesOpen, setFeesOpen] = useState(false);

  const navLinks = [
    {
      name: "Dashboard",
      icon: <Home className="w-4 h-4" />,
      href: "/dashboard",
    },
    {
      name: "Profile",
      icon: <User className="w-4 h-4" />,
      href: "/dashboard/profile",
    },
    {
      name: "Acceptance Fees",
      icon: <CreditCard className="w-4 h-4" />,
      href: "acceptance-fee",
    },
    {
      name: "Hostels",
      icon: <House className="w-4 h-4" />,
      href: "hostels",
    },
    {
      name: "Results",
      icon: <BookText className="w-4 h-4" />,
      href: "results",
    },
  ];

  return (
    <div
      className={`fixed z-20 inset-y-0 left-0 transform ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full md:-translate-x-64"
      } transition-transform duration-200 ease-in-out bg-white border-r w-64 p-4 flex flex-col`}
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <img src={schoolLogo} alt="Logo" className="h-16 w-16 mr-2" />
          <span className="text-xl font-bold">TMIT</span>
        </div>
        {!isMobile && (
          <button
            onClick={closeSidebar}
            className="text-gray-600 hover:text-gray-800 cursor-pointer"
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
            onClick={() => closeSidebar()}
            className="flex items-center px-3 py-2 text-gray-700 hover:bg-gray-100 rounded"
          >
            {link.icon}
            <span className="ml-3">{link.name}</span>
          </Link>
        ))}

        <Collapsible open={feesOpen} onOpenChange={setFeesOpen}>
          <CollapsibleTrigger className="flex items-center justify-between w-full px-3 py-2 text-gray-700 hover:bg-gray-100 rounded text-[14px] cursor-pointer">
            <div className="flex items-center">
              <Wallet className="w-4 h-4" />
              <span className="ml-3">Fees</span>
            </div>
            <ChevronDown
              className={`w-4 h-4 transition-transform ${
                feesOpen ? "rotate-180" : ""
              }`}
            />
          </CollapsibleTrigger>
          <CollapsibleContent className="pl-4 space-y-1 mt-1">
            {feesItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="flex items-center px-3 py-2 text-gray-600 hover:bg-gray-100 rounded text-[13px]"
                onClick={() => isMobile && closeSidebar()}
              >
                <span className="ml-6">{item.name}</span>
              </Link>
            ))}
          </CollapsibleContent>
        </Collapsible>
      </nav>
    </div>
  );
};

export default Sidebar;
