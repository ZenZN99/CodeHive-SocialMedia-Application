import { ChangeEvent, Dispatch, FormEvent, SetStateAction } from "react";
import { IProject, SkillsProjects } from "./project";
import { IUser, UserBadge } from "./user";
import { IUserRating } from "../projects/[id]/page";
import { IPost } from "./post";
import { IComment } from "./comment";
import { IReply } from "./reply";

// User Card
export interface UserCardProps {
  filteredUsers: IUser[];
  currentUser: IUser | null;
  editingUserId: string | null;
  handleUpdateBadge: (user: string, badge: UserBadge) => void;
  setEditingUserId: (editingUserId: string | null) => void;
  handleDelete: (user: string) => void;
}

// Project Card
export interface ProjectCardProps {
  loading: boolean;
  onlineUsers: string[];
  filteredProjects: IProject[];
  currentUser: IUser | null;
  handleDelete: (projectId: string) => void;
  setModalImage: (url: string) => void;
  setShowImageModal: (val: boolean) => void;
}

// Sidebar Filtered Projects
export interface SidebarFilteredProjectsProps {
  searchSkill: string;
  setSearchSkill: (e: string) => void;
  selectedSkills: SkillsProjects[];
  toggleSkill: (skill: SkillsProjects) => void;
  setSelectedSkills: (skill: SkillsProjects[]) => void;
}

// User Projects Form
export interface UserProjectsFormProps {
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  editingProject: IProject | null;
  projectForm: any;
  handleInputChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => void;
  toggleSkill: (skill: SkillsProjects) => void;
  projectFiles: File[];
  setProjectFiles: (files: File[]) => void;
  handleFilesChange: (e: ChangeEvent<HTMLInputElement>) => void;
  submitting: boolean;
}

// User Projects List
export interface UserProjectsListProps {
  loading: boolean;
  projects: IProject[];
  handleEdit: (p: IProject) => void;
  handleDelete: (pid: string) => void;
}

// Project Details Images Grid
export interface ProjectDetailsImagesGridProps {
  project: IProject;
  setActiveImageIndex: (index: number) => void;
  setShowImageModal: (value: boolean) => void;
}

// Project Details Ratings

export interface ProjectDetailsRatingsProps {
  user: IUser | null;
  averageRating: number;
  ratingCount: number;
  userHasRated: boolean;
  submitting: boolean;
  setSelectedRating: (star: number) => void;
  selectedRating: number | null;
  handleConfirmRating: () => void;
  userRatings: IUserRating[];
}

// Project Details Images Modal
export interface ProjectDetailsImagesModalProps {
  showImageModal: boolean;
  setShowImageModal: (modal: boolean) => void;
  project: IProject;
  activeImageIndex: number;
  setActiveImageIndex: React.Dispatch<React.SetStateAction<number>>;
}

// Profile Left Card
export interface ProfileLeftCardProps {
  form: Partial<IUser>;
  isEditing: boolean;
  handleAvatarChange: (e: ChangeEvent<HTMLInputElement>) => void;
  setIsEditing: (value: boolean) => void;
}

// Profile Right Card
export interface ProfileRightCardProps {
  isEditing: boolean;
  form: Partial<IUser>;
  user: IUser | null;
  setForm: (user: Partial<IUser>) => void;
  setIsEditing: (value: boolean) => void;
  handleSave: (e: FormEvent) => void;
  handleInputChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => void;
  saving: boolean;
}
// Posts Sidebar Filter
export interface PostsSidebarFilterProps {
  searchUser: string;
  setSearchUser: (e: string) => void;
  users: Record<string, IUser>;
}

// Post Card

export interface PostCardProps {
  filteredPosts: IPost[];
  users: Record<string, IUser>;
  onlineUsers: string[];
  currentUser: IUser | null;
  handleDelete: (pid: string) => void;
}

// User Posts Form
export interface UserPostsFormProps {
  handleSubmit: (e: FormEvent) => void;
  editingPost: IPost | null;
  content: string;
  handleContentChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  handleFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
  submitting: boolean;
  loading: boolean;
  handleEdit: (post: IPost) => void;
  handleDelete: (pid: string) => void;
  posts: IPost[];
}

// Post Details Post Section
export interface PostDetialsPostSectionProps {
  postUser: IUser | null;
  post: IPost | null;
  setShowImageModal: (value: boolean) => void;
}

// Post Detials Comment Sidebar
export interface PostDetailsCommentSidebarProps {
  currentUser: IUser | null;
  newComment: string;
  setNewComment: (e: string) => void;
  handleCreateComment: () => void;
  comments: IComment[];
  handleEditComment: (cId: string) => void;
  handleDeleteComment: (cId: string) => void;
  replies: Record<string, IReply[]>;
  handleDeleteReply: (rId: string) => void;
  replyInputs: Record<string, string>;
  setReplyInputs: (value: Record<string, string>) => void;
  handleCreateReply: (cId: string) => void;
}
