"use client";

const PostDetailsSkeleton = () => {
  return (
    <div className="min-h-screen flex justify-center">
      <div className="w-full max-w-6xl p-4 sm:p-7 flex flex-col md:flex-row gap-6 animate-pulse">

        {/* Post Section Skeleton */}
        <div className="flex-1 bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden">

          {/* Header */}
          <div className="flex items-center gap-3 p-5 border-b border-gray-800">
            <div className="w-11 h-11 rounded-full bg-gray-700" />

            <div className="flex flex-col gap-2">
              <div className="w-36 h-4 bg-gray-700 rounded" />
              <div className="w-24 h-3 bg-gray-700 rounded" />
            </div>
          </div>

          {/* Content */}
          <div className="p-5 space-y-3">
            <div className="w-full h-4 bg-gray-700 rounded" />
            <div className="w-5/6 h-4 bg-gray-700 rounded" />
            <div className="w-3/4 h-4 bg-gray-700 rounded" />

            {/* Image */}
            <div className="w-full h-[300px] sm:h-[420px] bg-gray-700 rounded-xl mt-4" />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between px-5 py-3 border-t border-gray-800">
            <div className="w-16 h-4 bg-gray-700 rounded" />
          </div>
        </div>

        {/* Comments Skeleton */}
        <div className="flex-1 bg-gray-900 rounded-2xl border border-gray-800 p-5 flex flex-col gap-4 max-h-[80vh] overflow-hidden">

          {/* Title */}
          <div className="w-40 h-5 bg-gray-700 rounded" />

          {/* Input */}
          <div className="flex gap-2">
            <div className="flex-1 h-10 bg-gray-700 rounded-lg" />
            <div className="w-20 h-10 bg-gray-700 rounded-lg" />
          </div>

          {/* Comments */}
          <div className="flex flex-col gap-4 mt-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="bg-gray-800 p-4 rounded-lg space-y-3">

                {/* Comment header */}
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-full bg-gray-700" />

                  <div className="flex-1 space-y-2">
                    <div className="w-32 h-3 bg-gray-700 rounded" />
                    <div className="w-24 h-3 bg-gray-700 rounded" />
                    <div className="w-full h-3 bg-gray-700 rounded" />
                  </div>
                </div>

                {/* Replies */}
                <div className="ml-8 space-y-2">
                  <div className="w-24 h-3 bg-gray-700 rounded" />
                  <div className="w-4/6 h-3 bg-gray-700 rounded" />
                </div>

              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default PostDetailsSkeleton;