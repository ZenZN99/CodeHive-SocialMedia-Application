import { BACKEND_URL } from "../user/request";

export const sendMessage = async (
  receiverId: string,
  content?: string,
  image?: File | null,
) => {
  try {
    const formData = new FormData();
    formData.append("receiverId", receiverId);
    if (content) formData.append("content", content);
    if (image) formData.append("image", image);

    const res = await fetch(`${BACKEND_URL}/api/messages`, {
      method: "POST",
      credentials: "include",
      body: formData,
    });

    return await res.json();
  } catch (error) {
    return error;
  }
};

export const getChatMessages = async (receiverId: string) => {
  try {
    const res = await fetch(`${BACKEND_URL}/api/messages/${receiverId}`, {
      method: "GET",
      credentials: "include",
    });

    return await res.json();
  } catch (error) {
    return error;
  }
};

export const deleteMessage = async (messageId: string) => {
  try {
    const res = await fetch(`${BACKEND_URL}/api/messages/${messageId}`, {
      method: "DELETE",
      credentials: "include",
    });

    return await res.json();
  } catch (error) {
    return error;
  }
};

export const markMessageAsRead = async (senderId: string) => {
  try {
    const res = await fetch(`${BACKEND_URL}/api/messages/${senderId}`, {
      method: "PUT",
      credentials: "include",
    });

    return await res.json();
  } catch (error) {
    return error;
  }
};
