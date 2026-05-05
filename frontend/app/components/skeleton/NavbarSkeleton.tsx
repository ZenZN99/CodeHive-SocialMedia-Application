"use client";
const NavbarSkeleton = () => {
  return (
    <nav className="sticky top-0 z-50 bg-gray-950 border-b border-red-800 animate-pulse">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">

        {/* Logo Skeleton */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gray-800 ring-2 ring-gray-700" />
          <div className="h-4 w-20 bg-gray-800 rounded" />
        </div>

        {/* Desktop Links Skeleton */}
        <div className="hidden md:flex items-center gap-4">
          <div className="h-4 w-16 bg-gray-800 rounded" />
          <div className="h-4 w-16 bg-gray-800 rounded" />
          <div className="h-4 w-20 bg-gray-800 rounded" />

          {/* Auth / User */}
          <div className="flex items-center gap-2 ml-4">
            <div className="h-9 w-24 bg-gray-800 rounded-xl" />
            <div className="h-9 w-24 bg-gray-800 rounded-xl" />
          </div>
        </div>

        {/* Mobile Hamburger Skeleton */}
        <div className="md:hidden">
          <div className="w-6 h-6 bg-gray-800 rounded" />
        </div>
      </div>
    </nav>
  );
};

export default NavbarSkeleton;
