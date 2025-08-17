"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export function ProtectedLayout({
  children,
}) {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check if we're on the login or signup page
    if (window.location.pathname === '/login' || window.location.pathname === '/signup') {
      setIsLoading(false);
      return;
    }

    // For demo purposes, we'll allow access to the main app
    // In a real app, you would check for a valid token
    const checkAuth = () => {
      // Simulate a short delay for loading state
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    };

    checkAuth();
  }, [router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
        <div className="flex flex-col items-center gap-4">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent"></div>
          <p className="text-sm text-gray-500">Loading your workspace...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}