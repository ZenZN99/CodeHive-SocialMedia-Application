"use client";

import { useState, useMemo } from "react";
import { IProject } from "@/app/types/project";
import { FaTrash } from "react-icons/fa";
import ProjectNotFound from "@/app/components/projects/ProjectNotFound";

interface ProjectActiveTabProps {
  activeTab: string;
  projects: IProject[];
  expandedProjects: string[];
  setExpandedProjects: (ids: string[]) => void;
  handleDeleteProject: (id: string) => void;
}

const ProjectActiveTab = ({
  activeTab,
  projects,
  expandedProjects,
  setExpandedProjects,
  handleDeleteProject,
}: ProjectActiveTabProps) => {
  const [searchProject, setSearchProject] = useState("");

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const title = project.title?.toLowerCase() || "";
      const content = project.description?.toLowerCase() || "";
      const skills = project.skills?.map((s) => s.toLowerCase()) || [];
      const query = searchProject.toLowerCase();

      return (
        title.includes(query) ||
        content.includes(query) ||
        skills.some((skill) => skill.includes(query))
      );
    });
  }, [projects, searchProject]);

  if (activeTab !== "projects") return null;

  return (
    <div>
      {/* Search Input */}
      <input
        type="text"
        placeholder="Search projects..."
        value={searchProject}
        onChange={(e) => setSearchProject(e.target.value)}
        className="w-full md:w-1/2 p-2 mb-6 rounded-lg bg-gray-800 text-white placeholder-gray-400 outline-none"
      />

      {filteredProjects.length === 0 ? (
        <ProjectNotFound />
      ) : (
        <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
          {filteredProjects.map((project) => {
            const isExpanded = expandedProjects.includes(project._id);
            const isLong = project.description?.length > 200;
            const content =
              isExpanded || !isLong
                ? project.description
                : project.description?.slice(0, 200) + "...";

            return (
              <div
                key={project._id}
                className="bg-gray-900 border-2 border-gray-800 rounded-3xl p-4 shadow-xl flex flex-col"
              >
                {project.images?.[0] && (
                  <img
                    src={project.images[0]}
                    alt="project image"
                    className="rounded-lg mb-2"
                  />
                )}
                <h3 className="text-white font-bold mb-2">{project.title}</h3>
                <p className="text-gray-300 mb-2">{content}</p>

                {isLong && (
                  <button
                    className="text-blue-400 text-sm hover:underline mb-2"
                    onClick={() =>
                      setExpandedProjects(
                        isExpanded
                          ? expandedProjects.filter((id) => id !== project._id)
                          : [...expandedProjects, project._id]
                      )
                    }
                  >
                    {isExpanded ? "Show Less" : "Read More"}
                  </button>
                )}

                <div className="flex flex-wrap gap-1 mb-2">
                  {project.skills?.map((skill, i) => (
                    <span
                      key={i}
                      className="bg-blue-600 text-white text-xs px-2 py-1 rounded"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="flex justify-end gap-2 mt-2">
                  <button
                    className="bg-gray-700 p-2 rounded-full hover:bg-gray-600"
                    onClick={() => handleDeleteProject(project._id)}
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ProjectActiveTab;
