const NewIdeasPage = () => {
  return (
    <section className="bg-white dark:bg-slate-950 py-10 md:py-20 px-5">
      <div className="max-w-[1300px] mx-auto">

        <div className="text-center mb-4">
          <span className="inline-block bg-[#C6D62E] text-black px-4 py-1 rounded-full font-bold text-xs uppercase tracking-widest mb-6">
            Testimonial
          </span>
          <h2 className="text-3xl font-extrabold text-black dark:text-white leading-tight mb-10 md:mb-20">
            WHAT OUR CLIENTS THINK<br />
            <span className="text-[#C6D62E]">ABOUT OUR SERVICES.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

          <div className="bg-[#C6D62E] p-10 rounded-3xl flex flex-col justify-between">
            <h3 className="text-xs font-bold text-black opacity-70 mb-6 uppercase tracking-wider">Customer Stories</h3>
            <p className="text-[28px] font-bold text-black mb-8">"I use IdeaVault to help me succeed"</p>
            <p className="font-semibold text-black">— Adam Smith</p>
          </div>

          <div className="bg-[#C6D62E] p-10 rounded-3xl flex flex-col justify-between">
            <h3 className="text-xs font-bold text-black opacity-70 mb-6 uppercase tracking-wider">Facts & Numbers</h3>
            <div className="text-[64px] font-black text-black mb-2">89.5%</div>
            <p className="text-lg font-bold text-black">OF CUSTOMERS RECOMMEND SERVICES</p>
          </div>

          <div className="bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 p-10 rounded-3xl">
            <h3 className="text-xs font-bold text-gray-500 dark:text-slate-400 mb-6 uppercase tracking-wider">Customer Stories →</h3>
            <p className="text-gray-700 dark:text-slate-300 mt-16">Transforming Business Growth: How Just Dabao foe Strategic Investment.</p>
          </div>

          <div className="bg-gray-100 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 p-10 rounded-3xl">
            <h3 className="text-xs font-bold text-gray-500 dark:text-slate-400 mb-6 uppercase tracking-wider">Review</h3>
            <p className="text-[20px] text-gray-800 dark:text-slate-200 leading-relaxed mb-6">
              "We couldn't believe the difference IdeaVault made in our day-to-day operations. It's a game-changer!"
            </p>
            <p className="text-black dark:text-white font-bold">Alex Heals, CEO of Interfacts</p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default NewIdeasPage;