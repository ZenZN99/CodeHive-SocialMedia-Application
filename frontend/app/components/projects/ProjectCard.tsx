"use client";

import ProjectSkeleton from "../skeleton/ProjectSkeleton";
import NotFoundSkills from "./NotFoundSkills";
import Link from "next/link";
import { UserRoles } from "@/app/types/user";
import { FaTrash } from "react-icons/fa";
import { ProjectCardProps } from "@/app/types/props";

const ProjectCard = ({
  loading,
  filteredProjects,
  onlineUsers,
  currentUser,
  handleDelete,
  setModalImage,
  setShowImageModal,
}: ProjectCardProps) => {
  const truncateText = (text: string, maxLength = 100) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "...";
  };

  return (
    <div className="flex-1 grid sm:grid-cols-1 xl:grid-cols-2 gap-6 w-full">
      {loading ? (
        [...Array(4)].map((_, i) => <ProjectSkeleton key={i} />)
      ) : filteredProjects.length === 0 ? (
        <NotFoundSkills />
      ) : (
        filteredProjects.map((project) => (
          <div
            key={project._id}
            className="bg-gray-800 border-2 border-gray-700 rounded-2xl p-5 hover:shadow-lg transition-shadow flex flex-col h-156.25 sm:h-140"
          >
            {/* User Info */}
            <div className="relative flex items-center gap-3 mb-3">
              <Link
                href={`/profile/${project.userId?._id || "#"}`}
                className="relative"
              >
                <img
                  src={project.userId?.avatar || "/default-avatar.png"}
                  alt={project.userId?.fullname || "User"}
                  className="w-10 h-10 rounded-full border-2 border-[#E0234E] object-cover"
                />
                {project.userId?._id &&
                  onlineUsers.includes(project.userId._id) && (
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-[lime] border-2 border-gray-900 rounded-full" />
                  )}
              </Link>

              {currentUser?.role === UserRoles.ADMIN && (
                <button
                  onClick={() => handleDelete(project._id)}
                  className="absolute top-3 right-3 flex items-center justify-center bg-[#E0234E] text-white w-8 h-8 rounded-full hover:bg-red-500 transition"
                >
                  <FaTrash />
                </button>
              )}

              <div className="flex flex-col">
                <p className="text-white font-semibold text-sm">
                  {project.userId?._id === currentUser?._id ? (
                    <>
                      {project.userId.fullname ?? "Unknown User"}{" "}
                      <span className="text-emerald-500">(You)</span>
                    </>
                  ) : (
                    project.userId?.fullname || "Unknown User"
                  )}
                </p>
                <p className="text-gray-400 text-xs">
                  {project?.createdAt
                    ? new Date(project.createdAt).toLocaleDateString()
                    : "N/A"}
                </p>
              </div>
            </div>

            {/* Project Title & Content */}
            <h3 className="text-white font-bold text-lg">{project.title}</h3>
            <p className="text-gray-300 mt-2 flex-1">
              {truncateText(project.description, 100)}
            </p>

            {/* Project Image */}
            {project.images[0] && (
              <div className="mt-3">
                <img
                  src={project.images[0]}
                  alt={project.title}
                  className="w-full h-52 object-cover rounded-lg hover:scale-105 transition-transform cursor-pointer"
                  onClick={() => {
                    setModalImage(project.images[0]);
                    setShowImageModal(true);
                  }}
                />
              </div>
            )}

            {/* Skills */}
            <div className="flex flex-wrap gap-2 mt-3">
              {project.skills.slice(0, 4).map((skill, idx) => (
                <span
                  key={idx}
                  className="bg-[#E0234E]/20 text-[#E0234E] px-3 py-1 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>

            <p className="text-gray-400 text-sm mt-2">Level: {project.level}</p>

            <Link
              href={`/projects/${project._id}`}
              className="inline-block mt-3 bg-[#E0234E] text-white py-2 px-7 text-center rounded-xl hover:bg-[#ff1c51]"
            >
              View Details
            </Link>
          </div>
        ))
      )}
    </div>
  );
};

export default ProjectCard;
