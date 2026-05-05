"use client";

import Link from "next/link";
import PostSkeleton from "../skeleton/PostSkeleton";
import { FaTrash } from "react-icons/fa";
import { BiComment, BiShare } from "react-icons/bi";
import toast from "react-hot-toast";
import { UserRoles } from "@/app/types/user";
import { PostCardProps } from "@/app/types/props";

const PostCard = ({
  filteredPosts,
  users,
  onlineUsers,
  currentUser,
  handleDelete,
}: PostCardProps) => {
  const truncateText = (text: string, maxLength = 200) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "...";
  };
  return (
    <div className="flex-1 flex flex-col gap-6">
      {filteredPosts.length === 0
        ? [...Array(4)].map((_, i) => <PostSkeleton key={i} />)
        : filteredPosts.map((post) => {
            const user = users[post.userId];
            if (!user) return <PostSkeleton key={post._id} />;
            return (
              <div
                key={post._id}
                className="relative bg-gray-900  w-full md:w-[80%] lg:w-[60%] mx-auto text-white rounded-lg shadow-md border-2 border-gray-800 overflow-hidden"
              >
                {/* Header */}
                <div className="relative flex items-center p-4 gap-3 border-b border-gray-700">
                  <Link href={`/profile/${user._id}`}>
                    <img
                      src={user?.avatar || "/default-avatar.png"}
                      alt={user?.fullname}
                      className="w-12 h-12 rounded-full border-2 border-[#E0234E]"
                    />
                    {post.userId && onlineUsers.includes(post.userId) && (
                      <span className="absolute bottom-4 left-12 w-3 h-3 bg-[lime] border-2 border-gray-900 rounded-full" />
                    )}
                  </Link>
                  <div>
                    <p className="font-semibold">{user?.fullname || "User"}</p>
                    <p className="text-gray-400 text-sm">
                      {new Date(post.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>

                {currentUser?.role === UserRoles.ADMIN && (
                  <button
                    onClick={() => handleDelete(post._id)}
                    className="absolute top-3 right-3 flex items-center justify-center bg-[#E0234E] text-white w-8 h-8 rounded-full hover:bg-red-500 transition"
                  >
                    <FaTrash />
                  </button>
                )}

                {/* Content */}
                <div className="p-4">
                  <p className="mb-3">{truncateText(post.content, 200)}</p>
                  {post.image && (
                    <Link href={`/posts/${post._id}`}>
                      <img
                        src={post.image}
                        alt="post"
                        className="w-full max-h-100 rounded-lg"
                      />
                    </Link>
                  )}
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row items-center justify-around p-3 border-t border-gray-700 text-gray-400 gap-2">
                  <Link
                    href={`/posts/${post._id}`}
                    className="flex items-center gap-1 hover:text-blue-500 transition"
                  >
                    <BiComment /> Comment
                  </Link>
                  <button
                    className="flex items-center gap-1 hover:text-blue-500 transition"
                    onClick={() => {
                      const postUrl = `${window.location.origin}/post/${post._id}`;
                      navigator.clipboard
                        .writeText(postUrl)
                        .then(() => {
                          toast.success("Link copied to clipboard!");
                        })
                        .catch(() => {
                          toast.error("Failed to copy link");
                        });
                    }}
                  >
                    <BiShare /> Share
                  </button>
                </div>
              </div>
            );
          })}
    </div>
  );
};

export default PostCard;
