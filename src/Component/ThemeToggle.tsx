import { FC } from "react";
import { useTheme } from "../Context/ThemeProvider";
import { SunIcon, MoonIcon } from "@heroicons/react/16/solid";

const ThemeToggle: FC = () => {
  const { theme, toggleTheme } = useTheme();

  console.log("theme", theme);
  return (
    <div>
        {theme != "light" ? <SunIcon onClick={toggleTheme} className="h-8 w-8 cursor-pointer"/> : <MoonIcon onClick={toggleTheme} className="w-8 h-8 cursor-pointer"/>}
    </div>
  );
};

export default ThemeToggle;