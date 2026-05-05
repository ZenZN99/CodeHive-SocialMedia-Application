"use client";
import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import toast from "react-hot-toast";
import {
  getUserProjects,
  createProject,
  updateProject,
  deleteProject,
} from "@/app/api/project/request";
import { IProject, SkillsProjects } from "@/app/types/project";
import { UserLevel, UserLevels } from "@/app/types/user";
import { confirmDeleteToast } from "@/app/libs/toast";
import UserProjectSkeleton from "@/app/components/skeleton/UserProjectSkeleton";
import Form from "@/app/components/projects/user/Form";
import List from "@/app/components/projects/user/List";
import ProtectedRoute from "@/app/routes/ProtectedRoute";

const UserProject = () => {
  const [projects, setProjects] = useState<IProject[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [editingProject, setEditingProject] = useState<IProject | null>(null);

  const [projectForm, setProjectForm] = useState<{
    title: string;
    description: string;
    skills: SkillsProjects[];
    level: UserLevel;
    linkDemo: string;
    linkGitHub: string;
  }>({
    title: "",
    description: "",
    skills: [],
    level: UserLevels.JUNIOR,
    linkDemo: "",
    linkGitHub: "",
  });

  const [projectFiles, setProjectFiles] = useState<File[]>([]);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const data = await getUserProjects();
      if (data?.error || data?.message) {
        toast.error(data?.error || data?.message);
      }
      setProjects(Array.isArray(data) ? data : []);
    } catch {
      toast.error("Failed to load projects");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setProjectForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFilesChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const selectedFiles = Array.from(e.target.files);

    if (projectFiles.length + selectedFiles.length > 5) {
      toast.error("You can upload up to 5 images only");
      return;
    }

    setProjectFiles((prev) => [...prev, ...selectedFiles]);
  };

  const toggleSkill = (skill: SkillsProjects) => {
    setProjectForm((prev) => {
      const exists = prev.skills.includes(skill);

      if (!exists && prev.skills.length >= 5) {
        toast.error("You can select up to 5 skills");
        return prev;
      }

      return {
        ...prev,
        skills: exists
          ? prev.skills.filter((s) => s !== skill)
          : [...prev.skills, skill],
      };
    });
  };

  const resetForm = () => {
    setProjectForm({
      title: "",
      description: "",
      skills: [],
      level: UserLevels.JUNIOR,
      linkDemo: "",
      linkGitHub: "",
    });
    setProjectFiles([]);
    setEditingProject(null);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (submitting) return;

    if (!projectForm.title.trim()) {
      toast.error("Title is required");
      return;
    }

    if (!projectForm.description.trim()) {
      toast.error("Description is required");
      return;
    }

    if (projectForm.skills.length < 1) {
      toast.error("Please select at least 1 skill");
      return;
    }

    if (projectFiles.length < 1) {
      toast.error("At least one image is required");
      return;
    }

    try {
      setSubmitting(true);

      if (editingProject) {
        await updateProject(editingProject._id, projectForm, projectFiles);
        toast.success("Project updated");
      } else {
        await createProject(projectForm, projectFiles);
        toast.success("Project created");
      }

      resetForm();
      fetchProjects();
    } catch {
      toast.error("Operation failed");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = (id: string) => {
    confirmDeleteToast(async () => {
      try {
        await deleteProject(id);
        setProjects((prev) => prev.filter((p) => p._id !== id));
        toast.success("Project deleted");
      } catch {
        toast.error("Failed to delete project");
      }
    }, "Do you really want to delete this project?");
  };

  const handleEdit = (project: IProject) => {
    setEditingProject(project);
    setProjectForm({
      title: project.title,
      description: project.description,
      skills: project.skills,
      level: project.level,
      linkDemo: project.linkDemo || "",
      linkGitHub: project.linkGitHub || "",
    });
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (loading) return <UserProjectSkeleton />;

  return (
    <ProtectedRoute>
      <div className="text-gray-300">
        <div className="max-w-6xl mx-auto px-6 py-20  gap-10">
          {/* RIGHT */}
          <div className="md:col-span-2 bg-gray-900 border-2 border-gray-800 rounded-3xl p-8">
            {/* FORM */}
            <Form
              handleSubmit={handleSubmit}
              editingProject={editingProject}
              projectForm={projectForm}
              handleInputChange={handleInputChange}
              toggleSkill={toggleSkill}
              projectFiles={projectFiles}
              handleFilesChange={handleFilesChange}
              setProjectFiles={setProjectFiles}
              submitting={submitting}
            />

            {/* LIST */}
            <List
              loading={loading}
              projects={projects}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default UserProject;
