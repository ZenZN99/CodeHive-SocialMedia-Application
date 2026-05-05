"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaHome } from "react-icons/fa";
import { HiOutlineBriefcase, HiOutlineUsers } from "react-icons/hi2";
import { MdPostAdd } from "react-icons/md";

export interface AdminSidebarProps {
  activeTab: string;
  setActiveTab: (value: "users" | "posts" | "projects") => void;
}

const Sidebar = ({ activeTab, setActiveTab }: AdminSidebarProps) => {
  const router = useRouter();

  const menuItems = [
    { label: "Home", icon: <FaHome className="w-5 h-5" />, action: () => router.push("/") },
    { label: "Users", icon: <HiOutlineUsers className="w-5 h-5" />, action: () => setActiveTab("users") },
    { label: "Posts", icon: <MdPostAdd className="w-5 h-5" />, action: () => setActiveTab("posts") },
    { label: "Projects", icon: <HiOutlineBriefcase className="w-5 h-5" />, action: () => setActiveTab("projects") },
  ];

  return (
    <>
      {/* Sidebar for large screens */}
      <div className="hidden md:flex flex-col bg-gray-900 p-6 w-64">
        <h1 className="text-xl font-bold mb-8 text-white">Admin Dashboard</h1>
        {menuItems.map((item) => (
          <button
            key={item.label}
            className={`flex items-center cursor-pointer gap-3 px-4 py-2 rounded-lg mb-2 w-full text-left
              ${activeTab === item.label.toLowerCase() && item.label !== "Home"
                ? "bg-[#E0234E] text-white"
                : "hover:bg-gray-800 text-gray-300"
              }`}
            onClick={item.action}
          >
            {item.icon} {item.label}
          </button>
        ))}
      </div>

      {/* Bottom navigation for small screens */}
      <div className="fixed bottom-0 left-0 right-0 md:hidden bg-gray-900 flex justify-around items-center h-16 border-t border-gray-800">
        {menuItems.map((item) => (
          <button
            key={item.label}
            className={`flex flex-col items-center justify-center text-xs
              ${activeTab === item.label.toLowerCase() && item.label !== "Home"
                ? "text-[#E0234E]"
                : "text-gray-300 hover:text-white"
              }`}
            onClick={item.action}
          >
            {item.icon}
            <span>{item.label}</span>
          </button>
        ))}
      </div>
    </>
  );
};

export default Sidebar;
