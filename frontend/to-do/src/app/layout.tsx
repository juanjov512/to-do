import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import StyledComponentsRegistry from "@/lib/styled-components.registry";
import { ThemeProvider } from "@/contexto/ThemeContext";
import { ContextoAuthProvider } from "@/contexto/contextoAuth";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "To-Do App",
  description: "To-Do App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ContextoAuthProvider>
          <StyledComponentsRegistry>
            <ThemeProvider>{children}</ThemeProvider>
          </StyledComponentsRegistry>
        </ContextoAuthProvider>
      </body>
    </html>
  );
}
