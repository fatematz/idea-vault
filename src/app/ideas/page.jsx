
'use client';
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { authClient } from "@/lib/auth-client"; 

const IdeasPage = () => {
    const [allIdeas, setAllIdeas] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All Categories');
    const [loading, setLoading] = useState(true);
    const [openDropdown, setOpenDropdown] = useState(false);
    const dropdownRef = useRef(null);

    const { data: session } = authClient.useSession(); 

    const categories = ['All Categories', 'Tech', 'Health', 'AI', 'Education', 'Ecommerce'];

    useEffect(() => {
        const fetchIdeas = async () => {
            try {
                const emailQuery = session?.user?.email ? `?email=${session.user.email}` : '';
                const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/all-ideas?search=${searchQuery}`);
                const data = await res.json();
                setAllIdeas(data);
            } catch (error) {
                console.error("Error fetching ideas:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchIdeas();
    }, [session, searchQuery]); // 

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpenDropdown(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

const filteredIdeas = Array.isArray(allIdeas)
    ? allIdeas.filter((idea) => {
        return selectedCategory === 'All Categories' ||
            idea.category?.toLowerCase() === selectedCategory.toLowerCase();
    })
    : [];

    return (
        <div className="bg-slate-50/50 dark:bg-slate-950 min-h-screen pt-28 pb-20">
            <div className="max-w-[1450px] mx-auto px-6">
                
                <div className="mb-8">
                    <h1 className="text-[25px] font-extrabold text-slate-900 dark:text-white tracking-tight">
                        Browse <span className='text-[#C6D62E]'>Ideas</span> 
                    </h1>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 mb-12">
                    <div className="relative flex-1">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                            <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </span>
                        <input
                            type="text"
                            placeholder="Search ideas..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-[#C6D62E]/30 focus:border-[#C6D62E] transition-all text-slate-800 dark:text-white shadow-sm"
                        />
                    </div>

                    <div className="relative min-w-[200px]" ref={dropdownRef}>
                        <button
                            type="button"
                            onClick={() => setOpenDropdown(!openDropdown)}
                            className="w-full px-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C6D62E]/30 focus:border-[#C6D62E] hover:border-[#C6D62E] text-slate-700 dark:text-slate-200 font-medium shadow-sm flex justify-between items-center transition-all cursor-pointer text-base"
                        >
                            <span className="truncate">{selectedCategory}</span>
                            <svg className={`w-4 h-4 text-slate-400 transition-transform ml-2 flex-shrink-0 ${openDropdown ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>

                        {openDropdown && (
                            <div className="absolute z-20 mt-2 w-full bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-700 rounded-xl shadow-lg max-h-60 overflow-y-auto py-1.5 left-0">
                                {categories.map((cat, idx) => (
                                    <button
                                        key={idx}
                                        type="button"
                                        onClick={() => {
                                            setSelectedCategory(cat);
                                            setOpenDropdown(false);
                                        }}
                                        className="w-full text-left px-4 py-2.5 text-sm text-slate-700 dark:text-slate-300 hover:bg-[#C6D62E] hover:text-slate-950 transition-colors font-medium"
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {loading ? (
                    <div ></div>
                ) : (
                    <>
                        {filteredIdeas.length === 0 ? (
                            <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-2xl border border-dashed border-slate-200 dark:border-slate-700 p-8">
                                <p className="text-slate-500 dark:text-slate-400 text-[18px] font-medium">No ideas found matching your criteria.</p>
                                <button 
                                    onClick={() => { setSearchQuery(''); setSelectedCategory('All Categories'); }}
                                    className="mt-4 text-sm font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-900 underline decoration-[#C6D62E] underline-offset-4"
                                >
                                    Reset all filters
                                </button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {filteredIdeas.map((idea) => (
                                    <div 
                                        key={idea._id} 
                                        className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-700 rounded-2xl p-5 flex flex-col justify-between shadow-sm hover:shadow-md transition-all duration-200"
                                    >
                                        <div className="space-y-4">
                                            <div className="w-full h-52 rounded-xl overflow-hidden relative bg-slate-50 border border-slate-100">
                                                <img 
                                                    src={idea.imageUrl || idea.image || 'https://via.placeholder.com/400x250'} 
                                                    alt={idea.title || "Idea Image"} 
                                                    className="w-full h-full object-cover" 
                                                />
                                                <span className="absolute top-3 left-3 bg-[#C6D62E] text-slate-950 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                                                    {idea.category || "Idea"}
                                                </span>
                                            </div>

                                            <div className="space-y-2">
                                                <h3 className="text-[20px] font-bold text-slate-950 dark:text-white line-clamp-2 min-h-[56px]">
                                                    {idea.title}
                                                </h3>
                                                <p className="text-slate-600 dark:text-slate-400 text-[16px] line-clamp-2 min-h-[48px]">
                                                    {idea.shortDescription}
                                                </p>
                                            </div>

                                            {idea.budget && (
                                                <p className="text-[16px] font-bold text-emerald-700 dark:text-emerald-400">
                                                    Budget: ${Number(idea.budget).toLocaleString()}
                                                </p>
                                            )}
                                        </div>

                                        <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-700">
                                            <Link 
                                                href={`/ideas/${idea._id}`}
                                                className="w-full bg-[#C6D62E] hover:bg-[#b5c527] text-slate-950 text-center font-bold text-sm py-3 rounded-xl block transition-colors shadow-sm"
                                            >
                                                View Details
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </>
                )}

            </div>
        </div>
    );
};

export default IdeasPage;