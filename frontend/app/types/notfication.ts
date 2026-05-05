import type { Socket } from "socket.io-client";
import type { IUser } from "./user";

export type NotificationType =  | "comment" | "reply" | "message" | "rating";
export interface Notification {
  _id: string;
  senderId: IUser;
  type: NotificationType;
  targetId: string;
  isRead: boolean;
  createdAt: string;
}

export interface NotificationStore {
  notifications: Notification[];
  unreadCount: number;
  socket: Socket | null;
  setNotifications: (data: Notification[]) => void;
  addNotification: (notification: Notification) => void;
  setUnreadCount: (count: number) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  connectSocket: (userId: string, token: string) => void;
}

export interface Notification {
  _id: string;
  senderId: IUser;
  type: NotificationType;
  targetId: string;
  isRead: boolean;
  createdAt: string;
}

export interface NotificationState {
  notifications: Notification[];
  unreadCount: number;
  addNotification: (notification: Notification) => void;
  setNotifications: (notifications: Notification[]) => void;
  setUnreadCount: (count: number) => void;
  markAsRead: (token:string , id: string) => void;
  markAllAsRead: (token:string) => void;
}