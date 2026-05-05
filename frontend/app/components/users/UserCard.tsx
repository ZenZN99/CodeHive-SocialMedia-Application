"use client";
import { UserCardProps } from "@/app/types/props";
import UserNotFound from "./UserNotFound";
import Link from "next/link";
import { FaEdit, FaGlobe, FaTrash, FaUserShield } from "react-icons/fa";
import InfoItem from "../profile/InfoItem";
import { MdEmail, MdPhone, MdWork } from "react-icons/md";
import { HiAcademicCap } from "react-icons/hi2";
import { badgeStyles } from "@/app/libs/badge";
import { UserRoles } from "@/app/types/user";
import BadgeEditor from "../BadgeEditor";

const UserCard = ({
  filteredUsers,
  currentUser,
  editingUserId,
  handleUpdateBadge,
  setEditingUserId,
  handleDelete,
}: UserCardProps) => {
  return (
    <div>
      {filteredUsers.length === 0 ? (
        <UserNotFound />
      ) : (
        <div className="grid gap-8 lg:grid-cols-2 xl:grid-cols-3">
          {filteredUsers.map((user) => (
            <div
              key={user._id}
              className="bg-gray-900 border-2 border-gray-800 rounded-3xl p-6 shadow-xl flex flex-col items-center text-center relative"
            >
              {/* Avatar */}
              <div className="relative">
                <Link href={`/profile/${user._id}`}>
                  <img
                    src={user.avatar || "/default-avatar.png"}
                    alt={user.fullname || "User Avatar"}
                    className="w-32 h-32 rounded-full ring-4 ring-[#E0234E] object-cover"
                  />
                </Link>
              </div>

              {/* Name & Role */}
              <h2 className="mt-4 text-xl font-bold text-white">
                {user.fullname}
              </h2>
              {user.role && (
                <p className="mt-1 text-[#E0234E] font-semibold flex items-center gap-2 justify-center">
                  <FaUserShield />
                  {user.role}
                </p>
              )}

              {/* Info */}
              <div className="w-full mt-4 space-y-2 text-sm">
                {user.email && (
                  <InfoItem
                    icon={<MdEmail />}
                    label="Email"
                    value={user.email}
                  />
                )}
                {user.phoneNumber && (
                  <InfoItem
                    icon={<MdPhone />}
                    label="Phone"
                    value={user.phoneNumber}
                  />
                )}
                {user.jobTitle && (
                  <InfoItem
                    icon={<MdWork />}
                    label="Job"
                    value={user.jobTitle}
                  />
                )}
                {user.level && (
                  <InfoItem
                    icon={<HiAcademicCap />}
                    label="Level"
                    value={user.level}
                  />
                )}
              </div>

              {/* Website */}
              {user.web && (
                <a
                  href={user.web}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 flex items-center gap-2 text-blue-400 hover:text-blue-300 transition text-sm"
                >
                  <FaGlobe />
                  {user.web}
                </a>
              )}

              {/* Badge */}
              <div className="mt-4 flex items-center gap-2">
                {user.badge ? (
                  <span
                    className={`flex items-center gap-1 px-2 py-1 rounded-full text-sm font-semibold ${
                      badgeStyles[user.badge]?.className
                    } text-white`}
                  >
                    {badgeStyles[user.badge]?.icon}
                    {user.badge}
                  </span>
                ) : (
                  <span className="text-gray-500 text-sm italic">No badge</span>
                )}
              </div>

              {/* Actions */}
              {currentUser?.role === UserRoles.ADMIN && (
                <div className="absolute top-4 right-4 flex gap-2">
                  <button
                    onClick={() =>
                      setEditingUserId(
                        editingUserId === user._id ? null : user._id,
                      )
                    }
                    className="bg-[#E0234E] p-2  cursor-pointer rounded-full hover:bg-red-700 transition"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="bg-gray-700 p-2  cursor-pointer rounded-full hover:bg-gray-600 transition"
                  >
                    <FaTrash />
                  </button>
                </div>
              )}

              {/* Badge Editor */}
              {editingUserId === user._id && (
                <BadgeEditor
                  user={user}
                  onUpdate={(badge) => handleUpdateBadge(user._id, badge)}
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserCard;
