"use client";
import { useEffect, useState } from "react";
import { getAllUsers, deleteUser } from "../api/user/request";
import { type IUser, type UserBadge } from "../types/user";
import { useAuthStore } from "../stores/useAuthStore";
import { confirmDeleteToast } from "../libs/toast";
import toast from "react-hot-toast";
import AdminDashboardSkeleton from "../components/skeleton/AdminDashboard";
import UserCard from "../components/users/UserCard";
import UserHeader from "../components/users/UserHeader";
import ProtectedRoute from "../routes/ProtectedRoute";

const Users = () => {
  const { user: currentUser } = useAuthStore();
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      const data = await getAllUsers();
      setUsers(Array.isArray(data) ? data : []);
      setLoading(false);
    };
    fetchUsers();
  }, []);

  const handleDelete = (id: string) => {
    confirmDeleteToast(async () => {
      try {
        await deleteUser(id);

        setUsers((prev) => prev.filter((u) => u._id !== id));

        toast.success("User deleted successfully!");
      } catch (error) {
        toast.error("Failed to delete user.");
      }
    }, "Are you sure you want to delete this user?");
  };

  const handleUpdateBadge = (id: string, badge: string) => {
    setUsers((prev) =>
      prev.map((u) => (u._id === id ? { ...u, badge: badge as UserBadge } : u)),
    );
  };

  const filteredUsers = users?.filter((user) =>
    user.fullname.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  if (loading) return <AdminDashboardSkeleton />;

  return (
    <ProtectedRoute>
      <div className="min-h-screen text-gray-300">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <UserHeader searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

          <UserCard
            filteredUsers={filteredUsers}
            currentUser={currentUser}
            editingUserId={editingUserId}
            handleUpdateBadge={handleUpdateBadge}
            setEditingUserId={setEditingUserId}
            handleDelete={handleDelete}
          />
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Users;
