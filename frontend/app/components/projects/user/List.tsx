"use client";
import { UserProjectsListProps } from "@/app/types/props";

const List = ({
  loading,
  projects,
  handleEdit,
  handleDelete,
}: UserProjectsListProps) => {
  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid sm:grid-cols-3 gap-6">
          {projects.map((p) => (
            <div
              key={p._id}
              className="bg-gray-800  border-2 border-gray-700 p-5 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              <div className="w-full h-40 rounded-xl overflow-hidden">
                <img
                  src={p.images[0]}
                  alt={p.title}
                  className="w-full h-full  object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>

              <h4 className="font-bold text-lg text-white mt-4">{p.title}</h4>

              <p className="inline-block text-xs px-2 py-1 rounded-full bg-[#E0234E]/20 text-[#E0234E] mt-2">
                {p.level}
              </p>

              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => handleEdit(p)}
                  className="flex-1 border border-[#E0234E] text-[#E0234E] rounded-xl py-2 hover:bg-[#E0234E] hover:text-white transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(p._id)}
                  className="flex-1 bg-red-500/20 text-red-400 rounded-xl py-2 hover:bg-red-500/40 hover:text-white transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default List;
