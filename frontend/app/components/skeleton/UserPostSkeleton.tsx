"use client";
const UserPostSkeleton = () => {
  return (
    <div className="bg-gray-800 border-2 border-gray-700 p-5 rounded-2xl animate-pulse">
      {/* Image placeholder */}
      <div className="w-full h-40 bg-gray-700 rounded-xl mb-4" />

      {/* Text placeholders */}
      <div className="h-4 bg-gray-700 rounded w-3/4 mb-2" />
      <div className="h-4 bg-gray-700 rounded w-1/2 mb-2" />

      {/* Buttons placeholders */}
      <div className="flex gap-3 mt-4">
        <div className="flex-1 h-10 bg-gray-700 rounded-xl" />
        <div className="flex-1 h-10 bg-gray-700 rounded-xl" />
      </div>
    </div>
  );
};

export default UserPostSkeleton;
