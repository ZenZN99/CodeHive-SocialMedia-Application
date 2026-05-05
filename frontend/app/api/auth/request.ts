import { BACKEND_URL } from "../user/request";

export const signup = async (
  fullname: string,
  email: string,
  password: string,
) => {
  try {
    const res = await fetch(`${BACKEND_URL}/api/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fullname, email, password }),
      credentials: "include",
    });
    return await res.json();
  } catch (error) {
    return error;
  }
};

export const login = async (email: string, password: string) => {
  try {
    const res = await fetch(`${BACKEND_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
      credentials: "include",
    });
    return await res.json();
  } catch (error) {
    return error;
  }
};

export const logout = async () => {
  try {
    const res = await fetch(`${BACKEND_URL}/api/auth/logout`, {
      method: "POST",
      credentials: "include",
    });
    return await res.json();
  } catch (error) {
    return error;
  }
};

export const getMe = async () => {
  try {
    const res = await fetch(`${BACKEND_URL}/api/auth/me`, {
      method: "GET",
      credentials: "include",
    });
    return await res.json();
  } catch (error) {
    return error;
  }
};
