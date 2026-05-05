"use client";

import { useRouter } from "next/navigation";
import { FaHome } from "react-icons/fa";
import { RiAdminFill } from "react-icons/ri";

const AdminOnly = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center text-center px-4">
      {/* Icon */}
      <div className="text-[#E0234E] text-6xl mb-6">
       <RiAdminFill />
      </div>

      {/* Title */}
      <h1 className="text-5xl font-bold text-white mb-3">
        Admin Only - 403
      </h1>

      {/* Description */}
      <p className="text-gray-400 max-w-md mb-8">
        You do not have permission to access this page. Only administrators can view this content.
      </p>

      {/* Actions */}
      <div className="flex gap-4 flex-wrap justify-center">
        <button
          onClick={() => router.push("/")}
          className="flex items-center gap-2 bg-[#E0234E] hover:bg-[#ff194f] text-white px-6 py-3 rounded-xl transition shadow-lg"
        >
          <FaHome />
          Back to Home
        </button>

        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 border border-gray-600 text-gray-300 hover:bg-gray-800 px-6 py-3 rounded-xl transition"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default AdminOnly;
