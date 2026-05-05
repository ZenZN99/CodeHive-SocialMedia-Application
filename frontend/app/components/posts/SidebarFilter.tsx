"use client";

import { PostsSidebarFilterProps } from "@/app/types/props";

const SidebarFilter = ({
  searchUser,
  setSearchUser,
  users,
}: PostsSidebarFilterProps) => {
  return (
    <div className="w-full md:w-64 shrink-0 bg-gray-900 border-2 border-gray-800  p-5 rounded-2xl h-fit sticky top-20 md:self-start">
      <h2 className="text-white font-bold mb-4">Filter by User</h2>
      <input
        type="text"
        placeholder="Search user..."
        value={searchUser}
        onChange={(e) => setSearchUser(e.target.value)}
        className="w-full mb-4 px-3 py-2 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E0234E]"
      />

      <div className="flex flex-col gap-2 max-h-60 overflow-y-auto">
        {Object.values(users).map((user) => (
          <button
            key={user._id}
            onClick={() => setSearchUser(user.fullname)}
            className="flex items-center gap-2 text-gray-300 hover:text-white p-1 rounded cursor-pointer"
          >
            <img
              src={user.avatar || "/default-avatar.png"}
              alt={user.fullname}
              className="w-6 h-6 rounded-full border border-[#E0234E]"
            />
            <span>{user.fullname}</span>
          </button>
        ))}
      </div>

      {searchUser && (
        <button
          onClick={() => setSearchUser("")}
          className="mt-4 bg-[#E0234E] text-white px-3 py-1 rounded hover:bg-[#ff1c51]"
        >
          Clear Filter
        </button>
      )}
    </div>
  );
};

export default SidebarFilter;
