"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { IUser } from "@/app/types/user";
import { useChatStore } from "@/app/stores/useChatStore";
import ProfileSkeleton from "@/app/components/skeleton/ProfileSkeleton";
import { getUserById } from "@/app/api/user/request";
import UserNotFound from "@/app/components/users/UserNotFound";
import ProtectedRoute from "@/app/routes/ProtectedRoute";
import ProfileSidebar from "@/app/components/profile/ProfileSidebar";
import ProfileAbout from "@/app/components/profile/ProfileAbout";
const UserProfile = () => {
  const { id } = useParams();
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);
  const { onlineUsers } = useChatStore();
  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      const data = await getUserById(id as string);
      setUser(data);
      setLoading(false);
    };
    fetchUser();
  }, [id]);

  if (loading) return <ProfileSkeleton />;

  if (!user) return <UserNotFound />;

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-950 text-gray-300">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="flex flex-col gap-10 xl:grid xl:grid-cols-3">
            {/* ================= LEFT SIDE ================= */}
            <ProfileSidebar user={user} onlineUsers={onlineUsers} />

          <ProfileAbout user={user}/>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default UserProfile;
