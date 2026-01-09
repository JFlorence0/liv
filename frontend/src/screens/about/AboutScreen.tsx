"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";

export default function AboutScreen() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div
        className="relative overflow-hidden m-0 p-0"
        style={{ height: "70vh", minHeight: "400px" }}
      >
        <Header
          variant="default"
          loginText="Login"
          logoImageStyle={{ height: 70, marginTop: 15 }}
          navRight={{}}
        />

        <div className="absolute inset-0 w-full h-full -z-10">
          <Image
            src="/about/about-v3.jpg"
            alt="About Liv Background"
            fill
            className="object-cover"
            style={{
              objectPosition: "center 80%",
              transform: `translateY(${scrollY * 0.5}px)`,
            }}
            priority
            quality={75}
            sizes="100vw"
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
          />
          <style jsx>{`
            @media (max-width: 768px) {
              :global(.object-cover) {
                object-position: center center !important;
              }
            }
          `}</style>
        </div>

        <div
          className="absolute inset-0 flex items-start justify-center z-10"
          style={{ top: "70%" }}
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white">
            About Liv
          </h1>
        </div>
      </div>

      <div className="bg-[#7FB5A8] py-12 px-4 sm:px-6 lg:px-8 m-0">
        <div className="max-w-7xl mx-auto space-y-12 text-white">
          <section>
            <h2 className="text-3xl font-bold mb-4">The Story</h2>
            <p className="text-lg leading-relaxed">
              Liv is the brainchild of entrepreneurs and longevity enthusiasts
              Roger Jackson (CEO) and Mark Drury Taylor (CCO). They discovered a
              critical insight that changed everything: life extension is 99%
              about lifestyle choices. Not expensive treatments or breakthrough
              technologies. Just the daily decisions we make, stacked up over
              years.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-4">Science</h2>
            <p className="text-lg leading-relaxed">
              The science was clear, but the execution was the problem. People
              knew they should exercise more, eat better, sleep well. But
              knowing isn't doing. And doing once isn't transforming your
              biology.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-4">Mission</h2>
            <p className="text-lg leading-relaxed">
              Their mission became crystal clear: help people understand that
              longevity isn't about one big change. It's about hundreds of
              small, positive daily habits that compound over decades.
            </p>
          </section>
        </div>
      </div>

      <Footer />
    </>
  );
}
