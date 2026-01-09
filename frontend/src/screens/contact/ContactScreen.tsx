"use client";

import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";

const emailAddress = "roger@go-liv.com";

export default function ContactScreen() {
  const handleEmailClick = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(emailAddress).catch(() => {
        window.location.href = `mailto:${emailAddress}`;
      });
      return;
    }
    window.location.href = `mailto:${emailAddress}`;
  };

  return (
    <div className="min-h-screen bg-white">
      <Header theme="dark" />
      <div className="lg:hidden">
        <div className="px-6 md:px-10 pt-32">
          <div className="max-w-lg">
            <h1 className="text-[24px] md:text-[28px] font-bold text-[#101010] mb-6 md:mb-8">
              Contact
            </h1>

            <div className="space-y-6">
              <div>
                <p className="text-[14px] text-[#666] mb-2 uppercase tracking-wide">
                  Email
                </p>
                <button
                  onClick={handleEmailClick}
                  className="text-[16px] md:text-[18px] text-[#000000] hover:text-[#4ade80] transition-colors underline-offset-2 hover:underline focus:outline-none focus:ring-2 focus:ring-[#4ade80] focus:ring-opacity-50 rounded-md px-2 py-1"
                >
                  {emailAddress}
                </button>
              </div>

              <div className="mt-12 pt-6 border-t border-gray-100">
                <p className="text-[14px] text-[#666] leading-relaxed">
                  We'd love to hear from you. Send us a message and we'll
                  respond as soon as possible.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="hidden lg:block">
        <div className="max-w-4xl mx-auto px-8 py-16">
          <div className="max-w-2xl">
            <h1 className="text-[36px] lg:text-[42px] font-bold text-[#101010] mb-8 lg:mb-12">
              Contact
            </h1>

            <div className="space-y-8">
              <div>
                <p className="text-[14px] text-[#666] mb-3 uppercase tracking-wide">
                  Email
                </p>
                <button
                  onClick={handleEmailClick}
                  className="text-[18px] lg:text-[20px] text-[#000000] hover:text-[#4ade80] transition-colors underline-offset-4 hover:underline focus:outline-none focus:ring-2 focus:ring-[#4ade80] focus:ring-opacity-50 rounded-md px-2 py-1"
                >
                  {emailAddress}
                </button>
              </div>

              <div className="mt-16 pt-8 border-t border-gray-100">
                <p className="text-[16px] text-[#666] leading-relaxed max-w-lg">
                  We'd love to hear from you. Send us a message and we'll respond
                  as soon as possible.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
