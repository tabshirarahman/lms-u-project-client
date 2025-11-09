"use client";

import { PRODUCTS } from "@/data/products.data";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";

export default function ProductDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const product = PRODUCTS.find((p) => p.id === params.id);

  if (!product) return <p>Product not found</p>;

  const handleCheckout = async () => {
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: [{ name: product.name, price: product.price, quantity: 1 }],
        }),
      });

      const data = await res.json();
      if (data.url) {
        router.push(data.url);
      }
    } catch {
      toast.error("Checkout failed.");
    }
  };

  return (
    <section className="max-w-5xl mx-auto py-12 px-4 grid md:grid-cols-2 gap-10">
      <Image
        src={product.image}
        alt={product.name}
        width={500}
        height={400}
        className="rounded-lg shadow-md object-cover"
      />
      <div>
        <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
        <p className="capitalize text-gray-500 mb-2">{product.type}</p>
        <p className="text-2xl font-semibold mb-6">${product.price}</p>
        <Button onClick={handleCheckout} className="w-full text-white bg-blue-600 hover:bg-blue-700">
          Checkout with Stripe
        </Button>
      </div>
    </section>
  );
}
