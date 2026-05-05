"use client";

import { useState, useMemo } from "react";
import { IPost } from "@/app/types/post";
import { FaTrash } from "react-icons/fa";
import PostNotFound from "@/app/components/posts/PostNotFound";

interface PostActiveTabProps {
  activeTab: string;
  posts: IPost[];
  expandedPosts: string[];
  setExpandedPosts: (ids: string[]) => void;
  handleDeletePost: (id: string) => void;
}

const PostActiveTab = ({
  activeTab,
  posts,
  expandedPosts,
  setExpandedPosts,
  handleDeletePost,
}: PostActiveTabProps) => {
  const [searchPost, setSearchPost] = useState("");

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const title = post.title?.toLowerCase() || "";
      const content = post.content?.toLowerCase() || "";
      const query = searchPost.toLowerCase();

      return title.includes(query) || content.includes(query);
    });
  }, [posts, searchPost]);

  if (activeTab !== "posts") return null;

  return (
    <div>
      {/* Search Input */}
      <input
        type="text"
        placeholder="Search posts..."
        value={searchPost}
        onChange={(e) => setSearchPost(e.target.value)}
        className="w-full md:w-1/2 p-2 mb-6 rounded-lg bg-gray-800 text-white placeholder-gray-400 outline-none"
      />

      {filteredPosts.length === 0 ? (
        <PostNotFound />
      ) : (
        <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
          {filteredPosts.map((post) => {
            const isExpanded = expandedPosts.includes(post._id);
            const isLong = post.content?.length > 200;
            const content =
              isExpanded || !isLong
                ? post.content
                : post.content?.slice(0, 200) + "...";

            return (
              <div
                key={post._id}
                className="bg-gray-900 border-2 border-gray-800 rounded-3xl p-4 shadow-xl flex flex-col"
              >
                {post.image && (
                  <img
                    src={post.image}
                    alt="Post image"
                    className="w-full h-48 object-cover rounded-lg mb-2"
                  />
                )}
                <h3 className="text-white font-bold mb-2">{post.title}</h3>
                <p className="text-white mb-2">{content}</p>

                {isLong && (
                  <button
                    className="text-blue-400 text-sm hover:underline mb-2"
                    onClick={() =>
                      setExpandedPosts(
                        isExpanded
                          ? expandedPosts.filter((id) => id !== post._id)
                          : [...expandedPosts, post._id],
                      )
                    }
                  >
                    {isExpanded ? "Show Less" : "Read More"}
                  </button>
                )}

                <div className="flex justify-end gap-2 mt-2">
                  <button
                    className="bg-gray-700 p-2 rounded-full hover:bg-gray-600"
                    onClick={() => handleDeletePost(post._id)}
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default PostActiveTab;
