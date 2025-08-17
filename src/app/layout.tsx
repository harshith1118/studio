import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { ProtectedLayout } from "@/components/protected-layout";

export const metadata: Metadata = {
  title: "EcoMind AI - Sustainable AI Solutions",
  description: 'Environmentally conscious AI assistant platform',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <ProtectedLayout>
          {children}
        </ProtectedLayout>
        <Toaster />
      </body>
    </html>
  );
}