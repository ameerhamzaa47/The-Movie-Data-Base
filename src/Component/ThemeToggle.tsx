import { FC } from "react";
import { useTheme } from "../Context/ThemeProvider";
import { SunIcon, MoonIcon } from "@heroicons/react/16/solid";

const ThemeToggle: FC = () => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <>
    <div className="hidden md:block">
        {theme != "light" ? <SunIcon onClick={toggleTheme} className="h-8 w-8 cursor-pointer"/> : <MoonIcon onClick={toggleTheme} className="w-8 h-8 cursor-pointer"/>}
    </div>

    <div className="block md:hidden">
        {theme != "light" ? <h1 onClick={toggleTheme}>Light</h1> : <h1 onClick={toggleTheme}>Dark</h1>}
    </div>
    </>
    
  );
};

export default ThemeToggle;