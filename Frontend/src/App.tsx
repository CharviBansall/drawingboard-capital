import { useEffect, useState, useRef } from "react";
import { darkTheme } from "./styles/themes/theme.css";
import Button from "./components/ui/Button/Button";

export default function App() {
  const [isDark, setIsDark] = useState(false);
  const hasMounted = useRef(false);

  // On mount, check localStorage for theme preference
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark") {
      setIsDark(true);
      return;
    } else if (storedTheme === "light") {
      setIsDark(false);
      return;
    } else {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      setIsDark(prefersDark);
    }
    hasMounted.current = true;
  }, []);

  // Update body class and localStorage when theme changes (but not on initial load)
  useEffect(() => {
    // Remove darkTheme class for light mode, add for dark mode
    document.body.classList.remove(darkTheme);
    if (isDark) {
      document.body.classList.add(darkTheme);
    }

    if (hasMounted.current) {
      localStorage.setItem("theme", isDark ? "dark" : "light");
    } else {
      hasMounted.current = true;
    }
  }, [isDark]);

  return (
    <div>
      <Button onClick={() => setIsDark((d) => !d)}>Toggle Theme</Button>
    </div>
  );
}
