"use client";

import React, { useState } from "react";
import Sidebar from "../ui/Sidebar";
import Header from "../ui/Header";
import { useIsMobile } from "@/hooks/useIsMobile";
import { Outlet } from "react-router";

const DashboardLayout: React.FC = () => {
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);
  const [profileOpen, setProfileOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar
        isMobile={isMobile}
        sidebarOpen={sidebarOpen}
        closeSidebar={closeSidebar}
      />

      {isMobile && sidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-10"
          onClick={closeSidebar}
        />
      )}

      <div
        className="flex-1 flex flex-col transition-all duration-200 ease-in-out"
        style={{ marginLeft: sidebarOpen && !isMobile ? "16rem" : "0" }}
      >
        <Header
          sidebarOpen={sidebarOpen}
          toggleSidebar={toggleSidebar}
          profileOpen={profileOpen}
          setProfileOpen={setProfileOpen}
        />

        <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
