"use client";
import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { useAuthStore } from "../stores/useAuthStore";
import { updateProfile } from "../api/user/request";
import toast from "react-hot-toast";
import ProfileSkeleton from "../components/skeleton/ProfileSkeleton";
import PageLoading from "../components/PageLoading";
import LeftCard from "../components/profile/LeftCard";
import RightCard from "../components/profile/RightCard";
import { IUser } from "../types/user";
import ProtectedRoute from "../routes/ProtectedRoute";

const Profile = () => {
  const { user, loadUser } = useAuthStore();

  const [form, setForm] = useState<Partial<IUser>>({});

  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      await loadUser();
      setLoading(false);
    };

    fetchUser();
  }, []);

  useEffect(() => {
    if (user) setForm(user);
  }, [user]);
  if (loading) {
    return (
      <PageLoading>
        <ProfileSkeleton />
      </PageLoading>
    );
  }

  const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setAvatarFile(e.target.files[0]);
  };

  const handleSave = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const data = await updateProfile(form, avatarFile);

    if (data?.success) {
      toast.success(data.success);
      loadUser();
      setIsEditing(false);
    } else {
      toast.error("Failed to update profile");
    }

    setSaving(false);
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <ProtectedRoute>
      <div className="text-gray-300">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {/* Left Card */}

            <LeftCard
              form={form}
              isEditing={isEditing}
              handleAvatarChange={handleAvatarChange}
              setIsEditing={setIsEditing}
            />
            {/* Right Card */}
            <RightCard
              isEditing={isEditing}
              form={form}
              setForm={setForm}
              setIsEditing={setIsEditing}
              user={user}
              handleSave={handleSave}
              handleInputChange={handleInputChange}
              saving={saving}
            />
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Profile;
