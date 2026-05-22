import Link from 'next/link';
import React from 'react';

const TrendingIdeas = async () => {
const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/trending-ideas?limit=6`);
    const trendingIdeas = await res.json();

    return (
        <div className="bg-slate-50/50 dark:bg-slate-950 min-h-screen">
            
            <div className="max-w-[1450px] mx-auto px-6 py-10 md:py-20">
                
                <div className="mb-12 text-center">
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight">
                        Trending <span className="text-[#C6D62E]">Ideas</span>
                    </h2>
                    <p className="text-slate-500 dark:text-slate-400 text-[18px] mt-2">
                        Explore the top 6 most innovative and discussed projects by creators.
                    </p>
                    <div className="border-b border-slate-200/60 dark:border-slate-700 w-full mt-6"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {trendingIdeas.map((idea) => (
                        <div 
                            key={idea._id} 
                            className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-700 rounded-2xl p-5 flex flex-col justify-between shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-200"
                        >
                            <div className="space-y-4">
                                
                                <div className="w-full h-56 rounded-xl overflow-hidden relative bg-slate-50 border border-slate-100">
                                    {idea.imageUrl ? (
                                        <img 
                                            src={idea.imageUrl} 
                                            alt={idea.title} 
                                            className="w-full h-full object-cover" 
                                        />
                                    ) : (
                                        <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 select-none">
                                            <span className="text-sm font-semibold uppercase">Image Not Found</span>
                                        </div>
                                    )}
                                    
                                    <span className="absolute top-3 left-3 bg-[#C6D62E] text-slate-950 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-sm z-10">
                                        {idea.category || "Idea"}
                                    </span>
                                </div>

                                <div className="space-y-2">
                                    <h3 className="text-[20px] font-bold text-slate-950 dark:text-white tracking-tight leading-snug line-clamp-2 min-h-[56px]">
                                        {idea.title}
                                    </h3>
                                    <p className="text-slate-600 dark:text-slate-400 text-[18px] leading-relaxed line-clamp-2 min-h-[54px]">
                                        {idea.shortDescription}
                                    </p>
                                </div>

                                {idea.budget && (
                                    <p className="text-[18px] font-extrabold text-emerald-700 dark:text-emerald-400">
                                        Budget: ${Number(idea.budget).toLocaleString()}
                                    </p>
                                )}
                            </div>

                            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-700 space-y-4">
                                
                                <div className="flex items-center gap-3">
                                    {idea.userImage ? (
                                        <div className="w-9 h-9 rounded-full overflow-hidden border border-slate-100 shadow-sm flex-shrink-0">
                                            <img src={idea.userImage} alt={idea.userName} className="w-full h-full object-cover" />
                                        </div>
                                    ) : (
                                        <div className="w-9 h-9 rounded-full bg-teal-600 text-white font-bold flex items-center justify-center text-sm flex-shrink-0">
                                            {idea.userName ? idea.userName.charAt(0).toUpperCase() : "M"}
                                        </div>
                                    )}
                                    <span className="text-slate-700 dark:text-slate-300 text-[18px] font-medium truncate max-w-[180px]">
                                        {idea.userName || "Anonymous Creator"}
                                    </span>
                                </div>

                                <Link
                                    href={`/ideas/${idea._id}`}
                                    className="w-full bg-[#C6D62E] hover:bg-[#b5c527] text-slate-950 text-center font-bold text-[18px] py-3 rounded-xl block transition-colors shadow-sm"
                                >
                                    View Details
                                </Link>
                            </div>

                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default TrendingIdeas;