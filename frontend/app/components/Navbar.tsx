"use client";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  FaUserCircle,
  FaSignOutAlt,
  FaSignInAlt,
  FaUserPlus,
  FaChevronDown,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { useAuthStore } from "../stores/useAuthStore";
import NavbarSkeleton from "./skeleton/NavbarSkeleton";
import NavbarBell from "./NavbarBell";

const navLinks = [
  { title: "Home", link: "/" },
  { title: "About", link: "/about" },
  { title: "Services", link: "/services" },
  { title: "Projects", link: "/projects" },
  { title: "Posts", link: "/posts" },
  { title: "Chat", link: "/chat" },
  { title: "Users", link: "/users" },
];

const Navbar = () => {
  const { user, loadUser, logout } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      await loadUser();
      setLoading(false);
    };
    fetchUser();
  }, []);

  const handleLogout = async () => {
    await logout();
    setDropdownOpen(false);
    setSidebarOpen(false);
    router.push("/login");
  };

  const isActive = (link: string) => pathname === link;

  if (loading) return <NavbarSkeleton />;

  return (
    <nav className="sticky top-0 z-50 bg-gray-950 border-b border-red-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <div
          onClick={() => router.push("/")}
          className="flex items-center gap-3 cursor-pointer select-none"
        >
          <img src="/logo.png" alt="CodeHive Logo" className="w-45" />
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-3">
          {navLinks.map((link) => (
            <button
              key={link.title}
              onClick={() => router.push(link.link)}
              className={`px-4 py-2  cursor-pointer rounded-lg transition-all duration-200 ${
                isActive(link.link)
                  ? "bg-[#E0234E] text-white shadow-lg"
                  : "text-gray-300 hover:text-[#E0234E] hover:bg-gray-800"
              }`}
            >
              {link.title}
            </button>
          ))}

          {!user ? (
            <>
              <button
                onClick={() => router.push("/login")}
                className="flex items-center cursor-pointer gap-2 px-4 py-2 text-sm rounded-xl text-[#E0234E] border border-[#E0234E] hover:bg-[#E0234E]/10 transition"
              >
                <FaSignInAlt /> Log In
              </button>
              <button
                onClick={() => router.push("/signup")}
                className="flex items-center cursor-pointer gap-2 px-4 py-2 text-sm rounded-xl bg-[#E0234E] text-white font-semibold hover:bg-[#ff194f] transition"
              >
                <FaUserPlus /> Sign Up
              </button>
            </>
          ) : (
            <div className="relative flex items-center gap-3">
              <NavbarBell />
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center cursor-pointer gap-2 px-3 py-2 rounded-xl hover:bg-slate-800 transition"
              >
                <img
                  src={user.avatar}
                  alt="avatar"
                  className="w-9 h-9 rounded-full object-cover ring-2 ring-[#E0234E]"
                />
                <FaChevronDown
                  className={`text-gray-300 transition ${
                    dropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 top-10 mt-3 w-52 bg-slate-900 border border-red-800 rounded-xl shadow-2xl overflow-hidden animate-fade-in z-50">
                  <div className="px-4 py-3 border-b border-red-800">
                    <p className="text-sm text-white font-semibold truncate">
                      {user.fullname}
                    </p>
                    <p className="text-xs text-gray-400 truncate">
                      {user.email}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      router.push("/profile");
                      setDropdownOpen(false);
                    }}
                    className="w-full flex items-center cursor-pointer gap-3 px-4 py-3 text-sm text-gray-300 hover:bg-slate-800 transition"
                  >
                    <FaUserCircle /> Profile
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center cursor-pointer gap-3 px-4 py-3 text-red-500 hover:bg-red-950/40 transition"
                  >
                    <FaSignOutAlt /> Log Out
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button
          className="lg:hidden cursor-pointer text-gray-300 text-xl"
          onClick={() => setSidebarOpen(true)}
        >
          <FaBars />
        </button>
      </div>

      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm lg:hidden">
          <div className="fixed top-0 right-0 w-64 h-full bg-slate-900 p-6 flex flex-col gap-4 overflow-auto animate-slide-in">
            <button
              className="self-end cursor-pointer text-gray-300 text-xl"
              onClick={() => setSidebarOpen(false)}
            >
              <FaTimes />
            </button>

            {navLinks.map((link) => (
              <button
                key={link.title}
                onClick={() => {
                  router.push(link.link);
                  setSidebarOpen(false);
                }}
                className={`px-4 py-2 cursor-pointer rounded-lg w-full text-left transition-all duration-200 ${
                  isActive(link.link)
                    ? "bg-[#E0234E] text-white shadow-lg"
                    : "text-gray-300 hover:text-[#E0234E] hover:bg-gray-800"
                }`}
              >
                {link.title}
              </button>
            ))}

            {!user ? (
              <>
                <button
                  onClick={() => {
                    router.push("/login");
                    setSidebarOpen(false);
                  }}
                  className="flex items-center cursor-pointer gap-2 px-4 py-2 text-[#E0234E] rounded-xl border border-[#E0234E] hover:bg-[#E0234E]/10 transition"
                >
                  <FaSignInAlt /> Log In
                </button>
                <button
                  onClick={() => {
                    router.push("/signup");
                    setSidebarOpen(false);
                  }}
                  className="flex items-center cursor-pointer gap-2 px-4 py-2 text-white rounded-xl bg-[#E0234E] font-semibold hover:bg-[#ff194f] transition"
                >
                  <FaUserPlus /> Sign Up
                </button>
              </>
            ) : (
              <>
                <div className="px-4 pt-3 border-b border-red-800"></div>
                <NavbarBell />
                <button
                  onClick={() => {
                    router.push("/profile");
                    setSidebarOpen(false);
                  }}
                  className="flex items-center cursor-pointer gap-3 px-4 py-2 text-gray-300 hover:bg-slate-800 transition rounded-xl"
                >
                  <img
                    src={user.avatar}
                    alt="avatar"
                    className="w-10 h-10 rounded-full border-2 border-[#E0234E]"
                  />
                  Profile
                </button>
                <button
                  onClick={handleLogout}
                  className="flex items-center cursor-pointer gap-3 px-4 py-2 text-red-500 hover:bg-red-950/40 transition rounded-xl"
                >
                  <FaSignOutAlt /> Log Out
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
