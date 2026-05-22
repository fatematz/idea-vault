import React from "react";
import CommentsSection from "@/components/CommentsSection";
import { DeleteIdeaModal } from "@/components/DeleteIdeaModal";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";


const IdeaDetails = async ({ params }) => {
  const { id } = await params;
  
  const headerList = await headers();

  const tokenData = await auth.api.getToken({
    headers: headerList,
  });

  const actualToken = tokenData?.token;

  console.log(actualToken);

  const session = await auth.api.getSession({
    headers: headerList,
  });

  const userEmail = session?.user?.email;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/all-ideas?email=${userEmail}`,
    {
      headers: {
        'Authorization': actualToken ? `Bearer ${actualToken}` : '',
        'Content-Type': 'application/json'
      },
      cache: "no-store",
    }
  );


  if (!res.ok) {
    const errorData = await res.json();
    console.error("Server Error:", errorData);
    return (
      <div className="text-center py-32 text-red-500 font-bold text-[20px]">
        {errorData.message || "Unauthorized access"}
      </div>
    );
  }

  const allIdeas = await res.json();
  if (!Array.isArray(allIdeas)) {
    return (
      <div className="text-center py-32 dark:text-slate-300">
        Data format is invalid or server error occurred!
      </div>
    );
  }

  const idea = allIdeas.find((item) => item._id?.toString() === id?.toString());

  if (!idea) {
    return (
      <div className="text-center py-32 text-slate-500 font-medium text-[20px]">
        Idea details not found! <br />
        <span className="text-sm text-slate-400 font-mono block mt-2">
          Requested ID: {id}
        </span>
      </div>
    );
  }

  let fetchedComments = [];
  try {
    const commentsRes = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/comments/${id}`, {
      cache: "no-store",
    });
    if (commentsRes.ok) {
      fetchedComments = await commentsRes.json();
    }
  } catch (error) {
    console.error("Failed to fetch comments from server:", error);
  }

  return (
    <div className="max-w-[1300px] w-full mx-auto px-6 py-24 mt-10">
      <div className="mb-16 max-w-2xl">
        <div className="flex items-center gap-2 text-[25px] font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-3">
          Innovation <span className="text-[#C6D62E]">Details</span>
        </div>
        <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-950 dark:text-white leading-tight">
          {idea.title} <br />
          <span className="font-serif italic font-normal text-slate-800 dark:text-slate-300 text-3xl sm:text-4xl">
            Deep dive into execution
          </span>
        </h2>
        <div className="border-b border-slate-200 dark:border-slate-700 w-full my-6"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start border dark:border-slate-700 rounded-2xl bg-gray-50 dark:bg-slate-900 p-15">
        <div className="lg:col-span-5 relative w-full max-w-[450px] mx-auto lg:mx-0">
          <div className="w-full h-[380px] rounded-[2.5rem] overflow-hidden bg-slate-50 border border-slate-100 shadow-sm relative">
            {idea.imageUrl ? (
              <img
                src={idea.imageUrl}
                alt={idea.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-slate-100 dark:bg-slate-800 flex flex-col items-center justify-center text-slate-400">
                <span className="text-sm font-semibold uppercase">
                  No Image Available
                </span>
              </div>
            )}
          </div>

          <div className="absolute -top-6 -right-6 w-28 h-28 bg-[#C6D62E] rounded-3xl shadow-md flex flex-col items-center justify-center p-2 text-center z-10 select-none">
            <span className="text-[16px] font-bold text-slate-900 leading-tight mt-1 capitalize block truncate w-full px-1">
              {idea.category || "Idea"}
            </span>
          </div>
        </div>

        <div className="lg:col-span-7 space-y-6 bg-white dark:bg-slate-800 p-5 rounded-2xl">
          <div className="space-y-2">
            <p className="text-[20px] font-medium text-slate-800 dark:text-slate-200 leading-relaxed italic border-l-4 border-[#C6D62E] pl-3">
              {idea.shortDescription}
            </p>

            {idea.budget && (
              <p className="text-[22px] font-black text-emerald-700 dark:text-emerald-400 pt-2">
                Estimated Budget: ${Number(idea.budget).toLocaleString()}
              </p>
            )}
          </div>

          <div className="space-y-6 pt-4 border-t border-slate-100 dark:border-slate-700">
            <div className="space-y-1">
              <h4 className="text-[19px] font-black text-slate-950 dark:text-white uppercase tracking-wide">
                The Problem:
              </h4>
              <p className="text-slate-600 dark:text-slate-400 text-[18px] leading-relaxed whitespace-pre-line">
                {idea.problemStatement || "No problem statement provided."}
              </p>
            </div>

            <div className="space-y-1">
              <h4 className="text-[19px] font-black text-slate-950 dark:text-white uppercase tracking-wide">
                Proposed Solution:
              </h4>
              <p className="text-slate-600 dark:text-slate-400 text-[18px] leading-relaxed whitespace-pre-line">
                {idea.proposedSolution || "No solution proposed yet."}
              </p>
            </div>

            <div className="space-y-1">
              <h4 className="text-[19px] font-black text-slate-950 dark:text-white uppercase tracking-wide">
                Target Audience:
              </h4>
              <p className="text-slate-600 dark:text-slate-400 text-[18px] leading-relaxed">
                {idea.targetAudience || "General Public"}
              </p>
            </div>

            <div className="space-y-1">
              <h4 className="text-[19px] font-black text-slate-950 dark:text-white uppercase tracking-wide">
                Detailed Breakdown:
              </h4>
              <p className="text-slate-600 dark:text-slate-400 text-[18px] leading-relaxed whitespace-pre-line">
                {idea.detailedDescription || "No detailed breakdown available."}
              </p>
            </div>
          </div>

          <div className="pt-6 flex flex-wrap items-center justify-between gap-4 border-t border-slate-100 dark:border-slate-700">
            {idea.tags && (
              <div className="flex flex-wrap gap-2">
                {idea.tags.split(",").map((tag, index) => (
                  <span
                    key={index}
                    className="text-[16px] font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-700 px-3 py-1 rounded-xl"
                  >
                    #{tag.trim()}
                  </span>
                ))}
              </div>
            )}

            <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-700 px-4 py-2 rounded-full border border-slate-100 dark:border-slate-600">
              <span className="text-xs text-slate-400 font-bold uppercase">
                Created By:
              </span>
              <span className="text-[16px] font-bold text-slate-800 dark:text-white">
                {idea.userName || "Anonymous"}
              </span>
            </div>
          </div>
        </div>
      </div>

      <CommentsSection ideaId={idea._id} initialComments={fetchedComments} ideaTitle={idea.title} />
    </div>
  );
};

export default IdeaDetails;