"use client";
const SkeletonCard = () => {
  return (
    <div className="bg-gray-900 border-2 border-gray-800 rounded-3xl p-6 shadow-xl flex flex-col items-center text-center animate-pulse">
      {/* Avatar */}
      <div className="w-32 h-32 bg-gray-700 rounded-full mb-4" />

      {/* Name */}
      <div className="h-6 w-24 bg-gray-700 rounded mb-2" />

      {/* Role */}
      <div className="h-4 w-20 bg-gray-800 rounded mb-4" />

      {/* Info Items */}
      <div className="w-full space-y-2">
        <div className="h-4 w-full bg-gray-800 rounded" />
        <div className="h-4 w-full bg-gray-800 rounded" />
        <div className="h-4 w-full bg-gray-800 rounded" />
        <div className="h-4 w-1/2 bg-gray-800 rounded" />
      </div>

      {/* Website */}
      <div className="h-4 w-1/2 bg-gray-800 rounded mt-3" />

      {/* Badge */}
      <div className="h-6 w-20 bg-gray-800 rounded-full mt-4" />

      {/* Actions */}
      <div className="flex gap-2 mt-4">
        <div className="h-10 w-10 bg-gray-800 rounded-full" />
        <div className="h-10 w-10 bg-gray-800 rounded-full" />
      </div>
    </div>
  );
};

const AdminDashboardSkeleton = () => {
  return (
    <div className="min-h-screen text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <h1 className="text-3xl font-bold mb-4 text-white">Admin Dashboard</h1>

        {/* Search Input Skeleton */}
        <div className="mb-8">
          <div className="h-10 w-1/3 bg-gray-800 rounded animate-pulse" />
        </div>

        {/* Users Grid Skeleton */}
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, idx) => (
            <SkeletonCard key={idx} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardSkeleton;
