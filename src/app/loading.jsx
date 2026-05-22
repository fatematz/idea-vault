const Loading = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center">
      <div className="flex flex-col items-center gap-5 select-none">

        {/* Spinner */}
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full border-4 border-slate-200"></div>
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-[#C6D62E] animate-spin"></div>
          <div className="absolute inset-2 rounded-full bg-[#C6D62E]/10 flex items-center justify-center">
            <div className="w-3 h-3 rounded-full bg-[#C6D62E] animate-pulse"></div>
          </div>
        </div>

        <div className="text-center space-y-1">
          <p className="text-slate-700 font-semibold text-[16px]">Loading</p>
          <p className="text-slate-400 text-sm">Please wait a moment...</p>
        </div>

      </div>
    </div>
  );
};

export default Loading;