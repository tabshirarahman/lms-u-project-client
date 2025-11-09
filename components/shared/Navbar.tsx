"use client";

import { useState } from "react";
import Link from "next/link";
import { ShoppingCart, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/app/store/cart-store"; 

export function Navbar() {
  const [open, setOpen] = useState(false);
  const cartItems = useCartStore((s) => s.items);
  const totalCount = cartItems.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-neutral-950 border-b border-gray-100 dark:border-neutral-800">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-4">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-blue-600">
          LMS<span className="text-neutral-700 dark:text-gray-300">Team</span>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-8 font-medium">
          <Link href="/" className="hover:text-blue-600 transition">Home</Link>
          <Link href="/courses" className="hover:text-blue-600 transition">Courses</Link>
          <Link href="/about" className="hover:text-blue-600 transition">About</Link>
          <Link href="/contact" className="hover:text-blue-600 transition">Contact</Link>
        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          <Link href="/checkout" className="relative">
            <ShoppingCart size={22} />
            {totalCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                {totalCount}
              </span>
            )}
                  </Link>
                  

                     {/* Sign In Button */}
          <Link href="/login">
            <Button variant="default" className="hidden md:inline-flex bg-blue-600 hover:bg-blue-700 text-white">
              Sign In
            </Button>
          </Link>

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {open && (
        <div className="md:hidden bg-white dark:bg-neutral-950 border-t border-gray-100 dark:border-neutral-800">
          <nav className="flex flex-col px-4 py-3 space-y-3 font-medium">
            <Link href="/" onClick={() => setOpen(false)}>Home</Link>
            <Link href="/products" onClick={() => setOpen(false)}>Products</Link>
            <Link href="/about" onClick={() => setOpen(false)}>About</Link>
                      <Link href="/contact" onClick={() => setOpen(false)}>Contact</Link>
                         <Link href="/login" onClick={() => setOpen(false)}>
              <Button className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white">
                Sign In
              </Button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
