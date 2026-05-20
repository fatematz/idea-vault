"use client";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

export function EditIdeaModal({ idea }) {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(idea.category || "");
  const dropdownRef = useRef(null);
  const router = useRouter();

  const categories = [
    { value: "tech", label: "Tech" },
    { value: "health", label: "Health" },
    { value: "ai", label: "AI" },
    { value: "education", label: "Education" },
    { value: "ecommerce", label: "E-commerce" },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const onUpdate = async (e) => {
    e.preventDefault();
    const fromData = new FormData(e.currentTarget);
    const updatedIdeas = Object.fromEntries(fromData.entries());
    updatedIdeas.category = selectedCategory;

    try {
      const res = await fetch(`http://localhost:5000/ideas/${idea._id}`, {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(updatedIdeas),
      });

      if (res.ok) {
        setIsOpen(false);
        router.refresh();
      }
    } catch (error) {
      console.error("Error updating idea:", error);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="bg-[#C6D62E] hover:bg-[#b5c527] text-slate-900 font-bold px-6 py-2.5 rounded-xl text-sm transition-colors cursor-pointer"
      >
        Edit Idea
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl w-full max-w-4xl p-8 max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-100 relative">
            
            <button 
              onClick={() => setIsOpen(false)} 
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 font-bold text-xl cursor-pointer"
            >
              ✕
            </button>

            <div className="mb-8 text-center">
              <h2 className="text-3xl font-bold text-slate-800">
                Edit Your <span className="text-[#C6D62E]">Idea</span>
              </h2>
            </div>

            <form onSubmit={onUpdate} className="space-y-6" ref={dropdownRef}>
              <div>
                <label className="block text-[18px] font-medium text-slate-700 mb-2">Idea Title *</label>
                <input type="text" name="title" defaultValue={idea.title} required className="w-full px-4 py-2.5 rounded-lg border text-slate-800" />
              </div>

              <div>
                <label className="block text-[18px] font-medium text-slate-700 mb-2">Short Description *</label>
                <input type="text" name="shortDescription" defaultValue={idea.shortDescription} required className="w-full px-4 py-2.5 rounded-lg border text-slate-800" />
              </div>

              <div className="relative">
                <label className="block text-[18px] font-medium text-slate-700 mb-2">Category *</label>
                <button
                  type="button"
                  onClick={() => setOpenDropdown(!openDropdown)}
                  className="w-full px-4 py-2.5 rounded-lg border bg-white text-left flex justify-between items-center text-slate-800"
                >
                  <span>
                    {selectedCategory ? categories.find((c) => c.value === selectedCategory)?.label : "Select Category"}
                  </span>
                </button>

                {openDropdown && (
                  <div className="absolute z-20 mt-1 w-full bg-white border rounded-lg shadow-lg max-h-60 overflow-y-auto">
                    {categories.map((cat) => (
                      <button
                        key={cat.value}
                        type="button"
                        onClick={() => {
                          setSelectedCategory(cat.value);
                          setOpenDropdown(false);
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-[#C6D62E] hover:text-slate-950"
                      >
                        {cat.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[18px] font-medium text-slate-700 mb-2">Image URL *</label>
                  <input type="url" name="imageUrl" defaultValue={idea.imageUrl} required className="w-full px-4 py-2.5 rounded-lg border text-slate-800" />
                </div>
                <div>
                  <label className="block text-[18px] font-medium text-slate-700 mb-2">Estimated Budget</label>
                  <input type="number" name="budget" defaultValue={idea.budget} className="w-full px-4 py-2.5 rounded-lg border text-slate-800" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[18px] font-medium text-slate-700 mb-2">Tags</label>
                  <input type="text" name="tags" defaultValue={idea.tags} className="w-full px-4 py-2.5 rounded-lg border text-slate-800" />
                </div>
                <div>
                  <label className="block text-[18px] font-medium text-slate-700 mb-2">Target Audience *</label>
                  <input type="text" name="targetAudience" defaultValue={idea.targetAudience} required className="w-full px-4 py-2.5 rounded-lg border text-slate-800" />
                </div>
              </div>

              <div>
                <label className="block text-[18px] font-medium text-slate-700 mb-2">Problem Statement *</label>
                <textarea name="problemStatement" defaultValue={idea.problemStatement} required rows="3" className="w-full px-4 py-2.5 rounded-lg border text-slate-800 resize-none" />
              </div>

              <div>
                <label className="block text-[18px] font-medium text-slate-700 mb-2">Proposed Solution *</label>
                <textarea name="proposedSolution" defaultValue={idea.proposedSolution} required rows="3" className="w-full px-4 py-2.5 rounded-lg border text-slate-800 resize-none" />
              </div>

              <div>
                <label className="block text-[18px] font-medium text-slate-700 mb-2">Detailed Description *</label>
                <textarea name="detailedDescription" defaultValue={idea.detailedDescription} required rows="4" className="w-full px-4 py-2.5 rounded-lg border text-slate-800 resize-none" />
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button type="button" onClick={() => setIsOpen(false)} className="bg-slate-100 text-slate-700 px-6 py-2.5 rounded-xl font-medium">Cancel</button>
                <button type="submit" className="bg-[#C6D62E] text-slate-900 font-bold px-6 py-2.5 rounded-xl">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}