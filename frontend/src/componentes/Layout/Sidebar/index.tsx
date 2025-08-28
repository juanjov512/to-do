"use client";

import React from "react";
import {
  SidebarContainer,
  SidebarItem,
  SidebarDivider,
  LogoutButton,
} from "./styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTasks,
  faChartBar,
  faSignOutAlt,
  faFolder,
  faTags,
} from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "@/hooks/useAuth";
import CollapsibleSection from "./CollapsibleSection";
import CategoriesList from "./CategoriesList";
import TagsList from "./TagsList";

const Sidebar: React.FC = () => {
  const { logout } = useAuth();

  return (
    <SidebarContainer>
      <div style={{ overflowY: "auto", flex: 1 }}>
        <SidebarItem href="/dashboard">
          <FontAwesomeIcon icon={faChartBar} />
          <span>Dashboard</span>
        </SidebarItem>

        <SidebarItem href="/tareas">
          <FontAwesomeIcon icon={faTasks} />
          <span>Tareas</span>
        </SidebarItem>

        <SidebarDivider />

        <CollapsibleSection
          title="Categorías"
          icon={<FontAwesomeIcon icon={faFolder} />}
        >
          <CategoriesList />
        </CollapsibleSection>

        <SidebarDivider />

        <CollapsibleSection
          title="Etiquetas"
          icon={<FontAwesomeIcon icon={faTags} />}
        >
          <TagsList />
        </CollapsibleSection>
      </div>

      <SidebarDivider />

      <LogoutButton onClick={logout}>
        <FontAwesomeIcon icon={faSignOutAlt} />
        <span>Cerrar sesión</span>
      </LogoutButton>
    </SidebarContainer>
  );
};

export default Sidebar;
