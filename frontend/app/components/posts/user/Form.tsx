"use client";
import UserPostSkeleton from "../../skeleton/UserPostSkeleton";
import { UserPostsFormProps } from "@/app/types/props";

const Form = ({
  handleSubmit,
  editingPost,
  content,
  handleContentChange,
  handleFileChange,
  submitting,
  loading,
  handleEdit,
  handleDelete,
  posts,
}: UserPostsFormProps) => {
  const truncateText = (text: string, maxLength = 200) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "...";
  };
  return (
    <div className="max-w-4xl mx-auto px-6 py-20 space-y-10">
      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="space-y-5 bg-gray-900 border-2 border-gray-800 rounded-3xl p-8"
      >
        <h3 className="text-2xl font-bold">
          {editingPost ? "Edit Post" : "Create Post"}
        </h3>

        <textarea
          name="content"
          value={content}
          onChange={handleContentChange}
          className="w-full bg-gray-800 p-3 rounded-xl"
          placeholder="What's on your mind?"
          rows={4}
        />

        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="block w-full text-sm
              file:mr-4 file:py-2 file:px-4
              file:rounded-xl file:border-0
              file:bg-[#E0234E]/20 file:text-[#E0234E]
              hover:file:bg-[#E0234E]/30
              cursor-pointer"
        />

        <button
          type="submit"
          disabled={submitting}
          className={`flex items-center justify-center gap-2 px-6 py-2 rounded-xl font-bold transition ${
            submitting
              ? "bg-[#E0234E]/70 cursor-not-allowed"
              : "bg-[#E0234E] hover:opacity-90"
          }`}
        >
          {submitting && (
            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          )}
          {submitting
            ? editingPost
              ? "Updating..."
              : "Creating..."
            : editingPost
            ? "Update"
            : "Create"}
        </button>
      </form>

      {/* POSTS LIST */}
      {loading ? (
        <UserPostSkeleton />
      ) : (
        <div className="grid sm:grid-cols-2 gap-6">
          {posts.map((post) => (
            <div
              key={post._id}
              className="bg-gray-800 border-2 border-gray-700 p-5 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              {post.image && (
                <div className="w-full h-40 rounded-xl overflow-hidden mb-4">
                  <img
                    src={post.image}
                    alt="post"
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
              )}

              <p className="text-white">{truncateText(post.content, 200)}</p>
              <p className="text-xs text-gray-400 mt-2">
                {new Date(post.createdAt).toLocaleString()}
              </p>

              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => handleEdit(post)}
                  className="flex-1 border border-[#E0234E] text-[#E0234E] rounded-xl py-2 hover:bg-[#E0234E] hover:text-white transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(post._id)}
                  className="flex-1 bg-red-500/20 text-red-400 rounded-xl py-2 hover:bg-red-500/40 hover:text-white transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Form;
