"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check if user is authenticated
    const checkAuth = () => {
      // Check for auth token in localStorage
      const token = localStorage.getItem("ai-demo-token");
      
      if (!token) {
        // Redirect to login page if not authenticated
        router.push("/login");
      } else {
        // User is authenticated, allow access
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
          <p className="text-sm text-gray-500">Loading your workspace...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}