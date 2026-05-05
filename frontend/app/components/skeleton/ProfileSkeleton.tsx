"use client";
const ProfileSkeleton = () => {
  return (
    <div className="w-full max-w-6xl mx-auto px-6 py-20 animate-pulse">
      <div className="grid md:grid-cols-3 gap-10">

        {/* ================= LEFT SIDE ================= */}
        <div className="bg-gray-900 rounded-3xl p-6 shadow-xl">
          <div className="flex flex-col items-center text-center">

            {/* Avatar */}
            <div className="w-40 h-40 rounded-full bg-gray-800 ring-4 ring-gray-700" />

            {/* Name */}
            <div className="mt-5 h-6 w-40 bg-gray-800 rounded" />

            {/* Job title */}
            <div className="mt-2 h-4 w-32 bg-gray-800 rounded" />

            {/* Divider */}
            <div className="w-full h-px bg-gray-800 my-5" />

            {/* Info items */}
            <div className="w-full space-y-3">
              <div className="h-4 bg-gray-800 rounded w-full" />
              <div className="h-4 bg-gray-800 rounded w-5/6" />
              <div className="h-4 bg-gray-800 rounded w-4/6" />
              <div className="h-4 bg-gray-800 rounded w-3/6" />
            </div>

            {/* Website */}
            <div className="mt-4 h-4 w-32 bg-gray-800 rounded" />

            {/* Edit button */}
            <div className="mt-6 w-full h-10 bg-gray-800 rounded-xl" />
          </div>
        </div>

        {/* ================= RIGHT SIDE ================= */}
        <div className="md:col-span-2 bg-gray-900 rounded-3xl p-8 shadow-xl space-y-6">

          {/* Header */}
          <div className="flex justify-between items-center">
            <div className="h-6 w-40 bg-gray-800 rounded" />
            <div className="h-8 w-24 bg-gray-800 rounded-xl" />
          </div>

          {/* Bio box */}
          <div className="bg-gray-800 rounded-2xl p-6 space-y-3">
            <div className="h-4 bg-gray-700 rounded w-full" />
            <div className="h-4 bg-gray-700 rounded w-11/12" />
            <div className="h-4 bg-gray-700 rounded w-10/12" />
            <div className="h-4 bg-gray-700 rounded w-10/12" />
            <div className="h-4 bg-gray-700 rounded w-10/12" />
            <div className="h-4 bg-gray-700 rounded w-10/12" />
            <div className="h-4 bg-gray-700 rounded w-10/12" />
            <div className="h-4 bg-gray-700 rounded w-10/12" />
            <div className="h-4 bg-gray-700 rounded w-10/12" />
            <div className="h-4 bg-gray-700 rounded w-10/12" />
            <div className="h-4 bg-gray-700 rounded w-10/12" />
            <div className="h-4 bg-gray-700 rounded w-10/12" />
            <div className="h-4 bg-gray-700 rounded w-10/12" />
            <div className="h-4 bg-gray-700 rounded w-10/12" />
            <div className="h-4 bg-gray-700 rounded w-10/12" />
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProfileSkeleton;
