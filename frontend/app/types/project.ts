import type { IUser, UserLevel } from "./user";

export type SkillsProjects =
  | "HTML"
  | "CSS"
  | "SCSS"
  | "JavaScript"
  | "TypeScript"
  | "React"
  | "Angular"
  | "Vue"
  | "Svelte"
  | "NextJS"
  | "NuxtJS"
  | "Redux"
  | "Zustand"
  | "Tailwind"
  | "Bootstrap"
  | "MaterialUI"
  | "ChakraUI"
  | "AntDesign"

  // Back-End
  | "NodeJS"
  | "BunJs"
  | "NestJS"
  | "ExpressJS"
  | "Koa"
  | "Go"
  | "Gin"
  | "Fastify"
  | "Python"
  | "Django"
  | "Flask"
  | "Ruby"
  | "Rails"
  | "Java"
  | "SpringBoot"
  | "PHP"
  | "Laravel"

  // Databases
  | "MongoDB"
  | "MySQL"
  | "PostgreSQL"
  | "SQLite"
  | "Redis"

  // DevOps & Tools
  | "Docker"
  | "Kubernetes"
  | "Git"
  | "GitHub"
  | "GitLab"
  | "CI/CD"
  | "AWS"
  | "Azure"
  | "GCP"
  | "Firebase"
  | "Vercel"
  | "Netlify"
  | "Render"

  // Other
  | "GraphQL"
  | "REST API"
  | "WebSockets"
  | "JWT"
  | "Testing"
  | "Jest"
  | "Cypress";

export interface IProject {
  _id: string;
  userId: IUser;
  title: string;
  description: string;
  images: string[];
  skills: SkillsProjects[];
  level: UserLevel;
  linkDemo?: string;
  linkGitHub?: string;
  createdAt: Date;
  updatedAt: Date;
}
