import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "IELTS Arena — Nền Tảng Học & Đấu Trường IELTS AI",
  description: "Đấu trường Co-op PvP 1v1 với 5 minigames học thuật và AI chấm điểm chuyên sâu theo 4 tiêu chí IELTS.",
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
      <body className="antialiased min-h-screen flex flex-col bg-[#0B0F17] text-[#F8FAFC]">
        {children}
      </body>
    </html>
  );
}
