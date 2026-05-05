import { BACKEND_URL } from "../user/request";

export const createReply = async (commentId: string, text: string) => {
  try {
    const res = await fetch(`${BACKEND_URL}/api/replies/${commentId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
      credentials: "include",
    });

    return await res.json();
  } catch (error) {
    return error;
  }
};

export const deleteReply = async (replyId: string) => {
  try {
    const res = await fetch(`${BACKEND_URL}/api/replies/${replyId}`, {
      method: "DELETE",
      credentials: "include",
    });

    return await res.json();
  } catch (error) {
    return error;
  }
};

export const getRepliesByComment = async (commentId: string) => {
  try {
    const res = await fetch(`${BACKEND_URL}/api/replies/${commentId}`, {
      method: "GET",
      credentials: "include",
    });

    return await res.json();
  } catch (error) {
    return error;
  }
};
