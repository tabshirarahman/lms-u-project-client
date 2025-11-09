"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { sidebarItems } from "@/data/sidebarItems";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";

interface SidebarProps {
  role: "user" | "admin";
}

export function DashboardSidebar({ role }: SidebarProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const items = sidebarItems[role] || [];

  return (
    <>
      {/* Mobile toggle */}
      <div className="md:hidden p-4 border-b dark:border-neutral-800 flex justify-between items-center bg-white dark:bg-neutral-950">
        <h2 className="font-semibold text-lg capitalize">{role} Dashboard</h2>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setOpen(!open)}
          aria-label="Toggle sidebar"
        >
          {open ? <X /> : <Menu />}
        </Button>
      </div>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed md:static inset-y-0 left-0 w-64 bg-white dark:bg-neutral-900 border-r border-gray-100 dark:border-neutral-800 flex flex-col z-40 transition-transform duration-300",
          open ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        <div className="p-6">
          <h1 className="text-xl font-bold text-blue-600 mb-8">
            {role === "admin" ? "Admin Panel" : "My Learning"}
          </h1>

          <nav className="space-y-2">
            {items.map((item) => {
              const Icon = item.icon;
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-4 py-2 rounded-md text-sm font-medium transition",
                    active
                      ? "bg-blue-600 text-white"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-neutral-800"
                  )}
                  onClick={() => setOpen(false)}
                >
                  <Icon size={18} />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
      </aside>
    </>
  );
}
