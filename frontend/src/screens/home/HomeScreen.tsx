"use client";

import { useCallback, useEffect, useState } from "react";
import type { MouseEvent } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import dynamic from "next/dynamic";
import Header from "@/components/common/Header";
import PillarsSection from "@/components/pillars/Section";

const Footer = dynamic(() => import("@/components/common/Footer"), {
  ssr: false,
  loading: () => null,
});

const imgRectangle116 = "/bg-1.jpg";
const imgRectangle140 = "/Get-your-first-nudge-v3.jpg";

const preloadCriticalImages = () => {
  if (typeof window !== "undefined") {
    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "image";
    link.href = imgRectangle116;
    link.imageSrcset = `/_next/image?url=${encodeURIComponent(
      imgRectangle116
    )}&w=640&q=60 640w, /_next/image?url=${encodeURIComponent(
      imgRectangle116
    )}&w=1080&q=60 1080w, /_next/image?url=${encodeURIComponent(
      imgRectangle116
    )}&w=1920&q=60 1920w`;
    document.head.appendChild(link);
  }
};

export default function HomePage() {
  const router = useRouter();
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [loadVideo, setLoadVideo] = useState(false);
  const [showFallbackImage, setShowFallbackImage] = useState(true);
  const [authCheckComplete] = useState(true);
  const isAuthenticated = false;

  useEffect(() => {
    preloadCriticalImages();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoadVideo(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const handleCtaClick = useCallback(
    (e: MouseEvent) => {
      e.preventDefault();
      if (isAuthenticated) {
        router.push("/todays-nudge");
      } else {
        router.push("/login");
      }
    },
    [isAuthenticated, router]
  );

  const renderCTAButton = (className: string) => {
    return (
      <button className={className} onClick={handleCtaClick} type="button">
        {!authCheckComplete ? (
          <svg
            className="animate-spin h-5 w-5 mx-auto"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        ) : (
          (isAuthenticated ? "Today's Nudge" : "Get Started, It's Free")
        )}
      </button>
    );
  };

  return (
    <>
      <div className="relative w-full min-h-screen flex flex-col overflow-hidden">
        <Header variant="default" loginText="Login" logoImageStyle={{}} />

        <div className="absolute top-0 left-0 w-full h-full -z-10">
          <Image
            src={imgRectangle116}
            alt="LIV Hero Background"
            fill
            className={`object-cover object-center transition-opacity duration-500 ${
              showFallbackImage ? "opacity-100" : "opacity-0"
            }`}
            priority
            quality={60}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, (max-width: 1920px) 100vw, 1920px"
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
          />

          {loadVideo && (
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="none"
              onLoadedData={() => {
                setVideoLoaded(true);
                setTimeout(() => setShowFallbackImage(false), 100);
              }}
              onError={() => {
                setShowFallbackImage(true);
                setVideoLoaded(false);
              }}
              className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-700 ${
                videoLoaded ? "opacity-100" : "opacity-0"
              }`}
            >
              <source src="/home-video.mp4" type="video/mp4" />
            </video>
          )}
        </div>

        <main className="flex flex-col items-center w-full absolute bottom-0">
          <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-medium mb-20 px-4 md:px-36 2xl:px-[150px] text-center md:whitespace-nowrap lg:whitespace-nowrap xl:whitespace-nowrap">
            I'm Liv, I'll help you extend your life
          </h1>
          <div className="w-full bg-[#F08A7ECC] py-6 text-center transition-all duration-[0.8s] ease-[cubic-bezier(0.4,0,0.2,1)]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <p className="text-white text-lg md:text-xl lg:text-2xl mx-auto max-w-3xl">
                Daily longevity coaching.
                <br />
                Grounded in science
                <br />
                Tailored to your biology
              </p>
            </div>
          </div>

          <div className="w-full bg-[#F08A7ECC] pb-10 text-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {renderCTAButton(
                "bg-white text-black font-medium py-3 px-8 rounded-md text-lg transition-all duration-300 ease-in-out hover:-translate-y-0.5 hover:shadow-[0_8px_25px_rgba(0,0,0,0.2)] cursor-pointer"
              )}
            </div>
          </div>
        </main>
      </div>

      <section className="rectangle-107-section flex flex-col bg-[#578E7AA8]">
        <PillarsSection bgColor="" showTitle={true} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-6">
          <h2 className="text-center text-[#FFFBFB] text-xl md:text-2xl lg:text-3xl font-medium mb-6">
            Seven Pillars of Longevity, all essential. We'll spotlight one per
            day, stacking lifestyle habits proven to lengthen your life
          </h2>
        </div>
      </section>

      <section className="w-full relative min-h-[60vh] md:min-h-[65vh] lg:h-screen">
        <Image
          src="/How-It-Works.jpg"
          alt="How It Works Background"
          fill
          className="object-cover object-center"
          priority={false}
          loading="lazy"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 1920px"
          quality={70}
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
        />
        <div className="absolute inset-0 flex items-end justify-center z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex justify-center pb-[12.5vh] lg:pb-[8vh]">
            <h2 className="text-[35px] md:text-[52px] lg:text-[59px] xl:text-[64px] font-bold text-white text-center drop-shadow-lg">
              How It Works
            </h2>
          </div>
        </div>
      </section>

      <section className="w-full bg-[#F08A7E] py-12 md:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-white space-y-6 md:space-y-8">
            <div className="text-lg md:text-xl lg:text-2xl">
              <span className="font-medium">
                1) Complete your longevity profile (once only)
              </span>
            </div>

            <div className="text-lg md:text-xl lg:text-2xl">
              <span className="font-medium">
                2) Each morning, we send a link to your personal Nudge (choose
                SMS or email)
              </span>
            </div>

            <div className="text-lg md:text-xl lg:text-2xl">
              <span className="font-medium">
                3) Open it to get a 2 minutes of custom coaching on today's
                longevity pillar
              </span>
            </div>

            <div className="mt-8 md:mt-10 lg:mt-12 space-y-2 md:space-y-3">
              <div className="flex items-center text-base md:text-lg lg:text-xl">
                <span className="w-3 h-3 bg-white rounded-full mr-4 flex-shrink-0"></span>
                <span>
                  <strong>MONDAY:</strong> Movement & Exercise
                </span>
              </div>
              <div className="flex items-center text-base md:text-lg lg:text-xl">
                <span className="w-3 h-3 bg-white rounded-full mr-4 flex-shrink-0"></span>
                <span>
                  <strong>TUESDAY:</strong> Food & Nutrition
                </span>
              </div>
              <div className="flex items-center text-base md:text-lg lg:text-xl">
                <span className="w-3 h-3 bg-white rounded-full mr-4 flex-shrink-0"></span>
                <span>
                  <strong>WEDNESDAY:</strong> Mental Fitness
                </span>
              </div>
              <div className="flex items-center text-base md:text-lg lg:text-xl">
                <span className="w-3 h-3 bg-white rounded-full mr-4 flex-shrink-0"></span>
                <span>
                  <strong>THURSDAY:</strong> Anti-aging drugs & Supplements
                </span>
              </div>
              <div className="flex items-center text-base md:text-lg lg:text-xl">
                <span className="w-3 h-3 bg-white rounded-full mr-4 flex-shrink-0"></span>
                <span>
                  <strong>FRIDAY:</strong> Preventive Healthcare
                </span>
              </div>
              <div className="flex items-center text-base md:text-lg lg:text-xl">
                <span className="w-3 h-3 bg-white rounded-full mr-4 flex-shrink-0"></span>
                <span>
                  <strong>SATURDAY:</strong> Sexual Health
                </span>
              </div>
              <div className="flex items-center text-base md:text-lg lg:text-xl">
                <span className="w-3 h-3 bg-white rounded-full mr-4 flex-shrink-0"></span>
                <span>
                  <strong>SUNDAY:</strong> Sleep & Recovery
                </span>
              </div>
            </div>

            <div className="text-lg md:text-xl lg:text-2xl mt-8 md:mt-10 lg:mt-12">
              <span className="font-medium">
                4) Take the optional Challenge to turn knowledge into permanent
                habits.
              </span>
            </div>

            <div className="text-lg md:text-xl lg:text-2xl mt-8 md:mt-10 lg:mt-12 italic">
              <span>
                The more you engage, the more Liv learns. The more Liv learns,
                the longer you live.
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full relative min-h-[60vh] md:min-h-[75vh] lg:min-h-[85vh]">
        <Image
          src={imgRectangle140}
          alt="Get Your First Nudge Background"
          fill
          className="object-cover object-center"
          priority={false}
          loading="lazy"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 1920px"
          quality={65}
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
        />

        <div className="absolute inset-0 flex items-center justify-start">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="flex items-center justify-start w-full">
              <div className="text-white text-center p-6 md:p-8 lg:p-10 xl:p-12 w-[50%] lg:w-[30%]">
                <h2 className="text-[22px] sm:text-[26px] md:text-[36px] lg:text-[48px] xl:text-[60px] font-bold leading-tight">
                  Get Your First Nudge
                </h2>

                <p className="mt-4 text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl leading-relaxed opacity-95">
                  Set your goal age, reckless optimism encouraged. Start now,
                  tomorrow can send a thank you
                </p>

                <div className="mt-6">
                  <button
                    onClick={handleCtaClick}
                    type="button"
                    className="bg-black text-white rounded-md py-2 px-6 md:py-3 md:px-8 text-base md:text-lg lg:text-xl xl:text-2xl font-semibold min-w-[140px] shadow-md hover:bg-[#333] hover:-translate-y-0.5 transition"
                  >
                    {isAuthenticated ? "Today's Nudge" : "Get Started"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="w-full">
        <Footer />
      </div>
    </>
  );
}
