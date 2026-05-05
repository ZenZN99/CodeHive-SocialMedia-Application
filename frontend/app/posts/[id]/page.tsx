"use client";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  createComment,
  updateComment,
  deleteComment,
  getCommentsByPost,
} from "@/app/api/comment/request";
import {
  getRepliesByComment,
  createReply,
  deleteReply,
} from "@/app/api/reply/request";
import { MdCancel } from "react-icons/md";
import { useParams } from "next/navigation";
import { useAuthStore } from "@/app/stores/useAuthStore";
import { IPost } from "@/app/types/post";
import { IUser } from "@/app/types/user";
import { IComment } from "@/app/types/comment";
import { IReply } from "@/app/types/reply";
import { getPostById } from "@/app/api/post/request";
import { getUserById } from "@/app/api/user/request";
import { confirmDeleteToast, promptToast } from "@/app/libs/toast";
import PostDetailsSkeleton from "@/app/components/skeleton/PostDetailsSkeleton";
import PostSection from "@/app/components/posts/[id]/PostSection";
import CommentSidebar from "@/app/components/posts/[id]/CommentSidebar";
import ProtectedRoute from "@/app/routes/ProtectedRoute";
import PostNotFound from "@/app/components/posts/PostNotFound";

const PostDetailsPage = () => {
  const { id } = useParams();

  const [post, setPost] = useState<IPost | null>(null);
  const [postUser, setPostUser] = useState<IUser | null>(null);
  const [comments, setComments] = useState<IComment[]>([]);
  const [replies, setReplies] = useState<Record<string, IReply[]>>({});
  const [newComment, setNewComment] = useState("");
  const [replyInputs, setReplyInputs] = useState<Record<string, string>>({});
  const [postNotFound, setPostNotFound] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showImageModal, setShowImageModal] = useState(false);

  const currentUser = useAuthStore((state) => state.user);

  useEffect(() => {
    const fetchPostData = async () => {
      if (!id) return;

      try {
        const postData = await getPostById(id as string);

        if (!postData || postData.statusCode === 404) {
          setPostNotFound(true);
          return;
        }

        setPost(postData);

        const userData = await getUserById(postData.userId);

        setPostUser(
          userData || { fullname: "User", avatar: "/default-avatar.png" },
        );

        const commentsData = await getCommentsByPost(postData._id);
        const safeComments = Array.isArray(commentsData) ? commentsData : [];

        setComments(safeComments);

        const repliesData: Record<string, IReply[]> = {};

        for (const c of commentsData || []) {
          const res = await getRepliesByComment(c._id);

          repliesData[c._id] = Array.isArray(res)
            ? res
            : res?.data || res?.replies || [];
        }

        setReplies(repliesData);
      } catch (error) {
        console.error(error);
        setPostNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    fetchPostData();
  }, [id]);

  const handleCreateComment = async () => {
    if (!newComment.trim() || !post || !currentUser) return;

    if (newComment.length > 200) {
      return toast("The maximum length for the text is 200");
    }

    try {
      const comment = await createComment(post._id, newComment);

      const enrichedComment: IComment = {
        ...comment,
        text: comment.text,
        userId: currentUser,
      };

      setComments((prev) => [enrichedComment, ...prev]);

      setReplies((prev) => ({
        ...prev,
        [comment._id]: [],
      }));

      setNewComment("");

      toast.success("Comment added");
    } catch {
      toast.error("Failed to add comment");
    }
  };

  const handleCreateReply = async (commentId: string) => {
    const text = replyInputs[commentId];

    if (!text?.trim() || !currentUser) return;

    if (text.length > 150) {
      return toast("The maximum length for the text is 150");
    }

    try {
      const reply = await createReply(commentId, text);

      const enrichedReply: IReply = {
        ...reply,
        userId: currentUser,
      };

      setReplies((prev) => ({
        ...prev,
        [commentId]: [...(prev[commentId] || []), enrichedReply],
      }));

      setReplyInputs((prev) => ({
        ...prev,
        [commentId]: "",
      }));

      toast.success("Reply added");
    } catch {
      toast.error("Failed to add reply");
    }
  };

  const handleEditComment = async (commentId: string) => {
    if (!currentUser) return;

    const commentToEdit = comments.find((c) => c._id === commentId);

    if (!commentToEdit) return toast.error("Comment Not Found");

    promptToast(
      async (newText: string) => {
        if (!newText.trim()) return;

        if (newText.length > 200)
          return toast("The maximum length for the text is 200");

        try {
          const updated = await updateComment(commentId, newText);

          setComments((prev) =>
            prev.map((comment) =>
              comment._id === commentId
                ? { ...comment, text: updated.text } 
                : comment,
            ),
          );

          toast.success("Comment updated");
        } catch {
          toast.error("Failed to update comment");
        }
      },
      {
        title: "Edit your comment",
        placeholder: "Write your comment...",
        initialValue: commentToEdit.text, 
        confirmText: "Save",
        cancelText: "Cancel",
      },
    );
  };

  const handleDeleteComment = async (commentId: string) => {
    confirmDeleteToast(async () => {
      try {
        await deleteComment(commentId);

        setComments((prev) => prev.filter((c) => c._id !== commentId));

        setReplies((prev) => {
          const updated = { ...prev };
          delete updated[commentId];
          return updated;
        });

        toast.success("Comment deleted");
      } catch {
        toast.error("Failed to delete comment");
      }
    }, "Are you sure you want to delete this comment?");
  };

  const handleDeleteReply = async (replyId: string) => {
    try {
      await deleteReply(replyId);

      setReplies((prev) => {
        const updated: Record<string, IReply[]> = {};

        for (const commentId in prev) {
          updated[commentId] = prev[commentId].filter(
            (reply) => reply._id !== replyId,
          );
        }

        return updated;
      });

      toast.success("Reply deleted");
    } catch {
      toast.error("Failed to delete reply");
    }
  };

  if (loading)
    return (
      <div className="p-6 text-white text-center">
        <PostDetailsSkeleton />
      </div>
    );

  if (!post)
    return (
      <div className="p-6 text-white text-center">
        <PostNotFound />
      </div>
    );

  if (postNotFound) return <PostNotFound />;

  if (!post) return null;

  return (
    <ProtectedRoute>
      <div className="min-h-screen flex justify-center">
        <div className="w-full max-w-6xl p-4 sm:p-7 flex flex-col md:flex-row gap-6 items-start">
          <PostSection
            postUser={postUser}
            post={post}
            setShowImageModal={setShowImageModal}
          />

          <CommentSidebar
            currentUser={currentUser}
            newComment={newComment}
            setNewComment={setNewComment}
            handleCreateComment={handleCreateComment}
            comments={comments}
            handleEditComment={handleEditComment}
            handleDeleteComment={handleDeleteComment}
            replies={replies}
            handleDeleteReply={handleDeleteReply}
            replyInputs={replyInputs}
            setReplyInputs={setReplyInputs}
            handleCreateReply={handleCreateReply}
          />

          {showImageModal && post.image && (
            <div
              className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
              onClick={() => setShowImageModal(false)}
            >
              <div
                className="relative max-w-4xl w-full px-4"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setShowImageModal(false)}
                  className="absolute cursor-pointer -top-10 right-2 text-white text-3xl hover:text-[#E0234E]"
                >
                  <MdCancel />
                </button>

                <img
                  src={post.image}
                  alt="post"
                  className="w-full max-h-[80vh] object-contain rounded-xl"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default PostDetailsPage;
