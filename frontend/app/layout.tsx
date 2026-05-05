import type { Metadata } from "next";
import "./globals.css";
import LayoutClient from "./components/LayoutClient";

export const metadata: Metadata = {
  title: "CodeHive",
  description: `CodeHive is a comprehensive web platform designed 
  to create a dynamic developer community where users can connect, 
  share knowledge, and easily publish their projects and ideas. 
  The website boasts a modern design and offers a seamless, 
  responsive user experience across all devices.`,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/icon.jpg" />
      </head>
      <body className="bg-gray-950 overflow-x-hidden">
        <LayoutClient>{children}</LayoutClient>
      </body>
    </html>
  );
}
