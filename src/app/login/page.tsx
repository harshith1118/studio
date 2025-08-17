"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Leaf, Mail, Key } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [formKey, setFormKey] = useState(0); // Used to reset form
  const router = useRouter();

  // Reset form when component mounts
  useEffect(() => {
    setFormKey(prev => prev + 1);
    setEmail("");
    setPassword("");
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate inputs
    if (!email || !password) {
      alert("Please fill in all fields");
      return;
    }
    
    // Set loading state
    setIsLoading(true);
    
    // Simulate a small delay to show loading state (this makes the UI feel more responsive)
    setTimeout(() => {
      // Immediate login process
      localStorage.setItem("ai-demo-token", "demo-token");
      localStorage.setItem("userName", email.split("@")[0]);
      localStorage.setItem("userEmail", email);
      localStorage.setItem("userRole", "User");
      
      // Also set cookie for server-side access
      document.cookie = "ai-demo-token=demo-token; path=/";
      
      // Dispatch storage event
      window.dispatchEvent(new StorageEvent('storage', {
        key: 'userName',
        newValue: email.split("@")[0]
      }));
      
      // Redirect to home page
      router.push("/");
    }, 300); // Small delay to show loading state
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 p-4">
      <Card className="w-full max-w-md shadow-xl border-0 bg-white/90 backdrop-blur-sm rounded-2xl">
        <CardHeader className="text-center space-y-2 pb-4">
          <div className="mx-auto bg-gradient-to-r from-emerald-500 to-teal-600 p-3 rounded-full w-16 h-16 flex items-center justify-center">
            <Leaf className="h-8 w-8 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
            EcoMind AI
          </CardTitle>
          <CardDescription>
            Sustainable AI Solutions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form key={formKey} onSubmit={handleSubmit} autoComplete="off">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-emerald-400" />
                  <Input
                    id="email"
                    placeholder="Enter your email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 border-emerald-100 focus-visible:ring-emerald-500 rounded-lg"
                    required
                    autoComplete="email"
                    data-lpignore="true"
                    data-form-type="other"
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    href="/forgot-password"
                    className="text-sm underline-offset-4 hover:underline text-emerald-600"
                  >
                    Forgot?
                  </Link>
                </div>
                <div className="relative">
                  <Key className="absolute left-3 top-3 h-4 w-4 text-emerald-400" />
                  <Input
                    id="password"
                    placeholder="Enter your password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 border-emerald-100 focus-visible:ring-emerald-500 rounded-lg"
                    required
                    autoComplete="current-password"
                    data-lpignore="true"
                    data-form-type="other"
                  />
                </div>
              </div>
              <Button 
                type="submit"
                disabled={isLoading}
                className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 rounded-lg mt-2"
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent mr-2"></div>
                    Signing In...
                  </div>
                ) : (
                  "Sign In"
                )}
              </Button>
            </div>
          </form>
          
          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-gray-500">
                New user?
              </span>
            </div>
          </div>
          
          <Button 
            variant="outline" 
            onClick={() => router.push("/signup")}
            className="w-full rounded-lg border-emerald-200 text-emerald-700 hover:bg-emerald-100"
          >
            Create Account
          </Button>
        </CardContent>
        <CardFooter className="flex flex-col">
          <p className="text-sm text-gray-500 text-center">
            Secure access to our sustainable AI models
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}