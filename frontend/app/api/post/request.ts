import { BACKEND_URL } from "../user/request";

export const createPost = async (
  content: string,
  userId: string,
  image?: File | null,
) => {
  try {
    const formData = new FormData();
    formData.append("content", content);
    formData.append("userId", userId);
    if (image) formData.append("image", image);

    const res = await fetch(`${BACKEND_URL}/api/posts`, {
      method: "POST",
      body: formData,
      credentials: "include",
    });

    return await res.json();
  } catch (error) {
    return error;
  }
};

export const updatePost = async (
  postId: string,
  content?: string,
  image?: File | null,
) => {
  try {
    const formData = new FormData();
    if (content !== undefined) formData.append("content", content);
    if (image) formData.append("image", image);

    const res = await fetch(`${BACKEND_URL}/api/posts/${postId}`, {
      method: "PUT",
      body: formData,
      credentials: "include",
    });

    return await res.json();
  } catch (error) {
    return error;
  }
};

export const deletePost = async (postId: string) => {
  try {
    const res = await fetch(`${BACKEND_URL}/api/posts/${postId}`, {
      method: "DELETE",
      credentials: "include",
    });

    return await res.json();
  } catch (error) {
    return error;
  }
};

export const getAllPosts = async () => {
  try {
    const res = await fetch(`${BACKEND_URL}/api/posts`, {
      method: "GET",
      credentials: "include",
    });
    return await res.json();
  } catch (error) {
    return error;
  }
};

export const getPostById = async (postId: string) => {
  try {
    const res = await fetch(`${BACKEND_URL}/api/posts/${postId}`, {
      method: "GET",
      credentials: "include",
    });
    return await res.json();
  } catch (error) {
    return error;
  }
};

export const getPostsByUser = async (userId: string) => {
  try {
    const res = await fetch(`${BACKEND_URL}/api/posts/user/${userId}`, {
      method: "GET",
      credentials: "include",
    });
    return await res.json();
  } catch (error) {
    return error;
  }
};
