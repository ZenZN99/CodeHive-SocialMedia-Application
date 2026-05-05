"use client";
import { IProject } from "@/app/types/project";

interface SkillsProp {
  project: IProject;
}

const Skills = ({ project }: SkillsProp) => {
  return (
    <div>
      <div className="flex flex-wrap gap-2 mt-4">
        {project.skills.map((skill, idx) => (
          <span
            key={idx}
            className="bg-[#E0234E]/20 text-[#E0234E] px-3 py-1 rounded-full text-sm md:text-base"
          >
            {skill}
          </span>
        ))}
      </div>
      <p className="text-gray-400 mt-2">Level: {project.level}</p>
    </div>
  );
};

export default Skills;
