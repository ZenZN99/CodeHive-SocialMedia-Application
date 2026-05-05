"use client";
import { useRouter } from "next/navigation";
import { FaArrowLeft, FaExclamationTriangle } from "react-icons/fa";

const NotFound = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center text-center px-4">
      
      {/* Icon */}
      <div className="text-[#E0234E]  text-6xl mb-6">
        <FaExclamationTriangle />
      </div>

      {/* Title */}
      <h1 className="text-4xl font-bold text-white mb-3">
        404 - Page Not Found!
      </h1>

      {/* Description */}
      <p className="text-gray-400 max-w-md mb-8">
       Sorry, the page you are trying to access does not exist or may have been moved.
      </p>

      {/* Back Button */}
      <button
        onClick={() => router.push("/")}
        className="flex items-center gap-2 bg-[#E0234E]  hover:bg-[#ff194f]  text-white px-6 py-3 rounded-xl transition-all duration-200 shadow-lg"
      >
        <FaArrowLeft />
       Back to home page
      </button>
    </div>
  );
};

export default NotFound;
