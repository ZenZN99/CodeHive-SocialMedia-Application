import { SkillsProjects } from "./project";

// Roles
export const UserRoles = {
  ADMIN: "Admin",
  USER: "User",
} as const;
export type UserRole = (typeof UserRoles)[keyof typeof UserRoles];

// Levels
export const UserLevels = {
  JUNIOR: "Junior",
  SENIOR: "Senior",
  STAFF: "Staff",
} as const;
export type UserLevel = (typeof UserLevels)[keyof typeof UserLevels];

// Job Titles
export const JobTitles = {
  FULL_STACK: "Full Stack Developer",
  FRONTEND: "Frontend Developer",
  BACKEND: "Backend Developer",
  DEVOPS: "DevOps Engineer",
  SOFTWARE_ENGINEER: "Software Engineer",
  SOFTWARE_DEVELOPER: "Software Developer",
  NONE: "No Job Title",
} as const;
export type JobTitle = (typeof JobTitles)[keyof typeof JobTitles];

export type UserBadge =
  | "Beginner Member"
  | "Active Member"
  | "Engaged Member"
  | "Star Member"
  | "CodeHive Admin";

export interface IUser {
  _id: string;
  fullname: string;
  email: string;
  password: string;
  role: UserRole;
  avatar: string;
  cover: string;
  bio: string;
  web: string;
  phoneNumber: string;
  level: UserLevel;
  jobTitle: JobTitle;
  badge: UserBadge;
  skills: SkillsProjects[];
  socials?: {
    instagram?: string;
    github?: string;
    youtube?: string;
    facebook?: string;
    linkedin?: string;
    website?: string;
  };
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserStore {
  user: IUser | null;
  isLoading: boolean;
  setUser: (user: IUser | null) => void;
  loadUser: () => void;
  logout: () => void;
}
