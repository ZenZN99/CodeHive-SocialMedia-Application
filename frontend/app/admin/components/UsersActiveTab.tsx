"use client";

import UserCard from "@/app/components/users/UserCard";
import { IUser, UserBadge } from "@/app/types/user";
import { useState, ChangeEvent, useMemo } from "react";
import UserNotFound from "@/app/components/users/UserNotFound";

interface UsersActiveTabProps {
  activeTab: string;
  users: IUser[];
  currentUser: IUser | null;
  editingUserId: string | null;
  setEditingUserId: (id: string | null) => void;
  handleDeleteUser: (id: string) => void;
  handleUpdateBadge: (id: string, badge: UserBadge) => void;
}

const UsersActiveTab = ({
  activeTab,
  users,
  currentUser,
  editingUserId,
  setEditingUserId,
  handleDeleteUser,
  handleUpdateBadge,
}: UsersActiveTabProps) => {
  const [searchUser, setSearchUser] = useState("");

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const fullname = user.fullname?.toLowerCase() || "";
      const email = user.email?.toLowerCase() || "";
      const query = searchUser.toLowerCase();

      return fullname.includes(query) || email.includes(query);
    });
  }, [users, searchUser]);

  if (activeTab !== "users") return null;

  return (
    <div>
      <input
        type="text"
        placeholder="Search users..."
        value={searchUser}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setSearchUser(e.target.value)
        }
        className="w-[50%] p-2 mb-6 rounded-lg bg-gray-800 text-white placeholder-gray-400 outline-none"
      />

      {filteredUsers.length === 0 ? (
        <UserNotFound />
      ) : (
        <UserCard
          filteredUsers={filteredUsers}
          currentUser={currentUser}
          editingUserId={editingUserId}
          setEditingUserId={setEditingUserId}
          handleDelete={handleDeleteUser}
          handleUpdateBadge={handleUpdateBadge}
        />
      )}
    </div>
  );
};

export default UsersActiveTab;
