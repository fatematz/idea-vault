"use client";
import { Button } from "@heroui/react";
import React, { useState } from "react";
import { DeleteCommentModal } from "./DeleteCommentModal";
import { EditCommentModal } from "./EditComment"; 
import { authClient } from "@/lib/auth-client";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


const CommentsSection = ({ ideaId, initialComments = [] }) => {
  const [comments, setComments] = useState(initialComments);
  const [newComment, setNewComment] = useState("");
  const { data: session } = authClient.useSession();

  const handleDeleteComment = async (id) => {
    const {data: tokenData} = await authClient.token()
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/comments/${id}`, {
        headers: { authorization: `Bearer ${tokenData.token}` },
        method: "DELETE",
      });
      if (res.ok) {
        setComments(comments.filter((comment) => comment._id !== id));
        toast.success("Comment deleted successfully!");
      } else {
        toast.error("Failed to delete the comment!");
      }
    } catch (error) {
      toast.error("Server error occurred!");
    }
  };

  const handleEditComment = async (id, newText) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/comments/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: newText }),
      });
      if (res.ok) {
        setComments(comments.map((comment) => comment._id === id ? { ...comment, text: newText } : comment));
        toast.success("Your comment has been posted successfully!");
      } else {
        toast.error("Failed to post the comment!");
      }
    } catch (error) {
      toast.error("Failed to post the comment!");
    }
  };

  const handlePostComment = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const rawData = Object.fromEntries(formData.entries());
    if (!rawData.text?.trim()) return;

    const fullCommentData = {
      ideaId: ideaId,
      text: rawData.text,
      userName: session?.user?.name || "Anonymous",
      userImage: session?.user?.image || "https://i.ibb.co.com/vxFH4vN/avatar.png",
      userEmail: session?.user?.email,
      createdAt: new Date().toISOString(),
    };

    const {data: tokenData} = await authClient.token()
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/my-interactions`, {
        method: "POST",
        headers: { "Content-Type": "application/json", authorization: `Bearer ${tokenData?.token}` },
        body: JSON.stringify(fullCommentData),
      });
      if (res.ok) {
        const savedComment = await res.json();
        setComments([...comments, savedComment]);
        setNewComment("");
      }
    } catch (error) {
      console.error("Error posting comment to backend:", error);
    }
  };

  return (
    <div className="max-w-[1200px] mx-auto px-6 mt-12">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
      <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-700 rounded-2xl p-6 shadow-sm">
        <h3 className="text-xl font-bold text-slate-950 dark:text-white mb-6">
          Comments ({comments.length})
        </h3>

        {comments.length > 0 ? (
          <div className="space-y-4 mb-8 max-h-[350px] overflow-y-auto pr-2">
            {comments.map((comment, index) => (
              <div
                key={comment._id || index}
                className="bg-slate-50 dark:bg-slate-800 p-4 rounded-xl border border-slate-100 dark:border-slate-700 flex gap-3 items-start"
              >
                <img
                  src={comment.userImage || "https://i.ibb.co.com/vxFH4vN/avatar.png"}
                  alt={comment.userName}
                  className="w-10 h-10 rounded-full object-cover border border-slate-200 dark:border-slate-600"
                />
                <div className="space-y-1 w-full">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[20px] text-slate-800 dark:text-white">
                      {comment.userName || "Anonymous"}
                    </span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 text-[18px] leading-relaxed">
                    {comment.text}
                  </p>
                  <span className="text-[17px] text-slate-400">
                    {comment.createdAt ? new Date(comment.createdAt).toLocaleDateString() : ""}
                  </span>
                </div>

                {session?.user?.email && session.user.email === comment.userEmail && (
                  <div className="flex justify-center gap-3">
                    <EditCommentModal commentId={comment._id} currentText={comment.text} onEdit={handleEditComment} />
                    <DeleteCommentModal commentId={comment._id} onDelete={handleDeleteComment} />
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-slate-400 text-sm italic mb-6">
            No comments yet. Be the first to comment!
          </p>
        )}

        <form onSubmit={handlePostComment} className="space-y-4">
          <div className="flex gap-3 items-start">
            <img
              src={session?.user?.image || "https://i.ibb.co.com/vxFH4vN/avatar.png"}
              alt={session?.user?.name || "User"}
              className="w-10 h-10 rounded-full object-cover border border-slate-200 dark:border-slate-600 mt-2"
            />
            <div className="w-full">
              <textarea
                name="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Write a public comment..."
                rows="3"
                className="w-full p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-[#C6D62E]/30 focus:border-[#C6D62E] transition-all text-slate-800 dark:text-white shadow-sm resize-none"
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={!newComment.trim()}
              className="bg-[#C6D62E] hover:bg-[#b5c527] disabled:bg-slate-300 dark:disabled:bg-slate-700 text-black font-bold text-sm px-6 py-2.5 rounded-xl transition-colors shadow-sm cursor-pointer"
            >
              Post Comment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CommentsSection;