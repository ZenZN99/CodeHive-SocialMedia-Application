import { create } from "zustand";
import type { ChatStore, Message } from "../types/Message";
import {
  deleteMessage,
  getChatMessages,
  markMessageAsRead,
  sendMessage,
} from "../api/message/request";
import { getSocket } from "../socket/socket";


export const useChatStore = create<ChatStore>((set) => ({
  selectedUser: null,
  messages: [],
  onlineUsers: [],
  typingUserId: null,

  selectUser: (user) => {
    set({
      selectedUser: user,
      messages: [],
      typingUserId: null,
    });
  },

  fetchMessages: async (receiverId) => {
    const data = await getChatMessages( receiverId);
    if (!data?.error) {
      set({ messages: data });
    }
  },

  sendMessage: async (receiverId, content, image) => {
    const data = await sendMessage(receiverId, content, image); 
    if (!data?.error) {
      set((state) => ({
        messages: [...state.messages, data.message],
      }));

      const socket = getSocket();
      socket.emit("send-message", {
        message: data.message,
        receiverId,
      });
    }
  },

  markAsRead: async (senderId) => {
    const data = await markMessageAsRead(senderId);
    if (!data?.error) {
      set((state) => ({
        messages: state.messages.map((msg) => {
          return msg.senderId === senderId ? { ...msg, isRead: true } : msg;
        }),
      }));
      getSocket().emit("message-seen", { receiverId: senderId });
    }
  },

  deleteMessage: async (messageId) => {
    const data = await deleteMessage(messageId);
    if (!data?.error) {
      set((state) => ({
        messages: state.messages.filter((msg) => msg._id !== messageId),
      }));
    }
  },

  emitTyping: (_senderId, receiverId, isTyping) => {
    getSocket().emit("typing", { receiverId, isTyping });
  },

  initSocket: () => {
    const socket = getSocket();

    socket.on("receive-message", (message) => {
      set((state) => {
        if (state.selectedUser?._id !== message.senderId) return state;
        return { messages: [...state.messages, message] };
      });
    });

    socket.on("typing", ({ senderId, isTyping }) => {
      set({ typingUserId: isTyping ? senderId : null });
    });

    socket.on("online-users", (users) => {
      set({ onlineUsers: users });
    });

    socket.on("message-seen", ({ receiverId }) => {
      set((state) => ({
        messages: state.messages.map((m: Message) =>
          m.receiverId === receiverId ? { ...m, isRead: true } : m
        ),
      }));
    });
  },
}));
