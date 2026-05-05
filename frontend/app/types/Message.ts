import type { IUser } from "./user";

export interface Message {
  _id: string;
  senderId: string;
  receiverId: string;
  content?: string;
  image?: string;
  isRead: boolean;
  createdAt: string;
}

export interface ChatStore {

  selectedUser: IUser | null;
  messages: Message[];

  onlineUsers: string[];
  typingUserId: string | null;

  /* -------- Actions -------- */
  selectUser: (user: IUser) => void;

  fetchMessages: (
    receiverId: string,
  ) => Promise<void>;

  sendMessage: (
    receiverId: string,
    content: string,
    image: File | null,
  ) => Promise<void>;

  markAsRead: (
    senderId: string,
  ) => Promise<void>;



  deleteMessage: (
    messageId: string,
  ) => Promise<void>;


  emitTyping: (
    senderId: string,
    receiverId: string,
    isTyping: boolean
  ) => void;

  initSocket: () => void;
}