import type React from "react";
import { Outlet } from "react-router";

export const Dashboard: React.FC = () => {
  return (
    <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
      <Outlet />
    </main>
  );
};
