"use client";
import { IoMdImages } from "react-icons/io";
import { IoSend } from "react-icons/io5";
import EmojiPicker from "emoji-picker-react";
import { FaSmile } from "react-icons/fa";
import { MdOutlineCancel } from "react-icons/md";
import { ChatInputProps } from "@/app/types/chat";

export default function ChatInput({
  message,
  setMessage,
  handleSend,
  handleTyping,
  handleImageChange,
  showEmoji,
  setShowEmoji,
}: ChatInputProps) {
  const onEmojiClick = (emojiObject: any) => {
    setMessage(message + emojiObject.emoji);
  };

  return (
<div
  className="
    p-4
    bg-[#0f172a]
    border-t border-[#E0234E]/20
    flex flex-col gap-2
    sm:flex-row sm:items-center
  "
>
  <div className="flex gap-3 w-full sm:w-auto">
    {/* Image Upload */}
    <label
      htmlFor="imageUpload"
      className="
        p-3 rounded-xl cursor-pointer
        bg-[#020617]
        border border-[#E0234E]/20
        text-gray-300
        hover:bg-[#E0234E]/10
        hover:text-[#E0234E]
        transition
        flex items-center justify-center
      "
    >
      <IoMdImages size={20} />
    </label>

    <input
      type="file"
      accept="image/*"
      onChange={handleImageChange}
      className="hidden"
      id="imageUpload"
    />

    {/* Emoji */}
    <div className="relative">
      <button
        onClick={() => setShowEmoji(!showEmoji)}
        className="
          p-3 rounded-xl
          bg-[#020617]
          border border-[#E0234E]/20
          text-gray-300
          hover:text-[#E0234E]
          hover:bg-[#E0234E]/10
          transition
          flex items-center justify-center
        "
      >
        {showEmoji ? <MdOutlineCancel /> : <FaSmile />}
      </button>

      {showEmoji && (
        <div className="absolute bottom-14 z-20">
          <EmojiPicker onEmojiClick={onEmojiClick} />
        </div>
      )}
    </div>
  </div>

  <div className="flex gap-2 w-full">
    <input
      className="
        flex-1 px-4 py-3 rounded-2xl
        bg-[#020617]
        border border-[#E0234E]/20
        text-white placeholder-gray-400
        focus:outline-none
        focus:ring-2 focus:ring-[#E0234E]
      "
      placeholder="Write a message..."
      value={message}
      onChange={(e) => handleTyping(e.target.value)}
    />

    <button
      onClick={handleSend}
      className="
        p-4 rounded-2xl
        bg-[#E0234E]
        text-white
        hover:bg-[#ff3b6a]
        active:scale-95
        transition
        shadow-lg shadow-[#E0234E]/30
      "
    >
      <IoSend size={18} />
    </button>
  </div>
</div>


  );
}
