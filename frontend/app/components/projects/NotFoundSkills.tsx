"use client";
import { useRouter } from "next/navigation";
import { FaSearch } from "react-icons/fa";

const NotFoundSkills = () => {
  const router = useRouter();

  return (
    <div className="col-span-2 flex flex-col items-center justify-center text-center py-20">
      
      {/* Icon */}
      <div className="text-[#E0234E] text-6xl mb-6">
        <FaSearch />
      </div>

      {/* Title */}
      <h2 className="text-3xl font-bold text-white mb-2">
        No Projects Found
      </h2>

      {/* Description */}
      <p className="text-gray-400 max-w-md mb-6">
        Sorry, there are no projects matching the selected skills. Try selecting different skills or clear the filters.
      </p>

      {/* Back Button */}
      <button
        onClick={() => router.push("/")}
        className="flex items-center gap-2 bg-[#E0234E] hover:bg-[#ff194f] text-white px-6 py-3 rounded-xl transition-all duration-200 shadow-lg"
      >
        Go Back to Home Page
      </button>
    </div>
  );
};

export default NotFoundSkills;
