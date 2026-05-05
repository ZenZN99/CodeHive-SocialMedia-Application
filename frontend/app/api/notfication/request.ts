import { BACKEND_URL } from "../user/request";

export const getMyNotifications = async () => {
  try {
    const res = await fetch(`${BACKEND_URL}/api/notifications`, {
      method: "GET",
      credentials: "include",
    });
    return await res.json();
  } catch (error) {
    return error;
  }
};

export const getUnreadNotificationsCount = async () => {
  try {
    const res = await fetch(`${BACKEND_URL}/api/notifications/unread-count`, {
      method: "GET",
      credentials: "include",
    });
    return await res.json();
  } catch (error) {
    return error;
  }
};

export const markNotificationAsRead = async (notificationId: string) => {
  try {
    const res = await fetch(
      `${BACKEND_URL}/api/notifications/${notificationId}/read`,
      {
        method: "PUT",
        credentials: "include",
      },
    );
    return await res.json();
  } catch (error) {
    return error;
  }
};

export const markAllNotificationsAsRead = async () => {
  try {
    const res = await fetch(`${BACKEND_URL}/api/notifications/read-all`, {
      method: "PATCH",
      credentials: "include",
    });
    return await res.json();
  } catch (error) {
    return error;
  }
};

export const deleteNotification = async (notificationId: string) => {
  try {
    const res = await fetch(
      `${BACKEND_URL}/api/notifications/${notificationId}`,
      {
        method: "DELETE",
        credentials: "include",
      },
    );
    return await res.json();
  } catch (error) {
    return error;
  }
};
