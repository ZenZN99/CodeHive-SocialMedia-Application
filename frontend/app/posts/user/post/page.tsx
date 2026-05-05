"use client";
import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import toast from "react-hot-toast";
import {
  createPost,
  getPostsByUser,
  updatePost,
  deletePost,
} from "@/app/api/post/request";
import { useAuthStore } from "@/app/stores/useAuthStore";
import { IPost } from "@/app/types/post";
import { confirmDeleteToast } from "@/app/libs/toast";
import Form from "@/app/components/posts/user/Form";
import ProtectedRoute from "@/app/routes/ProtectedRoute";

const UserPost = () => {
  const { user } = useAuthStore();

  const [posts, setPosts] = useState<IPost[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [editingPost, setEditingPost] = useState<IPost | null>(null);

  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);

  const fetchPosts = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const data = await getPostsByUser(user._id);
      setPosts(Array.isArray(data) ? data : []);
    } catch {
      toast.error("Failed to load posts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setImageFile(e.target.files[0]);
  };

  const resetForm = () => {
    setContent("");
    setImageFile(null);
    setEditingPost(null);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!user || submitting) return;

    if (!content.trim()) {
      toast.error("Content is required");
      return;
    }

    if (!imageFile) {
      toast.error("image is required");
    }

    try {
      setSubmitting(true);

      if (editingPost) {
        await updatePost(editingPost._id, content, imageFile || undefined);
        toast.success("Post updated");
      } else {
        await createPost(content, user._id, imageFile || undefined);
        toast.success("Post created");
      }

      resetForm();
      fetchPosts();
    } catch {
      toast.error("Operation failed");
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (post: IPost) => {
    setEditingPost(post);
    setContent(post.content);
    setImageFile(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = (postId: string) => {
    confirmDeleteToast(async () => {
      try {
        await deletePost(postId);

        setPosts((prev) => prev.filter((p) => p._id !== postId));

        toast.success("Post deleted");
      } catch (error) {
        toast.error("Failed to delete post");
      }
    }, "Delete this post?");
  };

  return (
    <ProtectedRoute>
      <div className="text-gray-300">
        <Form
          handleSubmit={handleSubmit}
          editingPost={editingPost}
          content={content}
          handleContentChange={handleContentChange}
          handleFileChange={handleFileChange}
          submitting={submitting}
          loading={loading}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          posts={posts}
        />
      </div>
    </ProtectedRoute>
  );
};

export default UserPost;
