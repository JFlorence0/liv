"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { CSSProperties } from "react";

interface HeaderProps {
  variant?: "default" | "desktop2";
  loginText?: string;
  logoStyle?: CSSProperties;
  logoImageStyle?: CSSProperties;
  navRight?: CSSProperties;
  askLiv?: boolean;
  theme?: "light" | "dark";
}

const Header: React.FC<HeaderProps> = ({
  variant = "default",
  loginText = "Login",
  logoStyle = {},
  logoImageStyle = {},
  navRight = {},
  askLiv = false,
  theme = "light",
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  const headerClass = variant === "desktop2" ? "desktop-2-header" : "header";
  const headerContentClass =
    variant === "desktop2" ? "desktop-2-header-content" : "header-content";
  const logoClass = variant === "desktop2" ? "desktop-2-logo" : "logo";
  const logoImageClass =
    variant === "desktop2" ? "desktop-2-logo-image" : "logo-image";
  const navRightClass =
    variant === "desktop2" ? "desktop-2-nav-right" : "nav-right";
  const loginTextClass =
    variant === "desktop2" ? "desktop-2-login-text" : "login-text";
  const menuToggleClass =
    variant === "desktop2" ? "desktop-2-menu-toggle" : "menu-toggle";
  const menuIconClass =
    variant === "desktop2" ? "desktop-2-menu-icon" : "menu-icon";

  const logo = theme === "light" ? "/liv-logo-1.svg" : "/liv-logo-black.svg";
  const textColor = theme === "light" ? "text-[#fff]" : "text-[#000]";
  const imgAlignRight =
    theme === "light" ? "/align-right-1.svg" : "/align-right-black.svg";

  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isMenuOpen]);

  return (
    <>
      <header className={headerClass}>
        <div className={headerContentClass}>
          <div
            className={logoClass}
            style={{ cursor: "pointer", ...logoStyle }}
            onClick={() => router.push("/")}
            role="button"
            tabIndex={0}
            aria-label="Go to homepage"
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                router.push("/");
              }
            }}
          >
            <Image
              src={logo}
              alt="LIV"
              className={logoImageClass}
              style={logoImageStyle}
              width={120}
              height={40}
              priority
            />
          </div>
          <div className={navRightClass} style={navRight}>
            {askLiv && (
              <span
                className={`${loginTextClass} ${textColor} clickable-login mr-2 sm:mr-6 cursor-pointer`}
                onClick={() => router.push("/ask-liv")}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    router.push("/ask-liv");
                  }
                }}
              >
                Ask Liv
              </span>
            )}
            <span
              className={`${loginTextClass} ${textColor} cursor-pointer`}
              onClick={() => router.push("/login")}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  router.push("/login");
                }
              }}
            >
              {loginText}
            </span>
            <button
              className={`${menuToggleClass} ${isMenuOpen ? "active" : ""}`}
              aria-label="Toggle menu"
              onClick={() => setIsMenuOpen((open) => !open)}
            >
              <Image
                src={imgAlignRight}
                alt="Menu"
                className={menuIconClass}
                width={24}
                height={24}
              />
            </button>
          </div>
        </div>
      </header>

      {isMenuOpen && (
        <nav
          className="fixed inset-0 z-[9999] bg-white w-screen h-screen flex flex-col sm:hidden"
          style={{ minHeight: "100vh", minWidth: "100vw" }}
        >
          <div className="flex w-full items-center justify-end px-0 pt-4 pb-0">
            <button
              className="text-4xl md:text-5xl font-bold text-gray-700 focus:outline-none pr-6"
              onClick={() => setIsMenuOpen(false)}
              aria-label="Close menu"
            >
              &times;
            </button>
          </div>
          <ul className="flex-1 flex flex-col gap-3 px-0 pb-4 overflow-y-auto items-start justify-start">
            <li className="w-full">
              <Link
                href="/"
                className="block pt-2 pb-1 pl-9 rounded-lg text-base font-semibold hover:bg-gray-100 hover:text-[#F18B82] transition text-gray-800"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
            </li>
            <li className="w-full">
              <Link
                href="/about"
                className="block pt-2 pb-1 pl-9 rounded-lg text-base font-semibold hover:bg-gray-100 hover:text-[#F18B82] transition text-gray-800"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
            </li>
            <li className="w-full">
              <Link
                href="/contact"
                className="block pt-2 pb-1 pl-9 rounded-lg text-base font-semibold hover:bg-gray-100 hover:text-[#F18B82] transition text-gray-800"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
            </li>
            <li className="w-full">
              <Link
                href="/login"
                className="block pt-2 pb-1 pl-9 rounded-lg text-base font-semibold hover:bg-gray-100 hover:text-[#F18B82] transition text-gray-800"
                onClick={() => setIsMenuOpen(false)}
              >
                {loginText}
              </Link>
            </li>
          </ul>
        </nav>
      )}

      <nav
        className={`navigation-menu ${isMenuOpen ? "active" : ""} hidden sm:block`}
      >
        <button
          className="menu-close"
          onClick={() => setIsMenuOpen(false)}
          aria-label="Close menu"
        >
          ×
        </button>
        <ul className="menu-items">
          <li className="menu-item">
            <Link
              href="/"
              className="menu-link"
              onClick={() => setIsMenuOpen(false)}
            >
              <h3 className="menu-title">Home</h3>
            </Link>
          </li>
          <li className="menu-item">
            <Link
              href="/about"
              className="menu-link"
              onClick={() => setIsMenuOpen(false)}
            >
              <h3 className="menu-title">About</h3>
            </Link>
          </li>
          <li className="menu-item">
            <Link
              href="/contact"
              className="menu-link"
              onClick={() => setIsMenuOpen(false)}
            >
              <h3 className="menu-title">Contact</h3>
            </Link>
          </li>
          <li className="menu-item">
            <Link
              href="/login"
              className="menu-link"
              onClick={() => setIsMenuOpen(false)}
            >
              <h3 className="menu-title">{loginText}</h3>
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Header;
