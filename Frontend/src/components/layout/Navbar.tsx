import { useDark } from "../../contexts/DarkModeContext";
import logoLight from "../../assets/WhiteLogoWithWordmark.svg";
import logoDark from "../../assets/BlueLogoWithWordmark.svg";
import Button from "../ui/Button/Button.tsx";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useEffect } from "react";

export default function Navbar() {
  const { isDark, toggleDark } = useDark();

  useEffect(() => {
    console.log(isDark);
  }, [isDark]);

  return (
    <header className="bg-blue-500 text-white dark:bg-blue-800 dark:text-gray-200 py-2 px-4 rounded">
      <img src={isDark ? logoLight : logoDark} alt="Company Logo" height={40} />
      <Button kind="primary" size="small" onClick={toggleDark}>
        Toggle Theme {isDark ? <SunIcon /> : <MoonIcon />}
      </Button>
    </header>
  );
}
