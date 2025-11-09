"use client";

import { useCartStore } from "@/app/store/cart-store"; 
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { toast } from "sonner";

export default function CheckoutPage() {
  const { items, clearCart } = useCartStore();
  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  const handleCheckout = async () => {
    if (items.length === 0) return toast.error("Your cart is empty");

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      });

      const data = await res.json();
      if (data.url) {
        clearCart();
        window.location.href = data.url;
      } else {
        toast.error("Failed to start checkout");
      }
    } catch {
      toast.error("Something went wrong during checkout");
    }
  };

  return (
    <section className="min-h-screen flex flex-col md:flex-row items-start justify-between px-4 md:px-12 py-12">
      <div className="flex-1">
        <h1 className="text-3xl font-bold mb-6">🧾 Checkout Summary</h1>

        {items.length === 0 ? (
          <p className="text-gray-500">Your cart is empty.</p>
        ) : (
          <div className="space-y-5">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between border-b border-gray-200 pb-4"
              >
                <div className="flex items-center gap-4">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={80}
                    height={80}
                    className="rounded-md object-cover"
                  />
                  <div>
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-sm text-gray-500">
                      ${item.price} × {item.quantity}
                    </p>
                  </div>
                </div>
                <p className="font-semibold">${item.price * item.quantity}</p>
              </div>
            ))}
          </div>
        )}

        {items.length > 0 && (
          <div className="mt-8">
            <p className="text-xl font-bold">Total: ${total.toFixed(2)}</p>
            <Button
              onClick={handleCheckout}
              className="mt-6 w-full md:w-1/3 bg-blue-600 hover:bg-blue-700"
            >
              Pay with Stripe
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
