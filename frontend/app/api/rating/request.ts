import { BACKEND_URL } from "../user/request";

export const rateProject = async (projectId: string, value: number) => {
  try {
    const res = await fetch(`${BACKEND_URL}/api/ratings/${projectId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ value }),
      credentials: "include",
    });

    return await res.json();
  } catch (error) {
    return error;
  }
};

export const getProjectRating = async (projectId: string) => {
  try {
    const res = await fetch(`${BACKEND_URL}/api/ratings/${projectId}`, {
      method: "GET",
      credentials: "include",
    });

    return await res.json();
  } catch (error) {
    return error;
  }
};
