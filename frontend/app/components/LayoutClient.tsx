"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { useAuthStore } from "../stores/useAuthStore";

export default function LayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const hideNavbar =
    pathname === "/chat" || pathname === "/signup" || pathname === "/login" || pathname === "/admin";
  const { loadUser } = useAuthStore();
  useEffect(() => {
    const fetchUser = async () => {
      await loadUser();
    };

    fetchUser();
  }, []);
  return (
    <>
      {!hideNavbar && <Navbar />}

      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: "#ddd",
            padding: "14px",
            borderRadius: "5px",
          },
        }}
      />

      {children}
    </>
  );
}
