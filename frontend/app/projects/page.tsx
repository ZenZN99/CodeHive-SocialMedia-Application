"use client";
import { useEffect, useState } from "react";
import type { IProject, SkillsProjects } from "../types/project";
import { type IUser } from "../types/user";
import { deleteProject, getAllProjects } from "../api/project/request";
import { getMe } from "../api/auth/request";
import { MdCancel } from "react-icons/md";
import { useChatStore } from "../stores/useChatStore";
import toast from "react-hot-toast";
import { FaTrash } from "react-icons/fa";
import ProjectCard from "../components/projects/ProjectCard";
import SidebarFilteredProjects from "../components/projects/SidebarFilteredProjects";
import ProtectedRoute from "../routes/ProtectedRoute";
import { getUserById } from "../api/user/request";

interface ProjectWithUser extends IProject {
  user?: IUser;
}

const Projects = () => {
  const [projects, setProjects] = useState<ProjectWithUser[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<ProjectWithUser[]>(
    [],
  );
  const [loading, setLoading] = useState(true);
  const [selectedSkills, setSelectedSkills] = useState<SkillsProjects[]>([]);
  const [searchSkill, setSearchSkill] = useState("");
  const [showImageModal, setShowImageModal] = useState(false);
  const [modalImage, setModalImage] = useState<string | null>(null);
  const { onlineUsers } = useChatStore();
  const [currentUser, setCurrentUser] = useState<IUser | null>(null);

  useEffect(() => {
    const fetchMe = async () => {
      const data = await getMe();
      setCurrentUser(data);
    };

    fetchMe();
  }, []);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getAllProjects();

        const projectsWithUser: ProjectWithUser[] = await Promise.all(
          data.map(async (project: IProject) => {
            try {
              const user = await getUserById(project.userId._id);
              return { ...project, user };
            } catch {
              return { ...project };
            }
          }),
        );

        setProjects(projectsWithUser);
        setFilteredProjects(projectsWithUser);
      } catch {
        toast.error("Failed to fetch projects");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  useEffect(() => {
    if (selectedSkills.length === 0) {
      setFilteredProjects(projects);
    } else {
      const filtered = projects.filter((project) =>
        selectedSkills.every((skill) => project.skills.includes(skill)),
      );
      setFilteredProjects(filtered);
    }
  }, [selectedSkills, projects]);

  const toggleSkill = (skill: SkillsProjects) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill],
    );
  };

  const handleDelete = async (projectId: string) => {
    confirmDeleteToast(async () => {
      const data = await deleteProject(projectId);

      if (data?.success) {
        toast.success(data.success || "Project deleted!");
      } else {
        toast.error("Failed to delete project");
      }

      setProjects((prev) => prev.filter((p) => p._id !== projectId));
      setFilteredProjects((prev) => prev.filter((p) => p._id !== projectId));
    });
  };

  const confirmDeleteToast = (
    onConfirm: () => void,
    message = "Are you sure you want to delete this project?",
  ) => {
    toast.custom((t) => (
      <div className="bg-gray-900 border border-red-700 rounded-xl p-4 w-[320px] shadow-xl">
        <p className="text-white text-sm mb-4">{message}</p>

        <div className="flex justify-end gap-3">
          <button
            onClick={() => toast.dismiss(t.id)}
            className="px-3 py-1 text-sm rounded bg-gray-700 text-white hover:bg-gray-600"
          >
            Cancel
          </button>

          <button
            onClick={() => {
              toast.dismiss(t.id);
              onConfirm();
            }}
            className="px-3 py-1 text-sm rounded bg-red-600 text-white hover:bg-red-500 flex items-center gap-1"
          >
            <FaTrash />
            Delete
          </button>
        </div>
      </div>
    ));
  };

  return (
    <ProtectedRoute>
      <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row gap-6">
        <SidebarFilteredProjects
          searchSkill={searchSkill}
          setSearchSkill={setSearchSkill}
          selectedSkills={selectedSkills}
          toggleSkill={toggleSkill}
          setSelectedSkills={setSelectedSkills}
        />
        <ProjectCard
          loading={loading}
          filteredProjects={filteredProjects}
          onlineUsers={onlineUsers}
          currentUser={currentUser}
          handleDelete={handleDelete}
          setModalImage={setModalImage}
          setShowImageModal={setShowImageModal}
        />

        {/* Modal */}
        {showImageModal && modalImage && (
          <div
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center"
            onClick={() => setShowImageModal(false)}
          >
            <div
              className="relative max-w-4xl w-full px-4"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowImageModal(false)}
                className="absolute -top-10 right-2 text-white text-3xl hover:text-[#E0234E]"
              >
                <MdCancel />
              </button>
              <img
                src={modalImage}
                alt="project"
                className="w-full max-h-[80vh] object-contain rounded-xl"
              />
            </div>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
};

export default Projects;
