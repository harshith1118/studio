"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export function PublicLayout({
  children,
}) {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check if user is already authenticated
    const checkAuth = () => {
      // Check for auth token in localStorage
      const token = localStorage.getItem("ai-demo-token");
      
      if (token) {
        // Redirect to home page if already authenticated
        router.push("/");
      } else {
        // User is not authenticated, allow access to public pages
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
        <div className="flex flex-col items-center gap-4">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent"></div>
          <p className="text-sm text-gray-500">Loading...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}