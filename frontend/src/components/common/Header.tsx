"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { CSSProperties } from "react";
import { supabase } from "@/lib/supabaseClient";

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
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [userName, setUserName] = useState("");
  const router = useRouter();
  const pathname = usePathname();

  const isActive = (path: string) =>
    pathname === path || pathname.startsWith(`${path}/`);

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

  useEffect(() => {
    let mounted = true;

    const hydrateAuth = async () => {
      const { data } = await supabase.auth.getUser();
      if (mounted) {
        const user = data.user;
        setIsAuthenticated(Boolean(user));

        if (user) {
          const { data: profile } = await supabase
            .from("profiles")
            .select("first_name")
            .eq("id", user.id)
            .maybeSingle();
          setUserName(
            profile?.first_name ||
              (user.user_metadata?.first_name as string) ||
              (user.email?.split("@")[0] ?? "")
          );
        } else {
          setUserName("");
        }

        setIsAuthLoading(false);
      }
    };

    hydrateAuth();

    const { data: subscription } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (mounted) {
          const user = session?.user ?? null;
          setIsAuthenticated(Boolean(user));
          if (user) {
            supabase
              .from("profiles")
              .select("first_name")
              .eq("id", user.id)
              .maybeSingle()
              .then(({ data: profile }) => {
                if (!mounted) return;
                setUserName(
                  profile?.first_name ||
                    (user.user_metadata?.first_name as string) ||
                    (user.email?.split("@")[0] ?? "")
                );
                setIsAuthLoading(false);
              });
          } else {
            setUserName("");
            setIsAuthLoading(false);
          }
        }
      }
    );

    return () => {
      mounted = false;
      subscription?.subscription.unsubscribe();
    };
  }, []);

  const authActionLabel = isAuthenticated ? "Logout" : loginText;

  const handleAuthAction = async () => {
    if (isAuthenticated) {
      await supabase.auth.signOut();
      setIsAuthenticated(false);
    }
    router.push("/login");
  };

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
              className={`${loginTextClass} ${textColor} ${
                isAuthenticated ? "" : "cursor-pointer"
              }`}
              onClick={() => {
                if (!isAuthenticated) {
                  router.push("/login");
                }
              }}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (!isAuthenticated && (e.key === "Enter" || e.key === " ")) {
                  router.push("/login");
                }
              }}
            >
              {isAuthLoading ? (
                <svg
                  className="animate-spin h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  style={{ color: theme === "light" ? "#fff" : "#000" }}
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
              ) : isAuthenticated ? (
                userName || "Welcome!"
              ) : (
                loginText
              )}
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
                className={`block pt-2 pb-1 pl-9 rounded-lg text-base font-semibold hover:bg-gray-100 hover:text-[#F18B82] transition ${
                  isActive("/") ? "text-[#F18B82]" : "text-gray-800"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
            </li>
            <li className="w-full">
              <Link
                href="/about"
                className={`block pt-2 pb-1 pl-9 rounded-lg text-base font-semibold hover:bg-gray-100 hover:text-[#F18B82] transition ${
                  isActive("/about") ? "text-[#F18B82]" : "text-gray-800"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
            </li>
            <li className="w-full">
              <Link
                href="/todays-nudge"
                className={`block pt-2 pb-1 pl-9 rounded-lg text-base font-semibold hover:bg-gray-100 hover:text-[#F18B82] transition ${
                  isActive("/todays-nudge") ? "text-[#F18B82]" : "text-gray-800"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Today&apos;s Nudge
              </Link>
            </li>
            <li className="w-full">
              <Link
                href="/ask-liv"
                className={`block pt-2 pb-1 pl-9 rounded-lg text-base font-semibold hover:bg-gray-100 hover:text-[#F18B82] transition ${
                  isActive("/ask-liv") ? "text-[#F18B82]" : "text-[#1B8BD8]"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Ask Liv
              </Link>
            </li>
            <li className="w-full">
              <Link
                href="/profile"
                className={`block pt-2 pb-1 pl-9 rounded-lg text-base font-semibold hover:bg-gray-100 hover:text-[#F18B82] transition ${
                  isActive("/profile") ? "text-[#F18B82]" : "text-gray-800"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Your Profile
              </Link>
            </li>
            <li className="w-full">
              <Link
                href="/faq"
                className={`block pt-2 pb-1 pl-9 rounded-lg text-base font-semibold hover:bg-gray-100 hover:text-[#F18B82] transition ${
                  isActive("/faq") ? "text-[#F18B82]" : "text-gray-800"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                FAQ
              </Link>
            </li>
            <li className="w-full">
              <Link
                href="/chat-history"
                className={`block pt-2 pb-1 pl-9 rounded-lg text-base font-semibold hover:bg-gray-100 hover:text-[#F18B82] transition ${
                  isActive("/chat-history") ? "text-[#F18B82]" : "text-gray-800"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Chat History
              </Link>
            </li>
            <li className="w-full">
              <Link
                href="/contact"
                className={`block pt-2 pb-1 pl-9 rounded-lg text-base font-semibold hover:bg-gray-100 hover:text-[#F18B82] transition ${
                  isActive("/contact") ? "text-[#F18B82]" : "text-gray-800"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
            </li>
            <li className="w-full">
              <button
                type="button"
                className="block w-full text-left pt-2 pb-1 pl-9 rounded-lg text-base font-semibold hover:bg-gray-100 hover:text-[#F18B82] transition text-gray-800"
                onClick={async () => {
                  await handleAuthAction();
                  setIsMenuOpen(false);
                }}
              >
                {authActionLabel}
              </button>
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
              className={`menu-link ${isActive("/") ? "active" : ""}`}
              onClick={() => setIsMenuOpen(false)}
            >
              <h3 className="menu-title">Home</h3>
            </Link>
          </li>
          <li className="menu-item">
            <Link
              href="/about"
              className={`menu-link ${isActive("/about") ? "active" : ""}`}
              onClick={() => setIsMenuOpen(false)}
            >
              <h3 className="menu-title">About</h3>
            </Link>
          </li>
          <li className="menu-item">
            <Link
              href="/todays-nudge"
              className={`menu-link ${isActive("/todays-nudge") ? "active" : ""}`}
              onClick={() => setIsMenuOpen(false)}
            >
              <h3 className="menu-title">Today&apos;s Nudge</h3>
            </Link>
          </li>
          <li className="menu-item">
            <Link
              href="/ask-liv"
              className={`menu-link ask-liv ${isActive("/ask-liv") ? "active" : ""}`}
              onClick={() => setIsMenuOpen(false)}
            >
              <h3 className="menu-title">Ask Liv</h3>
            </Link>
          </li>
          <li className="menu-item">
            <Link
              href="/profile"
              className={`menu-link ${isActive("/profile") ? "active" : ""}`}
              onClick={() => setIsMenuOpen(false)}
            >
              <h3 className="menu-title">Your Profile</h3>
            </Link>
          </li>
          <li className="menu-item">
            <Link
              href="/faq"
              className={`menu-link ${isActive("/faq") ? "active" : ""}`}
              onClick={() => setIsMenuOpen(false)}
            >
              <h3 className="menu-title">FAQ</h3>
            </Link>
          </li>
          <li className="menu-item">
            <Link
              href="/chat-history"
              className={`menu-link ${isActive("/chat-history") ? "active" : ""}`}
              onClick={() => setIsMenuOpen(false)}
            >
              <h3 className="menu-title">Chat History</h3>
            </Link>
          </li>
          <li className="menu-item">
            <Link
              href="/contact"
              className={`menu-link ${isActive("/contact") ? "active" : ""}`}
              onClick={() => setIsMenuOpen(false)}
            >
              <h3 className="menu-title">Contact</h3>
            </Link>
          </li>
          <li className="menu-item">
            <button
              type="button"
              className="menu-link"
              onClick={async () => {
                await handleAuthAction();
                setIsMenuOpen(false);
              }}
            >
              <h3 className="menu-title">{authActionLabel}</h3>
            </button>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Header;
