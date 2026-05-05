interface UserHeaderProps {
  searchTerm: string;
  setSearchTerm: (e: string) => void;
}

const UserHeader = ({ searchTerm, setSearchTerm }: UserHeaderProps) => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4 text-white">Users</h1>

      {/* Search Input */}
      <div className="mb-8">
        <input
          type="text"
          placeholder="Search users by fullname..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-1/3 px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-blue-500"
        />
      </div>
    </div>
  );
};

export default UserHeader;
