import Link from "next/link";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="text-center space-y-6 max-w-md">

        <div className="relative inline-block select-none">
          <span className="text-[10rem] font-black text-slate-100 leading-none">404</span>
          <span className="absolute inset-0 flex items-center justify-center text-[10rem] font-black text-[#C6D62E]/20 leading-none blur-sm">404</span>
          <span className="absolute inset-0 flex items-center justify-center text-5xl font-black text-slate-800">
            Oops!
          </span>
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-slate-900">Page Not Found</h2>
          <p className="text-slate-500 text-[16px]">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        <div className="flex justify-center gap-3 pt-2">
          <Link
            href="/"
            className="bg-[#C6D62E] hover:bg-[#b5c527] text-slate-950 font-bold px-6 py-3 rounded-xl text-sm transition-colors shadow-sm"
          >
            Back to Home
          </Link>
          <Link
            href="/ideas"
            className="bg-white hover:bg-slate-100 text-slate-700 font-semibold px-6 py-3 rounded-xl text-sm transition-colors border border-slate-200"
          >
            Browse Ideas
          </Link>
        </div>

      </div>
    </div>
  );
};

export default NotFound;