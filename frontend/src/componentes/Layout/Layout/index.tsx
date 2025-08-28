import React from "react";
import type { ILayoutProps } from "./types";
import { LayoutContainer, MainContent } from "./styled";
import Header from "../Header";
import Sidebar from "../Sidebar";

const Layout: React.FC<ILayoutProps> = ({ children }) => {
  return (
    <LayoutContainer>
      <Header />
      <div style={{ display: "flex", height: "calc(100vh - 64px)" }}>
        <Sidebar />
        <MainContent>{children}</MainContent>
      </div>
    </LayoutContainer>
  );
};

export default Layout;
