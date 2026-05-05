"use client";
import { useState } from "react";
import { updateUserBadge } from "../api/user/request";
import { UserRoles, type IUser, type UserBadge } from "../types/user";
import { useAuthStore } from "../stores/useAuthStore";
import toast from "react-hot-toast";
interface BadgeEditorProps {
  user: IUser;
  onUpdate: (badge: UserBadge) => void;
}

const BadgeEditor = ({ user, onUpdate }: BadgeEditorProps) => {
  const { user: currentUser } = useAuthStore();

  const [newBadge, setNewBadge] = useState<UserBadge | "">("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  if (currentUser?.role !== UserRoles.ADMIN) return null;

  const handleUpdate = async () => {
    if (!newBadge) return;
    setLoading(true);
    setErrorMessage("");
    try {
      const data = await updateUserBadge(user._id, newBadge);
      if (data?.success) {
        toast.success(data?.success);
        onUpdate(newBadge);
      }
    } catch (err: any) {
      setErrorMessage("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="my-4 flex items-center gap-2">
      <select
        value={newBadge}
        onChange={(e) => setNewBadge(e.target.value as UserBadge)}
        className="p-2 rounded bg-gray-800 text-gray-200"
      >
        <option value="Beginner Member">Beginner Member</option>
        <option value="Active Member">Active Member</option>
        <option value="Engaged Member">Engaged Member</option>
        <option value="Star Member">Star Member</option>
        <option value="CodeHive Admin">CodeHive Admin</option>
      </select>
      <button
        onClick={handleUpdate}
        disabled={loading || !newBadge}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mt-2 disabled:opacity-50"
      >
        {loading ? "Updating..." : "Update Badge"}
      </button>
      {errorMessage && <p className="text-red-400 text-sm">{errorMessage}</p>}
    </div>
  );
};

export default BadgeEditor;
