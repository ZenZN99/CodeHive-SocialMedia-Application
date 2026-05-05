"use client";
import { FaGithub, FaLinkedin, FaFacebook } from "react-icons/fa";
import { AiOutlineGlobal } from "react-icons/ai";
import { useAuthStore } from "../stores/useAuthStore";
import Link from "next/link";

const Footer = () => {
  const { user } = useAuthStore();

  return (
    <footer className="relative bg-gray-950 border-t border-white/10 text-gray-400">
      {/* Glow Effect */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_bottom,rgba(224,35,78,0.15),transparent_60%)] blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16 grid gap-10 sm:grid-cols-2 md:grid-cols-4">
        {/* Logo & Description */}
        <div className="space-y-4">
          <img
            src="/logo.png"
            alt="CodeHive Logo"
            className="w-50 h-12.5 object-cover"
          />
          <p className="text-sm leading-relaxed text-gray-300">
            CodeHive is an all-in-one web platform for developers. Front-end,
            back-end, design, and security, all with strong community support.
          </p>
        </div>

        {/* Navigation Links */}
        <div>
          <h4 className="text-white font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link
                href="/"
                className="hover:text-[#E0234E] transition-colors duration-200"
              >
                Home
              </Link>
            </li>

            {user ? (
              <li>
                <Link
                  href="/profile"
                  className="hover:text-[#E0234E] transition-colors duration-200"
                >
                  Profile
                </Link>
              </li>
            ) : (
              <>
                <li>
                  <Link
                    href="/login"
                    className="hover:text-[#E0234E] transition-colors duration-200"
                  >
                    Log In
                  </Link>
                </li>
                <li>
                  <Link
                    href="/signup"
                    className="hover:text-[#E0234E] transition-colors duration-200"
                  >
                    Sign Up
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>

        {/* Community Links */}
        <div>
          <h4 className="text-white font-semibold mb-4">Community</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link
                href="/projects"
                className="hover:text-[#E0234E] transition-colors duration-200"
              >
                Projects
              </Link>
            </li>
            <li>
              <Link
                href="/posts"
                className="hover:text-[#E0234E] transition-colors duration-200"
              >
                Posts
              </Link>
            </li>
            <li>
              <Link
                href="/chat"
                className="hover:text-[#E0234E] transition-colors duration-200"
              >
                Chat
              </Link>
            </li>
          </ul>
        </div>

        {/* Social Icons */}
        <div>
          <h4 className="text-white font-semibold mb-4">Connect with us</h4>
          <div className="flex gap-4 mt-2  md:flex-col lg:flex-row">
            <a
              href="https://github.com/ZenZN99"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="p-3 rounded-full bg-white/5 hover:bg-[#E0234E]/20 hover:text-white transition flex items-center justify-center"
            >
              <FaGithub size={20} />
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=61579430121762"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="p-3 rounded-full bg-white/5 hover:bg-[#E0234E]/20 hover:text-white transition flex items-center justify-center"
            >
              <FaFacebook size={20} />
            </a>
            <a
              href="https://www.linkedin.com/in/zen-allaham-789907370/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="p-3 rounded-full bg-white/5 hover:bg-[#E0234E]/20 hover:text-white transition flex items-center justify-center"
            >
              <FaLinkedin size={20} />
            </a>
            <a
              href="https://www-zen-portfolio.netlify.app"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Website"
              className="p-3 rounded-full bg-white/5 hover:bg-[#E0234E]/20 hover:text-white transition flex items-center justify-center"
            >
              <AiOutlineGlobal size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="relative z-10 border-t border-white/10 py-6 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} CodeHive. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
