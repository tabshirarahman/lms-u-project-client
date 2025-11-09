"use client";

import { useCartStore } from "@/app/store/cart-store"; 
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Trash2, Plus, Minus } from "lucide-react";
import Link from "next/link";

export function CartDrawer() {
  const { items, removeItem, increase, decrease, clearCart } = useCartStore();
  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <div className="fixed right-4 bottom-4 z-50 bg-white dark:bg-neutral-900 p-5 rounded-2xl shadow-xl w-80 border border-gray-100 dark:border-neutral-800">
      <h2 className="text-lg font-semibold mb-3">🛍️ Your Cart</h2>

      {items.length === 0 ? (
        <p className="text-sm text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="space-y-3 max-h-72 overflow-y-auto">
          {items.map((i) => (
            <div key={i.id} className="flex items-center gap-3">
              <Image
                src={i.image}
                alt={i.name}
                width={50}
                height={50}
                className="rounded-md object-cover"
              />
              <div className="flex-1">
                <p className="text-sm font-medium">{i.name}</p>
                <p className="text-xs text-gray-500">${i.price}</p>
                <div className="flex items-center gap-1 mt-1">
                  <Button size="icon" variant="ghost" onClick={() => decrease(i.id)}>
                    <Minus size={12} />
                  </Button>
                  <span className="text-xs">{i.quantity}</span>
                  <Button size="icon" variant="ghost" onClick={() => increase(i.id)}>
                    <Plus size={12} />
                  </Button>
                </div>
              </div>
              <Button size="icon" variant="ghost" onClick={() => removeItem(i.id)}>
                <Trash2 size={14} />
              </Button>
            </div>
          ))}
        </div>
      )}

      <div className="mt-4 border-t border-gray-200 dark:border-neutral-700 pt-3">
        <p className="font-semibold text-right mb-2">
          Total: ${total.toFixed(2)}
        </p>
        <div className="flex gap-2">
          <Button variant="destructive" className="flex-1" onClick={clearCart}>
            Clear
          </Button>
          <Link href="/checkout" className="flex-1">
            <Button className="w-full">Checkout</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
