"use client";

import { SKILLS } from "@/app/libs/skills";
import { SidebarFilteredProjectsProps } from "@/app/types/props";

const SidebarFilteredProjects = ({
  searchSkill,
  setSearchSkill,
  selectedSkills,
  toggleSkill,
  setSelectedSkills,
}: SidebarFilteredProjectsProps) => {
  const displayedSkills = SKILLS.filter((skill) =>
    skill.toLowerCase().includes(searchSkill.toLowerCase())
  );

  return (
    <div className="w-full md:w-64 shrink-0 bg-gray-900 border-2 border-gray-800 p-5 rounded-2xl h-fit md:sticky md:top-20">
      <h2 className="text-white font-bold mb-4">Filter by Skills</h2>
      <input
        type="text"
        placeholder="Search skills..."
        value={searchSkill}
        onChange={(e) => setSearchSkill(e.target.value)}
        className="w-full mb-4 px-3 py-2 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E0234E]"
      />

      <div className="flex flex-col gap-2 max-h-[60vh] overflow-y-auto">
        {displayedSkills.map((skill) => (
          <label
            key={skill}
            className="flex items-center gap-2 text-gray-300 hover:text-white cursor-pointer"
          >
            <input
              type="checkbox"
              checked={selectedSkills.includes(skill)}
              onChange={() => toggleSkill(skill)}
              className="accent-[#E0234E] cursor-pointer"
            />
            {skill}
          </label>
        ))}
      </div>

      {selectedSkills.length > 0 && (
        <button
          onClick={() => setSelectedSkills([])}
          className="mt-4 bg-[#E0234E] text-white px-3 py-1 rounded hover:bg-[#ff1c51]"
        >
          Clear Filters
        </button>
      )}
    </div>
  );
};

export default SidebarFilteredProjects;
