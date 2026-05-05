"use client";
import { FaRocket, FaStar, FaUserGraduate, FaUserShield } from "react-icons/fa";
import { GiHeartWings } from "react-icons/gi";
import type { UserBadge } from "../types/user";
import type { JSX } from "react";

export const badgeStyles: Record<
  UserBadge,
  { icon: JSX.Element; className: string }
> = {
  "Beginner Member": {
    icon: <FaUserGraduate />,
    className:
      "relative bg-gradient-to-r from-gray-500 to-gray-700 text-white px-3 py-1 rounded-full shadow-lg flex items-center gap-2 animate-shine-badge hover:scale-105 transition-transform",
  },
  "Active Member": {
    icon: <FaRocket />,
    className:
      "relative bg-gradient-to-r from-blue-400 to-blue-600 text-white px-3 py-1 rounded-full shadow-lg flex items-center gap-2 animate-shine-badge hover:scale-105 transition-transform",
  },
  "Engaged Member": {
    icon: <GiHeartWings />,
    className:
      "relative bg-gradient-to-r from-yellow-300 to-yellow-500 text-white px-3 py-1 rounded-full shadow-lg flex items-center gap-2 animate-shine-badge hover:scale-105 transition-transform",
  },
  "Star Member": {
    icon: <FaStar />,
    className:
      "relative bg-gradient-to-r from-purple-400 to-purple-600 text-white px-3 py-1 rounded-full shadow-lg flex items-center gap-2 animate-shine-badge hover:scale-105 transition-transform",
  },
  "CodeHive Admin": {
    icon: <FaUserShield />,
    className:
      "relative bg-gradient-to-r from-red-500 to-red-700 text-white px-3 py-1 rounded-full shadow-lg flex items-center gap-2 animate-shine-badge hover:scale-105 transition-transform",
  },
};
