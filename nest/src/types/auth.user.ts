import { Types } from 'mongoose';
import { SkillsProjects } from 'src/enums/project.enum';
import { UserRole, UserLevel, JobTitle, UserBadge } from 'src/enums/user.enum';

export interface AuthUser {
  _id: Types.ObjectId;

  fullname: string;
  email: string;

  password: string;

  role: UserRole;

  avatar: string;
  bio: string;
  web: string;
  phoneNumber: number;

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
}
