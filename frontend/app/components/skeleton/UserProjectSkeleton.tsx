"use client";
const UserProjectSkeleton = () => {
  return (
    <div className="text-gray-300">
      <div className="max-w-6xl mx-auto px-6 py-20 gap-10">
        {/* RIGHT */}
        <div className="md:col-span-2 bg-gray-900 border-2 border-gray-800 rounded-3xl p-8 animate-pulse">
          
          {/* FORM SKELETON */}
          <div className="space-y-5 mb-10">
            <div className="h-8 bg-gray-700 rounded w-1/3"></div>

            <div className="h-12 bg-gray-700 rounded w-full"></div>
            <div className="h-24 bg-gray-700 rounded w-full"></div>
            <div className="h-12 bg-gray-700 rounded w-full"></div>
            <div className="h-12 bg-gray-700 rounded w-full"></div>

            {/* SKILLS */}
            <div className="flex flex-wrap gap-2">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-8 w-20 bg-gray-700 rounded-full"></div>
              ))}
            </div>

            {/* FILE UPLOAD */}
            <div className="space-y-3">
              <div className="h-4 bg-gray-700 rounded w-1/4"></div>
              <div className="h-10 bg-gray-700 rounded w-full"></div>

              {/* PREVIEW */}
              <div className="flex gap-4 flex-wrap mt-2">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="w-28 h-28 rounded-2xl bg-gray-700 border border-gray-700"
                  ></div>
                ))}
              </div>
            </div>

            {/* SUBMIT BUTTON */}
            <div className="h-10 bg-gray-700 rounded-xl w-32 mt-4"></div>
          </div>

          {/* LIST SKELETON */}
          <div className="grid sm:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="bg-gray-800 border-2 border-gray-700 p-5 rounded-2xl shadow-md"
              >
                {/* Image placeholder */}
                <div className="w-full h-40 rounded-xl bg-gray-700 mb-4"></div>

                {/* Title */}
                <div className="h-6 bg-gray-700 rounded w-3/4 mb-2"></div>

                {/* Level */}
                <div className="h-4 bg-[#E0234E]/20 rounded w-1/4 mb-4"></div>

                {/* Buttons */}
                <div className="flex gap-3 mt-4">
                  <div className="flex-1 h-8 bg-gray-700 rounded-xl"></div>
                  <div className="flex-1 h-8 bg-gray-700 rounded-xl"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProjectSkeleton;
