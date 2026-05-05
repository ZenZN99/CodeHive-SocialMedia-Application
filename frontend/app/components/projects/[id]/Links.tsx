"use client";
import type { IProject } from '@/app/types/project'
import { FaGithub } from 'react-icons/fa'

interface LinksProps {
  project: IProject;
}

const Links = ({project}: LinksProps) => {
  return (
      <div className="flex flex-col md:flex-row gap-3 mt-6">
        {project.linkDemo && (
          <a
            href={project.linkDemo}
            target="_blank"
            className="inline-block bg-[#E0234E] text-white py-2 px-6 rounded-sm hover:bg-[#ff2255] text-center"
          >
            Visit Project
          </a>
        )}
        {project.linkGitHub && (
          <a
            href={project.linkGitHub}
            target="_blank"
            className="flex items-center justify-center gap-2 bg-[#E0234E] text-white py-2 px-6 rounded-sm hover:bg-[#ff2255]"
          >
            Visit Code <FaGithub />
          </a>
        )}
      </div>
  )
}

export default Links
