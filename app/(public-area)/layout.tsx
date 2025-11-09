

import { Footer } from "@/components/shared/Footer";
import { Navbar } from "@/components/shared/Navbar";
import React from "react";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return  <main>

        <Navbar />

      

        <div className="max-w-[1408px] mx-auto">{children}</div>

        <Footer />
   

    </main>
}
