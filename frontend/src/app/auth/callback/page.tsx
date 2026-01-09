"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function AuthCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const exchange = async () => {
      const code = searchParams.get("code");
      let error: Error | null = null;

      if (code) {
        const result = await supabase.auth.exchangeCodeForSession(code);
        error = result.error;
      } else {
        const hashParams = new URLSearchParams(
          window.location.hash.replace(/^#/, "")
        );
        const accessToken = hashParams.get("access_token");
        const refreshToken = hashParams.get("refresh_token");

        if (!accessToken || !refreshToken) {
          error = new Error("Missing session tokens from OAuth response.");
        } else {
          const result = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken,
          });
          error = result.error;
        }
      }
      if (error) {
        setErrorMessage(`Sign-in failed: ${error.message}`);
        return;
      }

      router.replace("/basic-info");
    };

    exchange();
  }, [router, searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      {errorMessage ? (
        <div className="text-center space-y-3">
          <p className="text-sm text-red-600">{errorMessage}</p>
          <button
            type="button"
            className="text-sm text-gray-700 underline"
            onClick={() => router.replace("/login")}
          >
            Back to login
          </button>
        </div>
      ) : (
        <p className="text-sm text-gray-600">Completing sign-in...</p>
      )}
    </div>
  );
}
