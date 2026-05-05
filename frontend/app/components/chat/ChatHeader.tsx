"use client";
import { ChatHeaderProps } from "@/app/types/chat";
import { useRouter } from "next/navigation";

export default function ChatHeader({
  selectedUser,
  onlineUsers,
  typingUserId,
}: ChatHeaderProps) {
    const router = useRouter()
  return (
   <div
  className="
    p-4
    bg-linear-to-r from-[#111827] to-[#1f2933]
    border-b border-[#E0234E]/20
    flex flex-col sm:flex-row items-center sm:items-center gap-2 sm:gap-4
    sticky top-0 z-10
  "
>
  {/* Avatar */}
  <img
    src={selectedUser.avatar || "/default-avatar.png"}
    alt="avatar"
    className="
      w-12 h-12 sm:w-14 sm:h-14
      rounded-full cursor-pointer
      ring-2 ring-[#E0234E]
      hover:scale-105 transition object-cover
    "
    onClick={() => router.push(`/profile/${selectedUser?._id}`)}
  />

  {/* Name & Status */}
  <div className="flex flex-col text-center sm:text-left">
    <h2 className="font-bold text-white leading-tight text-sm sm:text-base">
      {selectedUser.fullname}
    </h2>

    {/* Online Status */}
    {onlineUsers.includes(selectedUser._id) && (
      <span className="text-[#16ff2d] text-xs font-semibold">
        ● Online
      </span>
    )}

    {/* Typing Indicator */}
    {typingUserId === selectedUser._id && (
      <span className="text-[#ff3b6a] text-xs animate-pulse">
        typing...
      </span>
    )}
  </div>
</div>

  );
}
