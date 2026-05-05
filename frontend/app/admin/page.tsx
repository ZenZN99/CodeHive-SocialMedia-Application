"use client";

import { useEffect, useState } from "react";
import { IUser } from "../types/user";
import { IPost } from "../types/post";
import { IProject } from "../types/project";
import { useAuthStore } from "../stores/useAuthStore";
import { getAllUsers, deleteUser, updateUserBadge } from "../api/user/request";
import { getAllPosts, deletePost } from "../api/post/request";
import { getAllProjects, deleteProject } from "../api/project/request";
import { confirmDeleteToast } from "../libs/toast";
import toast from "react-hot-toast";
import { UserBadge } from "../types/user";
import Sidebar from "./components/Sidebar";
import UsersActiveTab from "./components/UsersActiveTab";
import PostActiveTab from "./components/PostActiveTab";
import ProjectActiveTab from "./components/ProjectActiveTab";
import ProtectedRoute from "../routes/ProtectedRoute";

const AdminDashboard = () => {
  const { user: currentUser } = useAuthStore();

  const [activeTab, setActiveTab] = useState<"users" | "posts" | "projects">(
    "users",
  );
  const [users, setUsers] = useState<IUser[]>([]);
  const [posts, setPosts] = useState<IPost[]>([]);
  const [projects, setProjects] = useState<IProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingUserId, setEditingUserId] = useState<string | null>(null);

  const [expandedPosts, setExpandedPosts] = useState<string[]>([]);
  const [expandedProjects, setExpandedProjects] = useState<string[]>([]);

  useEffect(() => {
    setLoading(true);

    const fetchData = async () => {
      try {
        const [usersData, postsData, projectsData] = await Promise.all([
          getAllUsers(),
          getAllPosts(),
          getAllProjects(),
        ]);
        setUsers(usersData || []);
        setPosts(postsData || []);
        setProjects(projectsData || []);
      } catch {
        toast.error("Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDeleteUser = (id: string) => {
    confirmDeleteToast(async () => {
      const data = await deleteUser(id);
      if (data?.success) {
        setUsers((prev) => prev.filter((u) => u._id !== id));
        toast.success("User deleted");
      } else toast.error("Failed to delete user");
    }, "Are you sure you want to delete this user?");
  };

  const handleDeletePost = (id: string) => {
    confirmDeleteToast(async () => {
      const data = await deletePost(id);
      if (data?.success) {
        setPosts((prev) => prev.filter((p) => p._id !== id));
        toast.success("Post deleted");
      } else toast.error("Failed to delete post");
    }, "Are you sure you want to delete this post?");
  };

  const handleDeleteProject = (id: string) => {
    confirmDeleteToast(async () => {
      const data = await deleteProject(id);
      if (data?.success) {
        setProjects((prev) => prev.filter((p) => p._id !== id));
        toast.success("Project deleted");
      } else toast.error("Failed to delete project");
    }, "Are you sure you want to delete this project?");
  };

  const handleUpdateBadge = (id: string, badge: UserBadge) => {
    setUsers((prev) => prev.map((u) => (u._id === id ? { ...u, badge } : u)));
    updateUserBadge(id, badge);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950">
        <div className="w-16 h-16 border-4 border-gray-700 border-t-[#E0234E] rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <ProtectedRoute adminOnly>
      <div className="min-h-screen flex text-gray-300 bg-gray-950">
        {/* Sidebar */}
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Main Content */}
        <div className="flex-1 p-6 overflow-y-auto">
          <UsersActiveTab
            activeTab={activeTab}
            users={users}
            currentUser={currentUser}
            editingUserId={editingUserId}
            setEditingUserId={setEditingUserId}
            handleDeleteUser={handleDeleteUser}
            handleUpdateBadge={handleUpdateBadge}
          />

          <PostActiveTab
            activeTab={activeTab}
            posts={posts}
            expandedPosts={expandedPosts}
            setExpandedPosts={setExpandedPosts}
            handleDeletePost={handleDeletePost}
          />

          <ProjectActiveTab
            activeTab={activeTab}
            projects={projects}
            expandedProjects={expandedProjects}
            setExpandedProjects={setExpandedProjects}
            handleDeleteProject={handleDeleteProject}
          />
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default AdminDashboard;
