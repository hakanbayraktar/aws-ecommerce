import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { AuthProvider } from "@/lib/auth/AuthContext";

const inter = Inter({ subsets: ["latin"], weight: ['400', '600', '700'] });

export const metadata: Metadata = {
  title: "DevOps Atolyesi | Premium eCommerce Experience",
  description: "High-performance, cloud-native shopping experience built with Next.js and AWS.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <div className="fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900 via-slate-900 to-black"></div>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
