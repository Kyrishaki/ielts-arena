import type { Metadata, Viewport } from "next";
import "./globals.css";
import { AppShell } from "@/components/layout/AppShell";
import { ThemeProvider } from "@/context/ThemeContext";

export const metadata: Metadata = {
  title: "IELTS Arena — Nền Tảng Học Thuật & Đấu Trường IELTS AI",
  description:
    "Trung tâm dịch thuật học thuật, Shadowing Lab, Paraphrase Studio, Flashcard SRS và Đấu trường PvP 1v1.",
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
    <html lang="vi" className="dark theme-vibrant">
      <body className="antialiased min-h-screen">
        <ThemeProvider>
          <AppShell>{children}</AppShell>
        </ThemeProvider>
      </body>
    </html>
  );
}
