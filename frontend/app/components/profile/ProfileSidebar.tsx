import { MdEmail, MdPhone, MdWork } from "react-icons/md";
import InfoItem from "./InfoItem";
import { FaGlobe, FaUserShield } from "react-icons/fa";
import { HiAcademicCap } from "react-icons/hi2";
import { IUser } from "@/app/types/user";

interface ProfileSidebarProps {
  user: IUser;
  onlineUsers: string[];
}

const ProfileSidebar = ({ user, onlineUsers }: ProfileSidebarProps) => {
  return (
    <div className="bg-gray-900 border-2 border-gray-800 rounded-3xl p-6 shadow-xl flex flex-col items-center text-center">
      <div className="relative">
        <img
          src={user.avatar || "/default-avatar.png"}
          alt={user.fullname || "User Avatar"}
          className="w-40 h-40 rounded-full ring-4 ring-[#E0234E] object-cover"
        />

        {/* Online Dot */}
        <div className="relative">
          {user._id && onlineUsers.includes(user._id) && (
            <span className="group relative">
              <span className="absolute bottom-2 left-12 w-4 h-4 bg-[lime] border-2 border-gray-900 rounded-full" />

              <span className="absolute bottom-6 left-5 transform translate-x-1/2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                Online
              </span>
            </span>
          )}
        </div>
      </div>

      {/* Name */}
      <h1 className="mt-5 text-2xl font-bold text-white">{user.fullname}</h1>

      {/* Job Title */}
      {user.jobTitle && (
        <p className="mt-1 text-[#E0234E] font-semibold flex items-center gap-2 justify-center">
          <MdWork />
          {user.jobTitle}
        </p>
      )}

      {/* Divider */}
      <div className="w-full h-px bg-gray-800 my-5" />

      {/* Info List */}
      <div className="w-full space-y-3 text-sm">
        {user.level && (
          <InfoItem icon={<HiAcademicCap />} label="Level" value={user.level} />
        )}
        {user.email && (
          <InfoItem icon={<MdEmail />} label="Email" value={user.email} />
        )}
        {user.phoneNumber && (
          <InfoItem icon={<MdPhone />} label="Phone" value={user.phoneNumber} />
        )}
        {user.role && (
          <InfoItem icon={<FaUserShield />} label="Role" value={user.role} />
        )}
      </div>

      {/* Website */}
      {user.web && (
        <a
          href={user.web}
          target="_blank"
          className="mt-3 md:mt-4 inline-flex items-center justify-center w-10 h-10 rounded-full bg-gray-800 hover:bg-gray-700 transition"
        >
          <FaGlobe className="text-blue-400 text-lg" />
        </a>
      )}
    </div>
  );
};

export default ProfileSidebar;
