import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Deep Work Templates — Premium Notion Templates & Workflow Systems",
  description:
    "Premium Notion templates & workflow systems for remote workers, freelancers & creators. Instant digital download.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen bg-navy font-sans text-white">{children}</body>
    </html>
  );
}
