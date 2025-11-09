import Link from "next/link";
import { Facebook, Instagram, Twitter, Github } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-neutral-900 mt-10 border-t border-gray-200 dark:border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 py-10 grid md:grid-cols-3 gap-8 text-sm text-gray-600 dark:text-gray-300">
        {/* Column 1 */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">
            About Us
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Lms Team is your one-stop store for premium tech products —
            from laptops to smartphones, we deliver quality and trust.
          </p>
        </div>

        {/* Column 2 */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">
            Quick Links
          </h3>
          <ul className="space-y-2">
            <li><Link href="/" className="hover:text-blue-600">Home</Link></li>
            <li><Link href="/products" className="hover:text-blue-600">Products</Link></li>
            <li><Link href="/about" className="hover:text-blue-600">About</Link></li>
            <li><Link href="/contact" className="hover:text-blue-600">Contact</Link></li>
          </ul>
        </div>

        {/* Column 3 */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">
            Follow Us
          </h3>
          <div className="flex items-center gap-4 text-gray-600 dark:text-gray-400">
            <Link href="https://facebook.com"><Facebook size={20} /></Link>
            <Link href="https://instagram.com"><Instagram size={20} /></Link>
            <Link href="https://twitter.com"><Twitter size={20} /></Link>
            <Link href="https://github.com"><Github size={20} /></Link>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-200 dark:border-neutral-800 py-4 text-center text-xs text-gray-500 dark:text-gray-400">
        © {new Date().getFullYear()} Lms Team — All Rights Reserved.
      </div>
    </footer>
  );
}
