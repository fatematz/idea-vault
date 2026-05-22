"use client";
import React, { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

const MyInteractions = () => {
  const [myComments, setMyComments] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const { data: session } = authClient.useSession();

  useEffect(() => {
    const fetchMyComments = async () => {
      if (!session?.user?.email) return;
      
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/user-comments?email=${session.user.email}`);
        if (res.ok) {
          const data = await res.json();
          setMyComments(data);
        }
      } catch (error) {
        console.error("Error loading interactions:", error);
      } finally {
        setLoading(false);
      }
    };

    if (session) {
      fetchMyComments();
    }
  }, [session]);

  return (
    <div className="max-w-[1200px] w-full mx-auto px-6 pt-30 pb-15">
      <h1 className="text-[25px] font-black mb-10 text-slate-900 dark:text-white">My <span className="text-[#C6D62E]">Interactions</span>  </h1>
      <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-700 rounded-2xl p-6 shadow-sm">
        <h3 className="text-xl font-bold text-slate-950 dark:text-white mb-6">
          My Comment Interactions ({myComments.length})
        </h3>

        {loading ? (
          <p className="text-slate-400 text-sm italic">Loading your comments...</p>
        ) : myComments.length > 0 ? (
          <div className="space-y-4">
            {myComments.map((comment) => (
              <div
                key={comment._id}
                className="bg-slate-50 dark:bg-slate-800 p-4 rounded-xl border border-slate-100 dark:border-slate-700 flex flex-col gap-3"
              >
                

                <div className="flex gap-3 items-start">
                  <img
                   src={comment.userImage || session?.user?.image}
                    alt={comment.userName}
                    className="w-10 h-10 rounded-full object-cover border border-slate-200 dark:border-slate-600"
                  />

                   
                  <div className="space-y-1 w-full">
                    <span className="font-bold text-[20px] text-slate-800 dark:text-white block">
                      {comment.userName || "Anonymous"}
                    </span>
                    <p className="text-slate-600 dark:text-slate-400 text-[18px] leading-relaxed">
                      {comment.text}
                    </p>

                     <span className="text-[17px] text-slate-400">
                    {comment.createdAt ? new Date(comment.createdAt).toLocaleDateString() : ""}
                  </span>
                  </div>

               <div className="flex justify-between items-center border-b border-slate-200/60 dark:border-slate-700 pb-2">
                  
                  <Link
    href={`/ideas`}
    className="text-[18px] font-semibold flex gap-3 justify-center text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white decoration-[#C6D62E]"
  >
    ViewIdea <FaArrowRight />
  </Link>
                </div>

                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-slate-400 text-sm italic">
            You haven't commented on any ideas yet!
          </p>
        )}
      </div>
    </div>
  );
};

export default MyInteractions;