"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type ThemeMode = "vibrant" | "monochrome" | "light";

interface ThemeContextType {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemeMode>("vibrant");

  useEffect(() => {
    const savedTheme = localStorage.getItem("ielts-arena-theme") as ThemeMode | null;
    if (savedTheme && ["vibrant", "monochrome", "light"].includes(savedTheme)) {
      setThemeState(savedTheme);
      applyTheme(savedTheme);
    } else {
      applyTheme("vibrant");
    }
  }, []);

  const applyTheme = (mode: ThemeMode) => {
    const root = document.documentElement;
    root.classList.remove("theme-vibrant", "theme-monochrome", "theme-light", "dark", "light");

    if (mode === "light") {
      root.classList.add("light", "theme-light");
    } else if (mode === "monochrome") {
      root.classList.add("dark", "theme-monochrome");
    } else {
      root.classList.add("dark", "theme-vibrant");
    }
  };

  const setTheme = (mode: ThemeMode) => {
    setThemeState(mode);
    localStorage.setItem("ielts-arena-theme", mode);
    applyTheme(mode);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
