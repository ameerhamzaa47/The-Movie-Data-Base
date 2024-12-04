import { FC, ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className="w-full min-h-screen bg-white">
      <div className="max-w-screen-2xl  mx-auto">{children}</div>
    </div>
  );
};

export default Layout;