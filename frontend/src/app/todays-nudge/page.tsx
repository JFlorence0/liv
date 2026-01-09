"use client";

import Header from "@/components/common/Header";

export default function TodaysNudgePage() {
  return (
    <div className="bg-[#F18B82A8] h-screen w-full flex flex-col relative overflow-hidden justify-start">
      <div className="flex-shrink-0">
        <Header variant="default" />
      </div>

      <div className="flex justify-center items-center flex-1 px-4 pt-16 pb-8 overflow-hidden relative">
        <div
          className="absolute left-1/2 transform -translate-x-1/2 z-20 rounded-full overflow-hidden shadow-[0_2px_10px_rgba(0,0,0,0.1)]"
          style={{
            top: "clamp(0px, calc(12vh - 0.75 * clamp(50px, 8vw, 110px)), 100px)",
            width: "clamp(140px, 18vw, 200px)",
            height: "clamp(140px, 18vw, 200px)",
          }}
        >
          <img
            src="/female-circle.svg"
            alt="User Avatar"
            className="w-full h-full object-cover object-[70%_center]"
          />
        </div>

        <div
          className="email-preference-card bg-[#0A744E] border-[12px] border-white rounded-[32px] shadow-[0_4px_20px_rgba(0,0,0,0.1)] flex flex-col items-center relative text-center mx-auto box-border overflow-hidden w-[95vw] h-[75vh] max-w-[800px] max-h-[700px] min-w-[320px] min-h-[400px]"
          style={{
            padding: "clamp(1.5rem, 3vh, 3rem)",
            paddingTop: "clamp(150px, 10vh, 120px)",
            paddingBottom: ".05rem",
          }}
        >
          <h2 className="font-semibold text-white text-center mb-6 text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-3xl leading-tight flex-shrink-0">
            Today = Movement
          </h2>

          <div
            className="flex flex-col items-center flex-1 w-full overflow-y-auto"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            <style jsx>{`
              div::-webkit-scrollbar {
                display: none;
              }
            `}</style>
            <p className="text-white text-left px-4 text-base sm:text-lg md:text-xl lg:text-2xl xl:text-xl leading-relaxed w-full">
              Today’s nudge will appear here. We’re wiring the personalization
              flow now, but the UI is ready.
            </p>
          </div>

          <div
            className="w-full flex-shrink-0 flex flex-col items-center justify-center gap-1 p-2 mb-2 mt-2"
            style={{ minHeight: "30px" }}
          >
            <button
              type="button"
              className="w-full max-w-[280px] rounded-2xl bg-white border-2 border-[#0A744E] text-[#0A744E] font-bold text-base sm:text-lg py-3 px-6 flex items-center justify-center tracking-wide shadow-md opacity-95 hover:opacity-100 hover:shadow-lg transition-all duration-200"
              style={{ letterSpacing: "0.5px" }}
            >
              Your Challenge Today?
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
