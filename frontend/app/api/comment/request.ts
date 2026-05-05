import { BACKEND_URL } from "../user/request";

export const createComment = async (postId: string, text: string) => {
  try {
    const res = await fetch(`${BACKEND_URL}/api/comments/${postId}`, {
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

export const updateComment = async (commentId: string, text: string) => {
  try {
    const res = await fetch(`${BACKEND_URL}/api/comments/${commentId}`, {
      method: "PUT",
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

export const deleteComment = async (commentId: string) => {
  try {
    const res = await fetch(`${BACKEND_URL}/api/comments/${commentId}`, {
      method: "DELETE",
      credentials: "include",
    });

    return await res.json();
  } catch (error) {
    return error;
  }
};

export const getCommentsByPost = async (postId: string) => {
  try {
    const res = await fetch(`${BACKEND_URL}/api/comments/${postId}`, {
      method: "GET",
      credentials: "include",
    });

    return await res.json();
  } catch (error) {
    return error;
  }
};
