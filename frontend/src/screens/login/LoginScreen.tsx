"use client";

import Link from "next/link";
import Header from "@/components/common/Header";
import { supabase } from "@/lib/supabaseClient";

export default function LoginScreen() {
  return (
    <div className="min-h-screen bg-[#578E7AA8]">
      <Header loginText="" />

      <div className="flex items-center justify-center min-h-[calc(100vh-107px)] w-screen">
        <main className="bg-white rounded-lg shadow-sm w-full max-w-xs sm:max-w-lg md:max-w-xl lg:min-w-2xl mx-auto py-12 flex justify-center">
          <div className="max-w-2xs sm:max-w-sm md:max-w-md lg:min-w-lg">
            <form
              onSubmit={(event) => event.preventDefault()}
              className="space-y-2"
            >
              <button
                type="button"
                className="flex items-center justify-center cursor-pointer w-full py-3 px-4 border border-black rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-opacity"
                onClick={() => {
                  const redirectTo = `${window.location.origin}/auth/callback`;
                  supabase.auth.signInWithOAuth({
                    provider: "google",
                    options: { redirectTo },
                  });
                }}
              >
                <svg
                  className="w-5 h-5 mr-2"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
                    <path
                      fill="#000000"
                      d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"
                    />
                    <path
                      fill="#000000"
                      d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"
                    />
                    <path
                      fill="#000000"
                      d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"
                    />
                    <path
                      fill="#000000"
                      d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"
                    />
                  </g>
                </svg>
                Continue with Google
              </button>

              <div className="flex items-center justify-center my-4">
                <span className="px-2 bg-white text-black font-bold">or</span>
              </div>

              <div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="block w-full px-3 py-2 border border-black rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[.5px] focus:ring-black focus:ring-opacity-20 focus:border-black"
                  placeholder="Email address"
                />
              </div>

              <div>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="block w-full px-3 py-2 border border-black rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[.5px] focus:ring-black focus:ring-opacity-20 focus:border-black"
                  placeholder="Password"
                />
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full py-4 px-4 border border-transparent rounded-2xl shadow-sm text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black cursor-pointer"
                >
                  Start My Coaching
                </button>
              </div>

              <div className="text-center mt-2">
                <button
                  type="button"
                  className="text-black hover:underline text-sm cursor-pointer"
                >
                  Forgot Password?
                </button>
              </div>

              <div className="text-xs text-center text-gray-600">
                By continuing, you agree to our{" "}
                <Link href="/terms-of-service" className="text-black underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy-policy" className="text-black underline">
                  Privacy Policy
                </Link>
                .
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}
