"use client";
import { FaGlobe, FaPen, FaPlus, FaUserShield } from "react-icons/fa";
import { MdEmail, MdPhone, MdWork } from "react-icons/md";
import InfoItem from "./InfoItem";
import { HiAcademicCap } from "react-icons/hi2";
import { useRouter } from "next/navigation";
import { ProfileLeftCardProps } from "@/app/types/props";

const LeftCard = ({
  form,
  isEditing,
  handleAvatarChange,
  setIsEditing,
}: ProfileLeftCardProps) => {
  const router = useRouter();
  return (
    <div className="bg-gray-900 border-2 border-gray-800 rounded-3xl p-6 shadow-xl flex flex-col items-center text-center">
      {/* Avatar */}
      <div className="relative">
        <img
          src={form.avatar}
          alt="Avatar"
          className="w-32 h-32 md:w-40 md:h-40 rounded-full ring-4 ring-[#E0234E] object-cover"
        />
        {isEditing && (
          <>
            <input
              type="file"
              name="avatar"
              id="avatarUpload"
              onChange={handleAvatarChange}
              className="hidden"
              accept="image/*"
            />
            <label
              htmlFor="avatarUpload"
              className="absolute bottom-2  right-2 flex items-center justify-center w-8 h-8 md:w-9 md:h-9 bg-black/70 text-white rounded-full cursor-pointer hover:bg-[#E0234E] transition"
              title="Change avatar"
            >
              <FaPen size={14} />
            </label>
          </>
        )}
      </div>

      {/* Name */}
      <h1 className="mt-4 md:mt-5 text-xl md:text-2xl font-bold text-white flex items-center justify-center gap-2 md:gap-3">
        {form.fullname}
      </h1>

      {/* Job Title */}
      <p className="mt-1 text-[#E0234E] font-semibold flex items-center gap-1 md:gap-2 justify-center">
        <MdWork />
        {form.jobTitle}
      </p>

      <div className="w-full h-px bg-gray-800 my-4 md:my-5" />

      {/* Info List */}
      <div className="w-full space-y-2 md:space-y-3 text-sm">
        {form.level && (
          <InfoItem icon={<HiAcademicCap />} label="Level" value={form.level} />
        )}
        {form.email && (
          <InfoItem icon={<MdEmail />} label="Email" value={form.email} />
        )}

        {form.phoneNumber && (
          <InfoItem icon={<MdPhone />} label="Phone" value={form.phoneNumber} />
        )}
        {form.role && (
          <InfoItem icon={<FaUserShield />} label="Role" value={form.role} />
        )}
      </div>

      {form.web && (
        <a
          href={form.web}
          target="_blank"
          className="mt-3 md:mt-4 inline-flex items-center justify-center w-10 h-10 rounded-full bg-gray-800 hover:bg-gray-700 transition"
        >
          <FaGlobe className="text-blue-400 text-lg" />
        </a>
      )}

      {!isEditing && (
        <button
          onClick={() => setIsEditing(true)}
          className="mt-4 md:mt-6 cursor-pointer w-full py-2 rounded-xl bg-[#E0234E] text-white font-bold hover:bg-[#ff144b] transition"
        >
          Edit Profile
        </button>
      )}

      <button
        onClick={() => router.push("/projects/user/project")}
        className="mt-4 w-full py-2 cursor-pointer rounded-xl bg-[#E0234E] font-bold hover:bg-[#ff144b] transition flex items-center gap-2 justify-center text-white"
      >
        Add To Project <FaPlus />
      </button>

      <button
        onClick={() => router.push("/posts/user/post")}
        className="mt-4 w-full py-2 cursor-pointer rounded-xl bg-[#E0234E] font-bold hover:bg-[#ff144b] transition flex items-center gap-2 justify-center text-white"
      >
        Add To Post <FaPlus />
      </button>
    </div>
  );
};

export default LeftCard;
