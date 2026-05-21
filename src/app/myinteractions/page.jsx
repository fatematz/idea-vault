"use client";
import React, { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";

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
    <div className="max-w-[1200px] w-full mx-auto px-6 mt-30 mb-15">
      <div className="bg-white border border-slate-200/60 rounded-2xl p-6 shadow-sm">
        <h3 className="text-xl font-bold text-slate-950 mb-6">
          My Comment Interactions ({myComments.length})
        </h3>

        {loading ? (
          <p className="text-slate-400 text-sm italic">Loading your comments...</p>
        ) : myComments.length > 0 ? (
          <div className="space-y-4">
            {myComments.map((comment) => (
              <div
                key={comment._id}
                className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex flex-col gap-3"
              >
                <div className="flex justify-between items-center border-b border-slate-200/60 pb-2">
                  
                 
                </div>

                <div className="flex gap-3 items-start">
                  <img
                   src={comment.userImage || session?.user?.image}
                    alt={comment.userName}
                    className="w-10 h-10 rounded-full object-cover border border-slate-200"
                  />

                   
                  <div className="space-y-1 w-full">
                    <span className="font-bold text-[20px] text-slate-800 block">
                      {comment.userName || "Anonymous"}
                    </span>
                    <p className="text-slate-600 text-[18px] leading-relaxed">
                      {comment.text}
                    </p>

                     <span className="text-[17px] text-slate-400">
                    {comment.createdAt ? new Date(comment.createdAt).toLocaleDateString() : ""}
                  </span>
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