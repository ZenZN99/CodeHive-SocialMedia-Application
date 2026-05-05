"use client";
const ProjectDetailsSkeleton = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-10 space-y-6">
      {/* Title */}
      <div className="h-8 w-3/4 bg-gray-700 rounded-md animate-pulse" />

      {/* Content */}
      <div className="h-4 w-full bg-gray-700 rounded-md animate-pulse mt-2" />
      <div className="h-4 w-5/6 bg-gray-700 rounded-md animate-pulse mt-1" />

      {/* Images */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
        <div className="h-48 bg-gray-700 rounded-xl animate-pulse"></div>
        <div className="h-48 bg-gray-700 rounded-xl animate-pulse"></div>
      </div>

      {/* Skills */}
      <div className="flex gap-2 mt-4">
        {Array.from({ length: 4 }).map((_, idx) => (
          <div
            key={idx}
            className="h-6 w-20 bg-gray-700 rounded-full animate-pulse"
          />
        ))}
      </div>

      {/* Level */}
      <div className="h-4 w-32 bg-gray-700 rounded-md animate-pulse mt-2" />

      {/* Visit Project Button */}
      <div className="h-10 w-40 bg-gray-700 rounded-md animate-pulse mt-3" />

      {/* Rating Section */}
      <div className="mt-6 space-y-2">
        <div className="h-4 w-40 bg-gray-700 rounded-md animate-pulse" />
        <div className="flex gap-2 mt-2">
          {Array.from({ length: 5 }).map((_, idx) => (
            <div
              key={idx}
              className="h-8 w-8 bg-gray-700 rounded-full animate-pulse"
            />
          ))}
          <div className="h-8 w-32 bg-gray-700 rounded-md animate-pulse ml-4" />
        </div>
      </div>

      {/* User Ratings */}
      <div className="mt-10 space-y-4">
        {Array.from({ length: 3 }).map((_, idx) => (
          <div
            key={idx}
            className="flex items-center gap-4 bg-gray-800 p-4 rounded-2xl animate-pulse"
          >
            <div className="w-12 h-12 bg-gray-700 rounded-full" />
            <div className="flex-1 space-y-2">
              <div className="h-4 w-1/3 bg-gray-700 rounded-md" />
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((__, starIdx) => (
                  <div
                    key={starIdx}
                    className="h-4 w-4 bg-gray-700 rounded-full"
                  />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectDetailsSkeleton;
