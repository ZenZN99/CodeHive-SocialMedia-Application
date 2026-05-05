"use client";
import { useEffect, useState } from "react";
import { FaEllipsisV, FaSignOutAlt, FaUserCircle } from "react-icons/fa";
import Link from "next/link";
import { SidebarProps } from "@/app/types/chat";

export default function ChatSidebar({
  users,
  search,
  setSearch,
  selectedUser,
  onlineUsers,
  selectUser,
  user,
  logout,
}: SidebarProps) {
  const [dropdownOpen, setDropDownOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);

    check();
    window.addEventListener("resize", check);

    return () => window.removeEventListener("resize", check);
  }, []);
  return (
    <aside
      className={`
        bg-[#0f172a]
        border-r border-[#E0234E]/20
        p-4 flex flex-col
        ${isMobile  ? "w-full absolute z-20 h-full" : "w-1/4"}
      `}
    >
      {/* Top Menu */}
      <div className="relative mb-4">
        <button
          onClick={() => setDropDownOpen(!dropdownOpen)}
          className="text-gray-400 hover:text-[#E0234E] transition"
        >
          <FaEllipsisV />
        </button>

        {dropdownOpen && (
          <div
            className="
            absolute mt-3 w-56
            bg-[#020617]
            border border-[#E0234E]/20
            rounded-2xl shadow-xl
            overflow-hidden
            animate-fade-in
          "
          >
            <div className="px-4 py-4 border-b border-[#E0234E]/10 text-center">
              <img
                src={user!.avatar}
                alt="avatar"
                className="w-14 h-14 mx-auto rounded-full object-cover ring-2 ring-[#E0234E]"
              />
              <p className="mt-2 text-sm text-white font-semibold truncate">
                {user!.fullname}
              </p>
              <p className="text-xs text-gray-400 truncate">{user!.email}</p>
            </div>

            <Link
              href="/profile"
              onClick={() => setDropDownOpen(false)}
              className="
                flex items-center gap-3 px-4 py-3 text-sm
                text-gray-300 hover:bg-[#E0234E]/10 transition
              "
            >
              <FaUserCircle />
              Profile
            </Link>

            <button
              onClick={logout}
              className="
                flex items-center w-full gap-3 px-4 py-3 text-sm
                text-[#E0234E] hover:bg-[#E0234E]/10 transition
              "
            >
              <FaSignOutAlt />
              Logout
            </button>
          </div>
        )}
      </div>

      {/* Search */}
      <input
        className="
          w-full p-2 mb-4 rounded-xl
          bg-[#020617]
          border border-[#E0234E]/20
          text-white placeholder-gray-400
          focus:outline-none
          focus:ring-2 focus:ring-[#E0234E]
        "
        placeholder="Search user..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Users */}
      <div className="space-y-2 overflow-y-auto flex-1 pr-1">
        {users
          .filter((u) =>
            u.fullname.toLowerCase().includes(search.toLowerCase()),
          )
          .map((u) => {
            const isActive = selectedUser?._id === u._id;
            const isOnline = onlineUsers.includes(u._id);

            return (
              <div
                key={u._id}
                onClick={() => selectUser(u)}
                className={`
                  p-3 rounded-2xl cursor-pointer
                  flex items-center gap-3
                  transition-all
                  ${
                    isActive
                      ? "bg-[#E0234E]/15 border border-[#E0234E]/40"
                      : "hover:bg-white/5"
                  }
                `}
              >
                <img
                  src={u.avatar}
                  alt="avatar"
                  className={`
                    w-12 h-12 rounded-full object-cover
                    ${isActive ? "ring-2 ring-[#E0234E]" : ""}
                  `}
                />

                <div className="flex-1">
                  <span className="font-medium text-white block truncate">
                    {u.fullname}
                  </span>
                </div>

                {isOnline && (
                  <span
                    className="
                    w-2.5 h-2.5
                    bg-[lime]
                    rounded-full
                       shadow-[0_0_8px_rgba(132,204,22,0.9)]
                  "
                  />
                )}
              </div>
            );
          })}
      </div>
    </aside>
  );
}
