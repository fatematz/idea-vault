

import { DeleteIdeaModal } from "@/components/DeleteIdeaModal";
import { EditIdeaModal } from "@/components/EditIdeaModal";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";



const myIdeaPage = async () => {

    const session = await auth.api.getSession({
    headers: await headers()
  });

  // const token = session?.token;


  const {token} = await auth.api.getToken({
    headers: await headers()
  })

  console.log(token)



  const email = session?.user?.email;

  if (!email) {
    return (
      <div className="max-w-[1300px] mx-auto px-6 py-16 mt-20 text-center text-red-500 font-bold text-xl">
        Please log in to view your ideas.
      </div>
    );
  }


  const res = await fetch(`http://localhost:5000/myidea?email=${email}`,  {
     headers: {
      authorization: `Bearer ${token}`
     }
    
  });
  
  const myIdea = await res.json();
  console.log("My Idea Data:", myIdea);


  return (
    <div className="max-w-[1300px]  mx-auto px-6 py-16 mt-20">
      <div className="mb-16 max-w-2xl">
        <div className="flex items-center gap-2 text-[18px] font-bold text-slate-800 uppercase tracking-wider mb-3">
          <span className="w-5 h-5 bg-[#C6D62E] rounded-full flex items-center justify-center text-slate-950 font-black text-[14px]">
            +
          </span>
          About My Ideas
        </div>
    
        <div className="border-b border-slate-200 w-full my-6"></div>
        <p className="text-slate-600 text-[19px] leading-relaxed">
          Total shared innovations:{" "}
          <span className="font-bold text-slate-950">{myIdea.length}</span>.
          Explore the breakdown of problems and solutions designed to scale.
        </p>
      </div>

      <div className="space-y-24 ">
        {myIdea.map((idea) => (
          <div
            key={idea._id}
            className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center border rounded-2xl bg-gray-50 p-15 "
          >
            <div className="lg:col-span-5 relative w-full max-w-[450px] mx-auto lg:mx-0">
              {idea.imageUrl && (
                <div className="w-full h-[350px] rounded-[2.5rem] overflow-hidden bg-slate-50 border border-slate-100 shadow-sm">
                  <img
                    src={idea.imageUrl}
                    alt={idea.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="absolute -top-6 -right-6 w-28 h-28 bg-[#C6D62E] rounded-3xl shadow-md flex flex-col items-center justify-center p-2 text-center z-10 select-none">
                <span className="text-[18px] font-bold !text-slate-900 leading-tight mt-1 capitalize block truncate w-full px-1">
                  {idea.category || ""}
                </span>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight leading-tight">
                  {idea.title}{" "}
               
                </h3>

                <p className="text-[20px] font-medium text-slate-800 leading-relaxed italic border-l-4 border-[#C6D62E] pl-3">
                  {idea.shortDescription}
                </p>

                {idea.budget && (
                  <p className="text-[18px] font-extrabold text-[#C6D62E] pt-1">
                    Estimated Budget: ${Number(idea.budget).toLocaleString()}
                  </p>
                )}
              </div>

              <div className="space-y-7 pt-2 ">
                <div className="space-y-1">
                  <h4 className="text-[19px] font-black text-slate-950 uppercase tracking-wide">
                    The Problem:
                  </h4>
                  <p className="text-slate-600 text-[18px] leading-relaxed whitespace-pre-line">
                    {idea.problemStatement}
                  </p>
                </div>

                <div className="space-y-1">
                  <h4 className="text-[19px] font-black text-slate-950 uppercase tracking-wide">
                    Proposed Solution:
                  </h4>
                  <p className="text-slate-600 text-[18px] leading-relaxed whitespace-pre-line">
                    {idea.proposedSolution}
                  </p>
                </div>

                <div className="space-y-1">
                  <h4 className="text-[19px] font-black text-slate-950 uppercase tracking-wide">
                    Target Audience:
                  </h4>
                  <p className="text-slate-600 text-[18px] leading-relaxed">
                    {idea.targetAudience}
                  </p>
                </div>

                <div className="space-y-1">
                  <h4 className="text-[19px] font-black text-slate-950 uppercase tracking-wide">
                    Detailed Breakdown:
                  </h4>
                  <p className="text-slate-600 text-[18px] leading-relaxed whitespace-pre-line">
                    {idea.detailedDescription}
                  </p>
                </div>
              </div>

              <div className="pt-4 flex flex-wrap items-center justify-between gap-4 border-t border-slate-100">
                {idea.tags && (
                  <div className="flex flex-wrap gap-2">
                    {idea.tags.split(",").map((tag, index) => (
                      <span
                        key={index}
                        className="text-[18px] font-semibold text-slate-700 bg-slate-50 px-3 py-1 rounded-xl"
                      >
                        #{tag.trim()}
                      </span>
                    ))}
                  </div>
                )}

                <div className="flex justify-center gap-2">
                <EditIdeaModal idea={idea} />
                 <DeleteIdeaModal ideaId={idea._id} />
                 </div>

                
              </div>
            </div>

            <div className="col-span-1 lg:col-span-12 border-b border-slate-100 pt-12"></div>
          </div>
        ))}

        {myIdea.length === 0 && (
          <div className="text-center py-24 text-slate-400 border-2 border-dashed border-slate-200 rounded-[2.5rem] text-[20px] font-medium">
            You haven't added any ideas yet.
          </div>
        )}
      </div>
    </div>
  );
};

export default myIdeaPage;
