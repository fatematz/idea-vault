"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export function DeleteIdeaModal({ ideaId }) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    const { data: tokenData } = await authClient.token();
    console.log("tokenData", tokenData);

    try {
      const res = await fetch(`http://localhost:5000/ideas/${ideaId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${tokenData.token}`,
        },
      });

      if (res.ok) {
        setIsOpen(false);
        router.refresh();
      }
    } catch (error) {
      console.error("Error deleting idea:", error);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="bg-red-500 hover:bg-red-600 text-white font-bold px-6 py-2.5 rounded-xl text-sm transition-colors cursor-pointer"
      >
        Delete Idea
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />

          <div className="bg-white rounded-2xl w-full max-w-[400px] p-6 shadow-xl border border-slate-100 z-10 mx-4">
            <h3 className="text-xl font-bold text-slate-950 mb-2">
              Delete Idea Permanently?
            </h3>
            <p className="text-slate-600 text-sm mb-6">
              Are you sure you want to delete this project? This action cannot
              be undone.
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsOpen(false)}
                className="bg-slate-100 text-slate-700 px-4 py-2 rounded-xl text-sm font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white px-4 py-2 rounded-xl text-sm font-bold"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
