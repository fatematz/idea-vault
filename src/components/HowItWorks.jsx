import React from 'react';

const HowItWorks = () => {
  const steps = [
    { title: "Share Idea", desc: "Submit your innovative concepts easily." },
    { title: "Get Feedback", desc: "Community reviews and constructive advice." },
    { title: "Get Funded", desc: "Connect with investors for execution." }
  ];

  return (
    <section className="py-10 md:py-20 bg-white dark:bg-slate-950">
      <div className="max-w-[1300px] mx-auto px-6 text-center">
        <h2 className="text-3xl font-extrabold text-slate-950 dark:text-white mb-12">How It <span className='text-[#C6D62E]'>Works</span> </h2>
        
        {/* Flex container */}
        <div className="flex flex-wrap justify-center gap-8">
          {steps.map((step, i) => (
            <div 
              key={i} 
              className="flex-1 min-w-[280px] max-w-[400px] p-8 border border-slate-100 dark:border-slate-800 rounded-3xl bg-slate-50 dark:bg-slate-900 transition-all hover:shadow-lg"
            >
              <div className="w-12 h-12 bg-[#C6D62E] text-slate-950 font-black flex items-center justify-center rounded-full mx-auto mb-6 text-xl">
                {i + 1}
              </div>
              <h3 className="text-xl font-bold mb-3 dark:text-white">{step.title}</h3>
              <p className="text-slate-600 dark:text-slate-400">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;