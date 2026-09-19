import type { Metadata, Viewport } from "next";
import "./globals.css";
import { AppShell } from "@/components/layout/AppShell";

export const metadata: Metadata = {
  title: "IELTS Arena — Nền Tảng Học Thuật & Đấu Trường IELTS AI",
  description: "Trung tâm dịch thuật học thuật, Shadowing Lab, Paraphrase Studio, Flashcard SRS và Đấu trường PvP 1v1.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  interactiveWidget: "resizes-content",
  themeColor: "#0B0F17",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className="dark">
      <body className="antialiased min-h-screen bg-[#0B0F17] text-[#F8FAFC]">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
