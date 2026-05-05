"use client";
export const dynamic = "force-dynamic";
import { useEffect, useState, type ChangeEvent } from "react";
import { useAuthStore } from "../stores/useAuthStore";
import { useChatStore } from "../stores/useChatStore";
import type { IUser } from "../types/user";
import { MdArrowBack } from "react-icons/md";
import { getAllUsers } from "../api/user/request";
import { getSocket } from "../socket/socket";
import { useRouter } from "next/navigation";
import ProtectedRoute from "../routes/ProtectedRoute";
import ChatSidebar from "../components/chat/ChatSidebar";
import ChatHeader from "../components/chat/ChatHeader";
import MessageList from "../components/chat/MessageList";
import ChatInput from "../components/chat/ChatInput";

const Chat = () => {
  const {
    selectedUser,
    messages,
    onlineUsers,
    typingUserId,
    selectUser,
    fetchMessages,
    sendMessage,
    emitTyping,
    markAsRead,
    deleteMessage,
    initSocket,
  } = useChatStore();

  const { user, logout } = useAuthStore();
  const [users, setUsers] = useState<IUser[]>([]);
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [showEmoji, setShowEmoji] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  const router = useRouter();

  useEffect(() => {
    initSocket();
    return () => {
      const socket = getSocket();
      socket.off("receive-message");
      socket.off("typing");
      socket.off("online-users");
      socket.off("message-seen");
    };
  }, []);

  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreen();
    window.addEventListener("resize", checkScreen);

    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await getAllUsers();
      if (!res?.error) {
        setUsers(res?.filter((u: any) => u._id !== user?._id));
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    if (!selectedUser || !user) return;

    fetchMessages(selectedUser._id);
    markAsRead(selectedUser._id);

    if (isMobile) setShowSidebar(false);
  }, [selectedUser]);

  const handleSend = async () => {
    if ((!message.trim() && !image) || !selectedUser || !user) return;

    await sendMessage(selectedUser._id, message, image);
    setMessage("");
    setImage(null);
    emitTyping(user!._id, selectedUser._id, false);
  };

  const handleTyping = (value: string) => {
    setMessage(value);
    if (!selectedUser) return;
    emitTyping(user!._id, selectedUser._id, value.length > 0);
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) setImage(e.target.files[0]);
  };

  const handleBack = () => setShowSidebar(true);

  return (
    <ProtectedRoute>
      <div className="flex h-screen bg-[#020617] text-gray-200">
        {showSidebar && (
          <ChatSidebar
            users={users}
            search={search}
            setSearch={setSearch}
            selectedUser={selectedUser}
            onlineUsers={onlineUsers}
            selectUser={selectUser}
            user={user!}
            logout={logout}
          />
        )}

        <main className="flex-1 flex flex-col relative bg-[#0f172a]">
          {selectedUser && isMobile && !showSidebar && (
            <button
              onClick={handleBack}
              className="absolute top-4 left-4 z-30 p-4 rounded-full bg-[#020617]"
            >
              <MdArrowBack size={18} />
            </button>
          )}

          {!selectedUser ? (
            <div className="flex-1 flex items-center justify-center text-gray-500">
              Choose a conversation
            </div>
          ) : (
            <>
              <ChatHeader
                selectedUser={selectedUser}
                onlineUsers={onlineUsers}
                typingUserId={typingUserId}
                navigate={router}
              />

              <MessageList
                messages={messages}
                user={user!}
                deleteMessage={deleteMessage}
              />

              <ChatInput
                message={message}
                setMessage={setMessage}
                handleSend={handleSend}
                handleTyping={handleTyping}
                handleImageChange={handleImageChange}
                showEmoji={showEmoji}
                setShowEmoji={setShowEmoji}
              />
            </>
          )}
        </main>
      </div>
    </ProtectedRoute>
  );
};

export default Chat;
