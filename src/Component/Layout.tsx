import { FC, ReactNode } from "react";
import Footer from "./Footer";

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className="w-full min-h-screen bg-white dark:bg-[#002C46] dark:text-white">
      <div className="max-w-screen-2xl  mx-auto">{children}</div>
      <Footer/>
    </div>
  );
};

export default Layout;