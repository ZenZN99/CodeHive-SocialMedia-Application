"use client";

import { badgeStyles } from "@/app/libs/badge";
import { ProfileRightCardProps } from "@/app/types/props";
import { JobTitles, UserLevels } from "@/app/types/user";

const RightCard = ({
  isEditing,
  form,
  setForm,
  setIsEditing,
  user,
  handleSave,
  handleInputChange,
  saving,
}: ProfileRightCardProps) => {
  return (
    <div className="md:col-span-1 lg:col-span-2 bg-gray-900 border-2 border-gray-800 rounded-3xl p-6 md:p-8 shadow-xl">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 md:mb-6">
        <h2 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2 md:gap-3 flex-col md:flex-row">
          {isEditing ? "Edit Profile" : "About Me"}
          {!isEditing && form.badge && (
            <span
              className={`flex items-center gap-1 px-2 py-1 rounded-full text-sm font-semibold ${
                badgeStyles[form.badge].className
              } text-white`}
            >
              {badgeStyles[form.badge].icon}
              {form.badge}
            </span>
          )}
        </h2>
        {isEditing && (
          <button
            onClick={() => {
              setForm(user!);
              setIsEditing(false);
            }}
            className="mt-2 md:mt-0 text-gray-400 bg-gray-700 py-2 px-4 rounded-xl hover:text-white transition"
          >
            ✕ Cancel
          </button>
        )}
      </div>

      {!isEditing && (
        <div className="bg-gray-800 rounded-2xl p-4 md:p-6 text-gray-300 leading-relaxed">
          {form.bio ? (
            <p>{form.bio}</p>
          ) : (
            <p className="text-gray-500 italic">No bio added yet.</p>
          )}
        </div>
      )}

      {isEditing && (
        <form onSubmit={handleSave} className="space-y-4 md:space-y-5">
          {/* Job Title */}
          <div>
            <label className="block mb-1 font-semibold">Job Title</label>
            <select
              name="jobTitle"
              value={form.jobTitle}
              onChange={handleInputChange}
              className="w-full bg-gray-800 text-white p-3 rounded-xl"
            >
              {Object.values(JobTitles).map((title) => (
                <option key={title} value={title}>
                  {title}
                </option>
              ))}
            </select>
          </div>

          {/* Level */}
          <div>
            <label className="block mb-1 font-semibold">Level</label>
            <select
              name="level"
              value={form.level}
              onChange={handleInputChange}
              className="w-full bg-gray-800 text-white p-3 rounded-xl"
            >
              {Object.values(UserLevels).map((level) => (
                <option key={level} value={level}>
                  {level.toUpperCase()}
                </option>
              ))}
            </select>
          </div>

          {/* Bio */}
          <div>
            <label className="block mb-1 font-semibold">Bio</label>
            <textarea
              name="bio"
              value={form.bio}
              onChange={handleInputChange}
              rows={4}
              className="w-full bg-gray-800 text-white p-3 rounded-xl"
            />
          </div>

          {/* Website & Phone */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
            <input
              type="text"
              name="web"
              value={form.web}
              onChange={handleInputChange}
              placeholder="Website"
              className="bg-gray-800 p-3 rounded-xl"
            />
            <input
              type="text"
              name="phoneNumber"
              value={form.phoneNumber}
              onChange={handleInputChange}
              placeholder="Phone Number"
              className="bg-gray-800 p-3 rounded-xl"
            />
          </div>

          {/* Save */}
          <button
            type="submit"
            disabled={saving}
            className="w-full py-3 bg-[#E0234E] text-white font-bold rounded-2xl hover:bg-[#ff144b] transition"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </form>
      )}
    </div>
  );
};

export default RightCard;
