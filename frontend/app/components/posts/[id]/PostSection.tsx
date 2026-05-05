"use client";

import { PostDetialsPostSectionProps } from "@/app/types/props";
import Link from "next/link";
import toast from "react-hot-toast";
import { BiShare } from "react-icons/bi";

const PostSection = ({
  postUser,
  post,
  setShowImageModal,
}: PostDetialsPostSectionProps) => {
  return (
    <div className="w-full md:w-[50%] bg-gray-800 border-gray-700 text-white rounded-lg shadow-xl border-2 overflow-hidden">

      {/* Header */}
      <div className="flex items-center gap-3 p-5 border-b border-gray-800">
        <Link href={`/profile/${postUser?._id}`}>
          <img
            src={postUser?.avatar || "/default-avatar.png"}
            alt={postUser?.fullname}
            className="w-11 h-11 rounded-full object-cover border-2 border-[#E0234E]"
          />
        </Link>

        <div className="flex flex-col leading-tight">
          <p className="font-semibold text-white">{postUser?.fullname}</p>
          <span className="text-xs text-gray-400">
            {new Date(post!.createdAt).toLocaleString()}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 space-y-4">
        <p className="text-gray-200 leading-relaxed whitespace-pre-line">
          {post!.content}
        </p>

        {/* Image */}
        {post!.image && (
          <div className="rounded-xl overflow-hidden border border-gray-800">
            <img
              src={post!.image}
              alt="post"
              onClick={() => setShowImageModal(true)}
              className="w-full max-h-112.5 object-cover cursor-pointer transition-transform duration-300 hover:scale-[1.02]"
            />
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between px-5 py-3 border-t border-gray-800 text-gray-400">
        <button
          className="flex items-center gap-2 hover:text-blue-400 transition"
          onClick={() => {
            navigator.clipboard.writeText(window.location.href);
            toast.success("Link copied!");
          }}
        >
          <BiShare size={18} />
          <span className="text-sm cursor-pointer">Share</span>
        </button>
      </div>
    </div>
  );
};

export default PostSection;