"use client";

import { PostDetailsCommentSidebarProps } from "@/app/types/props";
import { UserRoles } from "@/app/types/user";
import Link from "next/link";
import { BiComment } from "react-icons/bi";


const CommentSidebar = ({
  currentUser,
  newComment,
  setNewComment,
  handleCreateComment,
  comments,
  handleEditComment,
  handleDeleteComment,
  replies,
  handleDeleteReply,
  replyInputs,
  setReplyInputs,
  handleCreateReply,
}: PostDetailsCommentSidebarProps) => {
  return (
    <div className="flex-1  md:flex-none w-full md:w-87.5 bg-gray-800 border-2 border-gray-700 text-white rounded-lg p-4 flex flex-col gap-4 overflow-auto max-h-[80vh]">
      <h2 className="font-bold text-lg border-b border-gray-700 pb-2 flex items-center gap-2">
        <BiComment /> Comments
      </h2>

      {/* New Comment */}
      {currentUser && (
        <div className="flex gap-2 mt-2">
          <input
            type="text"
            placeholder="Add a comment..."
            className="flex-1 p-2 rounded text-black bg-white outline-none focus:border focus:border-[#E0234E]"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button
            onClick={handleCreateComment}
            className="bg-[#E0234E] cursor-pointer px-4 rounded hover:bg-[#ff0942]"
          >
            Post
          </button>
        </div>
      )}

      {/* Comments List */}
      <div className="flex flex-col gap-3 mt-2">
        {comments.length === 0 ? (
          <p className="text-gray-400 p-20 text-center">
            No comments yet. Be the first to comment! 
          </p>
        ) : (
          comments.map((comment) => (
            <div key={comment._id} className="bg-gray-700  p-2 rounded">
              <div className="flex items-start gap-2">
                <Link href={`/profile/${comment.userId._id}`}>
                  <img
                    src={comment.userId.avatar || "/default-avatar.png"}
                    alt={comment.userId.fullname}
                    className="w-8 h-8 rounded-full border border-[#E0234E]"
                  />
                </Link>
                <div className="bg-gray-600 rounded-lg px-3 py-1 flex-1">
                  <p className="font-semibold text-sm">
                    {comment.userId.fullname}{" "}
                    {currentUser && comment.userId._id === currentUser._id && (
                      <span className="text-xs text-green-400 ml-1">(You)</span>
                    )}
                  </p>
                  <p className="text-gray-400 text-[10px]">
                    {new Date(comment.createdAt as Date).toLocaleString()}
                  </p>
                  <p className="text-gray-300 text-sm">{comment.text}</p>
                  {currentUser && (
                    <div className="flex gap-2 mt-1 text-xs text-gray-400">
                      {comment.userId._id === currentUser._id && (
                        <button
                          onClick={() => handleEditComment(comment._id)}
                          className="hover:text-yellow-400 cursor-pointer transition"
                        >
                          Edit
                        </button>
                      )}

                      {(comment.userId._id === currentUser._id ||
                        currentUser.role === "Admin") && (
                        <button
                          onClick={() => handleDeleteComment(comment._id)}
                          className="hover:text-red-400 cursor-pointer transition"
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Replies */}
              <div className="ml-4 mt-2 flex flex-col gap-2">
                {(replies[comment._id] || []).map((reply) => (
                  <div className="flex items-start gap-2" key={reply._id}>
                    <Link href={`/profile/${reply.userId._id}`}>
                      <img
                        src={reply.userId.avatar || "/default-avatar.png"}
                        alt={reply.userId.fullname}
                        className="w-6 h-6 rounded-full border border-[#E0234E]"
                      />
                    </Link>
                    <div className="bg-gray-600 rounded-lg px-2 py-1 flex-1">
                      <p className="font-semibold text-sm">
                        {reply.userId.fullname}{" "}
                        {currentUser &&
                          reply.userId._id === currentUser._id && (
                            <span className="text-xs text-green-400 ml-1">
                              (You)
                            </span>
                          )}
                      </p>
                      <p className="text-gray-400 text-[10px]">
                        {new Date(comment.createdAt as Date).toLocaleString()}
                      </p>
                      <p className="text-gray-300 text-sm">{reply.text}</p>

                      {currentUser &&
                        (reply.userId._id === currentUser._id ||
                          currentUser.role === UserRoles.ADMIN) && (
                          <button
                            onClick={() =>  handleDeleteReply(reply._id)}
                            className="text-xs text-red-400 cursor-pointer hover:text-red-600 transition mt-1"
                          >
                            Delete
                          </button>
                        )}
                    </div>
                  </div>
                ))}

                {/* Add Reply */}
                {currentUser && comment.userId._id !== currentUser._id && (
                  <div className="flex gap-1 mt-1">
                    <input
                      type="text"
                      placeholder="Reply..."
                      className="flex-1 p-1 rounded text-black bg-white text-sm outline-none focus:border focus:border-[#E0234E]"
                      value={replyInputs[comment._id] || ""}
                      onChange={(e) =>
                        setReplyInputs({
                          ...replyInputs,
                          [comment._id]: e.target.value,
                        })
                      }
                    />
                    <button
                      onClick={() => handleCreateReply(comment._id)}
                      className="bg-[#E0234E] px-2 rounded hover:bg-[#ff0942] text-sm cursor-pointer"
                    >
                      Reply
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CommentSidebar;
