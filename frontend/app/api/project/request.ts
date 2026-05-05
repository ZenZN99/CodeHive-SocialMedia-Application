import { BACKEND_URL } from "../user/request";

export const createProject = async (
  body: {
    title: string;
    description: string;
    skills: string[];
    level: string;
    linkDemo?: string;
    linkGitHub?: string;
  },
  images: File[],
) => {
  try {
    const formData = new FormData();

    images.forEach((img) => formData.append("images", img));

    Object.entries(body).forEach(([key, value]) => {
      if (value !== undefined) {
        if (Array.isArray(value)) {
          value.forEach((v) => formData.append(key, v));
        } else {
          formData.append(key, value);
        }
      }
    });

    const res = await fetch(`${BACKEND_URL}/api/projects`, {
      method: "POST",
      credentials: "include",
      body: formData,
    });

    return await res.json();
  } catch (error) {
    return error;
  }
};

export const updateProject = async (
  projectId: string,
  body: Partial<{
    title: string;
    description: string;
    skills: string[];
    level: string;
    linkDemo?: string;
    linkGitHub?: string;
  }>,
  images?: File[],
) => {
  try {
    const formData = new FormData();

    images?.forEach((img) => formData.append("images", img));

    Object.entries(body).forEach(([key, value]) => {
      if (value !== undefined) {
        if (Array.isArray(value)) {
          value.forEach((v) => formData.append(key, v));
        } else {
          formData.append(key, value);
        }
      }
    });

    const res = await fetch(`${BACKEND_URL}/api/projects/${projectId}`, {
      method: "PUT",
      body: formData,
      credentials: "include",
    });

    return await res.json();
  } catch (error) {
    return error;
  }
};

export const deleteProject = async (projectId: string) => {
  try {
    const res = await fetch(`${BACKEND_URL}/api/projects/${projectId}`, {
      method: "DELETE",
      credentials: "include",
    });

    return await res.json();
  } catch (error) {
    return error;
  }
};

export const getAllProjects = async () => {
  try {
    const res = await fetch(`${BACKEND_URL}/api/projects`, {
      method: "GET",
      credentials: "include",
    });
    return await res.json();
  } catch (error) {
    return error;
  }
};

export const getProjectById = async (projectId: string) => {
  try {
    const res = await fetch(`${BACKEND_URL}/api/projects/${projectId}`, {
      method: "GET",
      credentials: "include",
    });
    return await res.json();
  } catch (error) {
    return error;
  }
};

export const getUserProjects = async () => {
  try {
    const res = await fetch(`${BACKEND_URL}/api/projects/me/projects`, {
      method: "GET",
      credentials: "include",
    });

    return await res.json();
  } catch (error) {
    return error;
  }
};
