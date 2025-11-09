"use client";

import { DashboardSidebar } from "./DashboardSidebar";
import { DashboardHeader } from "./DashboardHeader";

interface LayoutProps {
  children: React.ReactNode;
  role: "user" | "admin";
}

export function DashboardLayoutWrapper({ children, role }: LayoutProps) {
  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-neutral-950 text-gray-900 dark:text-gray-100">
      <DashboardSidebar role={role} />
      <div className="flex-1 flex flex-col">
        <DashboardHeader />
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
