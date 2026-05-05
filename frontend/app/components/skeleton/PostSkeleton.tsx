"use client";
const PostSkeleton = () => {
  return (
    <div className="relative bg-gray-900 w-full md:w-[60%] mx-auto text-white rounded-lg shadow-md border border-gray-700 overflow-hidden animate-pulse">
      
      {/* Header */}
      <div className="flex items-center p-4 gap-3 border-b border-gray-700">
        <div className="w-12 h-12 rounded-full bg-gray-700" />
        <div className="flex flex-col gap-2">
          <div className="w-32 h-4 bg-gray-700 rounded" />
          <div className="w-24 h-3 bg-gray-600 rounded" />
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="w-full h-4 bg-gray-700 rounded mb-2" />
        <div className="w-[90%] h-4 bg-gray-700 rounded mb-2" />
        <div className="w-[70%] h-4 bg-gray-700 rounded mb-4" />

        {/* Image */}
        <div className="w-full h-62.5 sm:h-75 bg-gray-700 rounded-lg" />
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row items-center justify-around gap-2 p-3 border-t border-gray-700">
        <div className="w-20 h-4 bg-gray-700 rounded" />
        <div className="w-20 h-4 bg-gray-700 rounded" />
      </div>
    </div>
  );
};

export default PostSkeleton;
