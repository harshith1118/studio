import { Header } from "@/components/header";
import { TryItToolkit } from "@/components/try-it-toolkit";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      <Header />
      
      <main className="container py-4 sm:py-6 px-4 sm:px-6">
        <div className="mb-6 sm:mb-8 text-center">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
            Welcome to EcoMind AI
          </h1>
          <p className="text-muted-foreground mt-2 text-sm sm:text-base max-w-2xl mx-auto">
            Sustainable AI solutions for creative and analytical tasks
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <TryItToolkit />
        </div>
      </main>
    </div>
  );
}