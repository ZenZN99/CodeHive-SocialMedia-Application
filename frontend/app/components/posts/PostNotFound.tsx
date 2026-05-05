"use client";
import { useRouter } from "next/navigation";
import { FaArrowLeft, FaRegCommentDots } from "react-icons/fa";

const PostNotFound = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center text-center px-4">
      
      {/* Icon */}
      <div className="text-[#E0234E] text-6xl mb-6">
        <FaRegCommentDots />
      </div>

      {/* Title */}
      <h1 className="text-4xl font-bold text-white mb-3">
        Post Not Found
      </h1>

      {/* Description */}
      <p className="text-gray-400 max-w-md mb-8">
        The post you are trying to view does not exist, was deleted, or you don’t
        have permission to access it.
      </p>

      {/* Actions */}
      <div className="flex gap-4">
        <button
          onClick={() => router.push(-1 as any)}
          className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-xl transition-all duration-200"
        >
          <FaArrowLeft />
          Go Back
        </button>

        <button
          onClick={() => router.push("/")}
          className="flex items-center gap-2 bg-[#E0234E] hover:bg-[#ff194f] text-white px-6 py-3 rounded-xl transition-all duration-200 shadow-lg"
        >
          Home
        </button>
      </div>
    </div>
  );
};

export default PostNotFound;
