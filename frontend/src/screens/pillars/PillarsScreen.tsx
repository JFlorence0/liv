"use client";

import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import { PillarsSection } from "@/components/pillars";

export default function PillarsScreen() {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#578E7AA8]">
      <Header />

      <main className="flex-grow">
        <PillarsSection bgColor="" showTitle={true} />
      </main>

      <Footer />
    </div>
  );
}
