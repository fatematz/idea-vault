'use client'
import { authClient } from '@/lib/auth-client'; //1
import React, { useState, useEffect, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddIdea =() => {
  
  const [openDropdown, setOpenDropdown] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const dropdownRef = useRef(null);

  const { data: session } = authClient.useSession(); //2
  console.log( 'log',session)

  const categories = [
    { value: 'tech', label: 'Tech' },
    { value: 'health', label: 'Health' },
    { value: 'ai', label: 'AI' },
    { value: 'education', label: 'Education' },
    { value: 'ecommerce', label: 'E-commerce' }
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();

    
    const fromData = new FormData(e.currentTarget);
    const ideas = Object.fromEntries(fromData.entries());
    
    ideas.category = selectedCategory; //3

    ideas.email = session?.user?.email;

    console.log(ideas);
    
    if (!selectedCategory) {
      toast.warn('Please select a category first! ⚠️');
      return;
    }


        const {data: tokenData} = await authClient.token()
        console.log("tokenData", tokenData)

    try {
      const res = await fetch('http://localhost:5000/addidea', {
        method: "POST",
        headers: {
          'content-type': 'application/json',
          authorization: `Bearer ${tokenData?.token}`
        },
        body: JSON.stringify(ideas)
      });

      const data = await res.json();
      console.log(data);

      if (data.insertedId) {
        toast.success(' Idea submitted successfully!', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
        });

        e.target.reset(); 
        setSelectedCategory('');
      } else {
        toast.error('Failed to submit the idea. Please try again.');
      }
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong with the server!');
    }
  };

  return (
    <div className="mt-30">
      <div className=" pb-15 px-4 sm:px-6 lg:px-8 flex justify-center items-center">
        <div className="max-w-4xl w-full bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
          
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold text-slate-800">
              Add Your <span className="text-[#C6D62E]">Idea</span>
            </h2>
            <p className="text-slate-500 mt-2">Share your innovation with the world</p>
          </div>

          <form onSubmit={onSubmit} className="space-y-6" ref={dropdownRef}>
            
            <div>
              <label className="block text-[18px] font-medium text-slate-700 mb-2">Idea Title *</label>
              <input
                type="text"
                name="title"
                required
                placeholder="e.g. AI Medical Assistant"
                className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#C6D62E]/30 focus:border-[#C6D62E] transition-all text-slate-800"
              />
            </div>

            <div>
              <label className="block text-[18px] font-medium text-slate-700 mb-2">Short Description *</label>
              <input
                type="text"
                name="shortDescription"
                required
                placeholder="A one-liner or brief summary of your idea..."
                className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#C6D62E]/30 focus:border-[#C6D62E] transition-all text-slate-800"
              />
            </div>

            <div className="relative">
              <label className="block text-[18px] font-medium text-slate-700 mb-2">Category *</label>
              <button
                type="button"
                onClick={() => setOpenDropdown(!openDropdown)}
                className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-white text-left focus:outline-none focus:ring-2 focus:ring-[#C6D62E]/30 focus:border-[#C6D62E] flex justify-between items-center text-slate-800 transition-all text-sm"
              >
                <span className="truncate">
                  {selectedCategory 
                    ? categories.find(c => c.value === selectedCategory)?.label 
                    : 'Select Category'}
                </span>
                <svg className={`w-4 h-4 text-slate-400 transition-transform flex-shrink-0 ${openDropdown ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {openDropdown && (
                <div className="absolute z-20 mt-1 w-full bg-white border border-slate-100 rounded-lg shadow-lg max-h-60 overflow-y-auto py-1">
                  {categories.map((cat) => (
                    <button
                      key={cat.value}
                      type="button"
                      onClick={() => {
                        setSelectedCategory(cat.value);
                        setOpenDropdown(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-[#C6D62E] hover:text-slate-950 transition-colors"
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
                <input
                  type="url"
                  name="imageUrl"
                  required
                  placeholder="https://example.com/image.png"
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#C6D62E]/30 focus:border-[#C6D62E] transition-all text-slate-800"
                />
              </div>

              <div>
                <label className="block text-[18px] font-medium text-slate-700 mb-2">Estimated Budget (Optional)</label>
                <input
                  type="number"
                  name="budget"
                  placeholder="e.g. 5000"
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#C6D62E]/30 focus:border-[#C6D62E] transition-all text-slate-800"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[18px] font-medium text-slate-700 mb-2">Tags (Optional)</label>
                <input
                  type="text"
                  name="tags"
                  placeholder="e.g. AI, Health, SaaS"
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#C6D62E]/30 focus:border-[#C6D62E] transition-all text-slate-800"
                />
              </div>

              <div>
                <label className="block text-[18px] font-medium text-slate-700 mb-2">Target Audience *</label>
                <input
                  type="text"
                  name="targetAudience"
                  required
                  placeholder="e.g. College Students, Doctors"
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#C6D62E]/30 focus:border-[#C6D62E] transition-all text-slate-800"
                />
              </div>
            </div>

            <div>
              <label className="block text-[18px] font-medium text-slate-700 mb-2">Problem Statement *</label>
              <textarea
                name="problemStatement"
                required
                rows="3"
                placeholder="What specific problem does your idea address?..."
                className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#C6D62E]/30 focus:border-[#C6D62E] transition-all text-slate-800 resize-none"
              ></textarea>
            </div>

            <div>
              <label className="block text-[18px] font-medium text-slate-700 mb-2">Proposed Solution *</label>
              <textarea
                name="proposedSolution"
                required
                rows="3"
                placeholder="How does your idea solve this problem?..."
                className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#C6D62E]/30 focus:border-[#C6D62E] transition-all text-slate-800 resize-none"
              ></textarea>
            </div>

            <div>
              <label className="block text-[18px] font-medium text-slate-700 mb-2">Detailed Description *</label>
              <textarea
                name="detailedDescription"
                required
                rows="4"
                placeholder="Provide a comprehensive breakdown of your entire startup idea..."
                className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#C6D62E]/30 focus:border-[#C6D62E] transition-all text-slate-800 resize-none"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-[#C6D62E] hover:bg-[#b5c527] text-slate-900 font-semibold py-3 rounded-lg transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-[#C6D62E] focus:ring-offset-2"
            >
              Submit Idea
            </button>

          </form>
        </div>
      </div>
      
      <ToastContainer />
    </div>
  );
};

export default AddIdea;