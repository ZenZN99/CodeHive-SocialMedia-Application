export const BACKEND_URL = "http://localhost:7000";  

export const updateProfile = async (
  body: FormData | any,
  avatar: File | null,
) => {
  try {
    const formData = new FormData();
    if (avatar) formData.append("avatar", avatar);

    for (const key in body) {
      if (body[key] !== undefined) formData.append(key, body[key]);
    }

    const res = await fetch(`${BACKEND_URL}/api/users`, {
      method: "PUT",
      body: formData,
      credentials: "include",
    });

    return await res.json();
  } catch (error) {
    return error;
  }
};

export const getAllUsers = async () => {
  try {
    const res = await fetch(`${BACKEND_URL}/api/users`, {
      method: "GET",
      credentials: "include",
    });
    return await res.json();
  } catch (error) {
    return error;
  }
};

export const getUserById = async (id: string) => {
  try {
    const res = await fetch(`${BACKEND_URL}/api/users/${id}`, {
      method: "GET",
      credentials: "include",
    });
    return await res.json();
  } catch (error) {
    return error;
  }
};

export const deleteUser = async (id: string) => {
  try {
    const res = await fetch(`${BACKEND_URL}/api/users/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    return await res.json();
  } catch (error) {
    return error;
  }
};

export const updateUserBadge = async (id: string, badge: string) => {
  try {
    const res = await fetch(`${BACKEND_URL}/api/users/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ badge }),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Failed to update badge");
    }

    return await res.json();
  } catch (error) {
    return error;
  }
};
