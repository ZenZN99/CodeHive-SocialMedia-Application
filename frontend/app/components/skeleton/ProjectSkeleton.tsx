"use client";
const ProjectSkeleton = () => {
  return (
    <div className="bg-gray-800 border border-gray-700 rounded-2xl p-5 animate-pulse flex flex-col h-132.5">
      
      {/* User Info */}
      <div className="flex items-center gap-3 mb-3 relative">
        <div className="w-10 h-10 rounded-full bg-gray-700 border-2 border-gray-700" />

        <div className="flex flex-col gap-1">
          <div className="h-3 w-24 bg-gray-700 rounded" />
          <div className="h-2 w-16 bg-gray-600 rounded" />
        </div>
      </div>

      {/* Title */}
      <div className="h-5 bg-gray-700 rounded w-3/4 mb-3" />

      {/* Content */}
      <div className="space-y-2 mb-3">
        <div className="h-4 bg-gray-700 rounded w-full" />
        <div className="h-4 bg-gray-700 rounded w-5/6" />
        <div className="h-4 bg-gray-700 rounded w-2/3" />
      </div>

      {/* Image */}
      <div className="w-full h-52 bg-gray-700 rounded-lg mb-3" />

      {/* Skills */}
      <div className="flex flex-wrap gap-2 mb-2">
        <div className="h-6 w-16 bg-gray-700 rounded-full" />
        <div className="h-6 w-20 bg-gray-700 rounded-full" />
        <div className="h-6 w-14 bg-gray-700 rounded-full" />
        <div className="h-6 w-12 bg-gray-700 rounded-full" />
      </div>

      {/* Level */}
      <div className="h-4 w-24 bg-gray-700 rounded mb-3" />

      {/* Button */}
      <div className="mt-auto">
        <div className="h-9 w-full bg-gray-700 rounded-xl" />
      </div>
    </div>
  );
};

export default ProjectSkeleton;
