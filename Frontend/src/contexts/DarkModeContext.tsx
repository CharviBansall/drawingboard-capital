import { createContext, useContext, useState, useEffect, useRef } from "react";

interface DarkModeContextType {
  isDark: boolean;
  toggleDark: () => void;
}

const DarkModeContext = createContext<DarkModeContextType | undefined>(
  undefined
);

export function DarkModeProvider({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = useState<boolean | null>(null); // Initialize as null
  const hasMounted = useRef(false);

  // Step 1: Check stored theme or system preference after mount
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");

    if (storedTheme === "dark") {
      setIsDark(true);
    } else if (storedTheme === "light") {
      setIsDark(false);
    }
    // else {
    //   const prefersDark = window.matchMedia(
    //     "(prefers-color-scheme: dark)"
    //   ).matches;
    //   setIsDark(prefersDark);
    // }

    hasMounted.current = true;
  }, []);

  // Step 2: Apply dark mode class and save preference to localStorage after state is set
  useEffect(() => {
    if (isDark !== null) {
      // Only run after `isDark` is initialized
      if (isDark) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      localStorage.setItem("theme", isDark ? "dark" : "light");
    }
  }, [isDark]);

  // Step 3: Toggle dark mode
  const toggleDark = () => {
    if (isDark !== null) {
      setIsDark((prev) => !prev);
    }
  };

  return (
    <DarkModeContext.Provider value={{ isDark: isDark ?? false, toggleDark }}>
      {children}
    </DarkModeContext.Provider>
  );
}

export function useDark() {
  const context = useContext(DarkModeContext);
  if (context === undefined) {
    throw new Error("useDark must be used within a DarkModeProvider");
  }
  return context;
}
