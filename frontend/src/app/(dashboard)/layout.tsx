import Sidebar from "@/componentes/Layout/Sidebar";
import { Container, Content } from "./styled";
import { redirect } from "next/navigation";
import React from "react";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  // Protege la ruta en el cliente; para SSR, se podría leer cookie.
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (!token) {
      redirect("/auth");
    }
  }
  return (
    <Container>
      <Sidebar />
      <Content>{children}</Content>
    </Container>
  );
}
