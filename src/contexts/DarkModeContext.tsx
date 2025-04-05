"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

interface DarkModeContextType {
  darkMode: boolean;
  toggleDarkMode: () => void;
}
interface DarkModeProviderProps {
  children: React.ReactNode;
  defaultDark?: boolean;
  templateId?: string;
}

const DarkModeContext = createContext<DarkModeContextType>({
  darkMode: false,
  toggleDarkMode: () => {},
});

export const useDarkMode = () => useContext(DarkModeContext);

export function DarkModeProvider({
  children,
  defaultDark = false,
  templateId = "root",
}: DarkModeProviderProps) {
  const [darkMode, setDarkMode] = useState(defaultDark);
  // const [isPreview, setIsPreview] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.getElementById(templateId)?.classList.add("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.getElementById(templateId)?.classList.toggle("dark");
  };

  return (
    <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}
