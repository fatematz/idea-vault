"use client";
import React, { useState } from "react";

export function EditCommentModal({ commentId, currentText, onEdit }) {
  const [isOpen, setIsOpen] = useState(false);
  const [updatedText, setUpdatedText] = useState(currentText);

  const handleUpdate = () => {
    if (!updatedText.trim()) return;
    onEdit(commentId, updatedText); 
    setIsOpen(false); 
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)} 
        className="bg-[#C6D62E] text-slate-950 font-bold px-4 py-2 rounded-xl text-sm transition-colors shadow-sm cursor-pointer hover:opacity-90"
      >
        Edit
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div 
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setIsOpen(false)} 
          />
          
          <div className="bg-white rounded-2xl w-full max-w-[440px] p-6 shadow-xl border border-slate-100 z-10 animate-in fade-in zoom-in-95 duration-200 mx-4">
            <h3 className="text-xl font-bold text-slate-950 mb-4">
              Edit Your Comment
            </h3>
            
            <textarea
              value={updatedText}
              onChange={(e) => setUpdatedText(e.target.value)}
              rows="4"
              className="w-full p-3 border border-slate-200 rounded-xl bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#C6D62E]/30 focus:border-[#C6D62E] transition-all resize-none shadow-sm text-[16px]"
              placeholder="Update your comment..."
            />

            <div className="flex justify-end gap-3 mt-6">
              <button 
                onClick={() => setIsOpen(false)}
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium px-4 py-2 rounded-xl text-sm transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleUpdate}
                disabled={!updatedText.trim() || updatedText === currentText}
                className="bg-[#C6D62E] text-slate-950 font-bold px-4 py-2 rounded-xl text-sm transition-colors shadow-sm disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}