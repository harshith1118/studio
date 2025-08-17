"use client";

import { useState } from "react";
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
import { Leaf, Mail } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate inputs
    if (!email) {
      alert("Please enter your email");
      return;
    }
    
    // In a real app, you would send a password reset email here
    alert("Password reset email sent! Check your inbox.");
    
    // Redirect to login page
    router.push("/login");
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
          <form onSubmit={handleSubmit}>
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
                  />
                </div>
              </div>
              <Button 
                type="submit"
                className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 rounded-lg mt-2"
              >
                Send Reset Email
              </Button>
            </div>
          </form>
          
          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-gray-500">
                Remember your password?
              </span>
            </div>
          </div>
          
          <Button 
            variant="outline" 
            onClick={() => router.push("/login")}
            className="w-full rounded-lg border-emerald-200 text-emerald-700 hover:bg-emerald-100"
          >
            Back to Sign In
          </Button>
        </CardContent>
        <CardFooter className="flex flex-col">
          <p className="text-sm text-gray-500 text-center">
            We'll send you an email with instructions to reset your password.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}