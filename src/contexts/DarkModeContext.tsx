"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

interface DarkModeContextType {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const DarkModeContext = createContext<DarkModeContextType>({
  darkMode: false,
  toggleDarkMode: () => {},
});

export const useDarkMode = () => useContext(DarkModeContext);

interface DarkModeProviderProps {
  children: React.ReactNode;
  defaultDark?: boolean;
  templateId?: string;
}

export function DarkModeProvider({
  children,
  defaultDark = false,
  templateId = "root",
}: DarkModeProviderProps) {
  const [darkMode, setDarkMode] = useState(defaultDark);
  // const [isPreview, setIsPreview] = useState(false);

  useEffect(() => {
    // Check if we're in preview mode
    // const isInPreview = document.getElementById("preview-pane") !== null;
    // setIsPreview(isInPreview);

    // Apply initial dark mode
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
