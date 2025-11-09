"use client";

import { Bell, User } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export function DashboardHeader() {
  return (
    <header className="sticky top-0 z-20 bg-white dark:bg-neutral-950 border-b border-gray-100 dark:border-neutral-800 px-6 py-3 flex justify-between items-center">
      <h2 className="text-lg font-semibold">Welcome Back 👋</h2>
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon">
          <Bell className="text-gray-500" />
        </Button>
        <div className="flex items-center gap-2">
          <Image
            src="https://i.pravatar.cc/40"
            alt="User Avatar"
            width={36}
            height={36}
            className="rounded-full"
          />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            John Doe
          </span>
        </div>
      </div>
    </header>
  );
}
