"use client";
import { useEffect, useState } from "react";
import type { IPost } from "../types/post";
import { type IUser } from "../types/user";
import { deletePost, getAllPosts } from "../api/post/request";
import toast from "react-hot-toast";
import { useChatStore } from "../stores/useChatStore";
import PostNotFound from "../components/posts/PostNotFound";
import { confirmDeleteToast } from "../libs/toast";
import SidebarFilter from "../components/posts/SidebarFilter";
import PostCard from "../components/posts/PostCard";
import ProtectedRoute from "../routes/ProtectedRoute";
import { getMe } from "../api/auth/request";
import { getUserById } from "../api/user/request";

const Posts = () => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<IPost[]>([]);
  const [users, setUsers] = useState<Record<string, IUser>>({});
  const [searchUser, setSearchUser] = useState("");
  const { onlineUsers } = useChatStore();
  const [currentUser, setCurrentUser] = useState<IUser | null>(null);
  useEffect(() => {
    const fetchMe = async () => {
      const data = await getMe();
      setCurrentUser(data);
    };

    fetchMe();
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getAllPosts();
        setPosts(data);
        setFilteredPosts(data);

        const usersData: Record<string, IUser> = {};
        for (const post of data) {
          if (!usersData[post.d]) {
            const user = await getUserById(post.userId);
            usersData[post.userId] = user || {
              fullname: "User Name",
              avatar: "/default-avatar.png",
            };
          }
        }
        setUsers(usersData);
      } catch (err) {
        toast.error("Failed to fetch posts");
      }
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    if (!searchUser) {
      setFilteredPosts(posts);
    } else {
      const filtered = posts.filter((post) => {
        const user = users[post.userId];
        return user?.fullname.toLowerCase().includes(searchUser.toLowerCase());
      });
      setFilteredPosts(filtered);
    }
  }, [searchUser, posts, users]);

  const handleDelete = (postId: string) => {
    confirmDeleteToast(async () => {
      const toastId = toast.loading("Deleting post...");

      try {
        const data = await deletePost(postId);

        if (data?.success) {
          setPosts((prev) => prev.filter((p) => p._id !== postId));
          setFilteredPosts((prev) => prev.filter((p) => p._id !== postId));

          toast.success(data.success || "Post deleted!", {
            id: toastId,
          });
        } else {
          toast.error("Failed to delete post");
        }
      } catch (error) {
        toast.error("Failed to delete post");
      }
    }, "Are you sure Deleted post");
  };

  if (!posts || posts.length === 0) return <PostNotFound />;
  return (
    <ProtectedRoute>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 flex flex-col md:flex-row gap-6">
        {/* Sidebar Filter */}
        <SidebarFilter
          searchUser={searchUser}
          setSearchUser={setSearchUser}
          users={users}
        />

        {/* Posts */}
        <PostCard
          filteredPosts={filteredPosts}
          users={users}
          onlineUsers={onlineUsers}
          currentUser={currentUser}
          handleDelete={handleDelete}
        />
      </div>
    </ProtectedRoute>
  );
};

export default Posts;
