import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#fffbfb] w-full px-[60px] pt-20 pb-[60px] md:px-[30px] md:pt-[60px] md:pb-10 sm:px-5 sm:pt-10 sm:pb-[30px]">
      <div className="max-w-7xl mx-auto flex flex-col gap-[60px] md:gap-10 sm:gap-[30px]">
        <div className="flex flex-col items-start gap-6">
          <img
            src="/liv-logo-black.png"
            alt="LIV"
            className="h-20 w-auto object-contain md:h-[60px] sm:h-[50px]"
          />
        </div>

        <div className="flex flex-col gap-6 text-sm text-gray-400 font-medium -mt-2">
          <p>(c) 2025 Livspan, Inc.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-16">
          <div className="flex flex-col gap-4">
            <p className="text-xs tracking-[0.2em] uppercase text-gray-400 font-semibold">
              Company
            </p>
            <ul className="list-none p-0 m-0 flex flex-col gap-3">
              <li>
                <Link
                  href="/about"
                  className="text-base font-bold text-[#3f3f3f] no-underline transition-colors duration-300 leading-[1.4] hover:text-[#6b46c1] md:text-[15px] sm:text-sm font-['Inter','Satoshi_Variable','Satoshi','Satoshi-fallback',-apple-system,BlinkMacSystemFont,'Segoe_UI',Roboto,sans-serif]"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-base font-bold text-[#3f3f3f] no-underline transition-colors duration-300 leading-[1.4] hover:text-[#6b46c1] md:text-[15px] sm:text-sm font-['Inter','Satoshi_Variable','Satoshi','Satoshi-fallback',-apple-system,BlinkMacSystemFont,'Segoe_UI',Roboto,sans-serif]"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-base font-bold text-[#3f3f3f] no-underline transition-colors duration-300 leading-[1.4] hover:text-[#6b46c1] md:text-[15px] sm:text-sm font-['Inter','Satoshi_Variable','Satoshi','Satoshi-fallback',-apple-system,BlinkMacSystemFont,'Segoe_UI',Roboto,sans-serif]"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-4">
            <p className="text-xs tracking-[0.2em] uppercase text-gray-400 font-semibold">
              Legal
            </p>
            <ul className="list-none p-0 m-0 flex flex-col gap-3">
              <li>
                <Link
                  href="/terms-of-service"
                  className="text-base font-bold text-[#3f3f3f] no-underline transition-colors duration-300 leading-[1.4] hover:text-[#6b46c1] md:text-[15px] sm:text-sm font-['Inter','Satoshi_Variable','Satoshi','Satoshi-fallback',-apple-system,BlinkMacSystemFont,'Segoe_UI',Roboto,sans-serif]"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy-policy"
                  className="text-base font-bold text-[#3f3f3f] no-underline transition-colors duration-300 leading-[1.4] hover:text-[#6b46c1] md:text-[15px] sm:text-sm font-['Inter','Satoshi_Variable','Satoshi','Satoshi-fallback',-apple-system,BlinkMacSystemFont,'Segoe_UI',Roboto,sans-serif]"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-4">
            <p className="text-xs tracking-[0.2em] uppercase text-gray-400 font-semibold">
              Pillars
            </p>
            <ul className="list-none p-0 m-0 grid grid-cols-1 gap-3">
              <li>
                <Link
                  href="/pillars"
                  className="text-base font-bold text-[#3f3f3f] no-underline transition-colors duration-300 leading-[1.4] hover:text-[#6b46c1] md:text-[15px] sm:text-sm font-['Inter','Satoshi_Variable','Satoshi','Satoshi-fallback',-apple-system,BlinkMacSystemFont,'Segoe_UI',Roboto,sans-serif]"
                >
                  Seven Pillars
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
