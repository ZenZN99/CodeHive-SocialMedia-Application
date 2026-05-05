"use client";
import { useEffect, useState } from "react";
import {
  getMyNotifications,
  deleteNotification,
  getUnreadNotificationsCount,
  markNotificationAsRead,
  markAllNotificationsAsRead,
} from "../api/notfication/request";
import { FaRegBell } from "react-icons/fa";
import { HiOutlineBellSnooze } from "react-icons/hi2";
import type { IUser } from "../types/user";
import type { NotificationType } from "../types/notfication";
import toast from "react-hot-toast";
import { HiArrowLeft } from "react-icons/hi";
import Link from "next/link";

interface NotificationData {
  _id: string;
  senderId: IUser;
  type: NotificationType;
  targetId: string;
  isRead: boolean;
  createdAt: string;
}

const NavbarBell = () => {
  const [notifications, setNotifications] = useState<NotificationData[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const loadNotifications = async () => {
      const data = await getMyNotifications();
      setNotifications(Array.isArray(data) ? data : []);

      const count = await getUnreadNotificationsCount();
      setUnreadCount(count || 0);
    };

    loadNotifications();
  }, []);

  const handleMarkAsRead = async (id: string) => {
    await markNotificationAsRead(id);

    setNotifications((prev) =>
      prev.map((n) => (n._id === id ? { ...n, isRead: true } : n)),
    );

    setUnreadCount((prev) => Math.max(prev - 1, 0));
  };

  const handleMarkAllAsRead = async () => {
    await markAllNotificationsAsRead();

    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));

    setUnreadCount(0);
  };

  const handleDeleteNotification = async (id: string) => {
    await deleteNotification(id);

    const wasUnread = notifications.find((n) => n._id === id && !n.isRead);
    setNotifications((prev) => prev.filter((n) => n._id !== id));

    if (wasUnread) {
      setUnreadCount((prev) => Math.max(prev - 1, 0));
    }

    toast.success("Notification deleted");
  };

  const renderText = (type: NotificationType) => {
    switch (type) {
      case "comment":
        return "commented on your post";
      case "reply":
        return "replied to your comment";
      case "message":
        return "sent you a message";
      case "rating":
        return "rated your project";
      default:
        return "sent you a notification";
    }
  };

  return (
    <div className="relative">
      {/* Bell Icon */}
      <span
        className="cursor-pointer relative px-3 text-lg"
        onClick={() => setDropdownOpen(!dropdownOpen)}
      >
        {unreadCount > 0 && (
          <span className="absolute bottom-10 left-2 z-50 bg-red-500 text-xs w-4 h-4 rounded-full flex items-center justify-center">
            {unreadCount}
          </span>
        )}
        <FaRegBell className="text-gray-300" />
      </span>

      {/* Small screens: fullscreen */}
      {dropdownOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900 flex flex-col sm:hidden">
          {/* Header */}
          <div className="flex justify-between items-center px-4 py-3 border-b border-red-800">
            <span className="text-white font-semibold text-lg">
              Notifications
            </span>
            <button
              className="text-gray-300 text-xl"
              onClick={() => setDropdownOpen(false)}
            >
              <HiArrowLeft />
            </button>
          </div>

          {/* List */}
          {notifications.length === 0 ? (
            <p className="p-4 text-gray-400 flex gap-2 items-center justify-center flex-1">
              No notifications <HiOutlineBellSnooze />
            </p>
          ) : (
            <div className="flex-1 overflow-y-auto">
              {notifications.map((n) => (
                <div
                  key={n._id}
                  onClick={() => handleMarkAsRead(n._id)}
                  className={`px-4 py-3 flex gap-3 cursor-pointer items-start ${
                    !n.isRead ? "bg-gray-800" : ""
                  }`}
                >
                  <Link href={`/profile/${n.senderId._id}`}>
                    <img
                      src={n.senderId.avatar}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  </Link>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-300">
                      <b>{n.senderId.fullname}</b> {renderText(n.type)}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(n.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDeleteNotification(n._id)}
                    className="text-red-500 text-sm shrink-0"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Large screens: dropdown */}
      {dropdownOpen && (
        <div className="hidden sm:block absolute right-0 mt-2 w-96 bg-slate-900 border border-red-800 rounded-xl z-50 shadow-lg">
          <div className="flex justify-between px-4 py-2 border-b border-red-800">
            <span className="text-white font-semibold">Notifications</span>
            {unreadCount > 0 && (
              <button
                onClick={handleMarkAllAsRead}
                className="text-red-500 text-sm"
              >
                Mark all as read
              </button>
            )}
          </div>

          {notifications.length === 0 ? (
            <p className="p-4 text-gray-400 flex gap-2 items-center justify-center">
              No notifications <HiOutlineBellSnooze />
            </p>
          ) : (
            <div className="max-h-80 overflow-y-auto">
              {notifications.map((n) => (
                <div
                  key={n._id}
                  onClick={() => handleMarkAsRead(n._id)}
                  className={`px-4 py-3 flex gap-3 cursor-pointer ${
                    !n.isRead ? "bg-gray-800" : ""
                  }`}
                >
                  <Link href={`/profile/${n.senderId._id}`}>
                    <img
                      src={n.senderId.avatar}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  </Link>
                  <div className="flex-1">
                    <p className="text-sm text-gray-300">
                      <b>{n.senderId.fullname}</b> {renderText(n.type)}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(n.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDeleteNotification(n._id)}
                    className="text-red-500 text-sm"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NavbarBell;
