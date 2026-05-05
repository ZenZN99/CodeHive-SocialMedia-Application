import type { Message } from "./Message";
import type { IUser } from "./user";

export interface SidebarProps {
  users: IUser[];
  search: string;
  setSearch: (v: string) => void;
  selectedUser: IUser | null;
  onlineUsers: string[];
  selectUser: (user: IUser) => void;
  user: IUser;
  logout: () => void;
}

export interface ChatHeaderProps {
  selectedUser: IUser;
  onlineUsers: string[];
  typingUserId: string | null;
  navigate: any;
}

export interface MessageListProps {
  messages: Message[];
  user: IUser;
  deleteMessage: (id: string) => void;
}

export interface ChatInputProps {
  message: string;
  setMessage: (v: string) => void;
  handleSend: () => void;
  handleTyping: (v: string) => void;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  showEmoji: boolean;
  setShowEmoji: (v: boolean) => void;
}