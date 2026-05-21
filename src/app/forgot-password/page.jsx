"use client";

import React from "react";
import Link from "next/link";

const ForgetPassword = () => {
  return (
    <div className="bg-[#C6D62E]/10 min-h-screen flex items-center justify-center px-4">

      <div className="min-h-[80vh] grid grid-cols-1 lg:grid-cols-2 mt-20 mb-5 border rounded-2xl shadow-[#C6D62E]/50 shadow-2xl max-w-[1300px] w-full mx-auto bg-white overflow-hidden">

        <div className="flex flex-col items-center justify-center px-6 py-10 sm:px-16 lg:px-24 xl:px-32 w-full">
          <div className="w-full max-w-md space-y-8">

            <div className="flex lg:hidden justify-center items-center select-none pt-2">
              <div className="relative w-32 h-32 flex items-center justify-center scale-75 sm:scale-90">
                <div className="absolute bottom-1 w-28 h-14 bg-[#C6D62E]/25 rounded-b-full blur-lg transform translate-y-2" />
                <div className="absolute top-[50%] w-30 h-4 bg-[#C6D62E]/15 blur-sm" />
                <div className="absolute top-0 w-28 h-14 bg-[#C6D62E] rounded-t-full shadow-inner" />
              </div>
            </div>

            <div className="text-center lg:text-left">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight mb-2">
                Forgot password?
              </h2>
              <p className="text-slate-500 text-sm">
                No worries! Enter your email and we'll send you a reset link.
              </p>
            </div>

            <div className="space-y-5">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#C6D62E]/30 focus:border-[#C6D62E] transition-all text-slate-800 text-sm"
                />
              </div>

              <button
                type="button"
                className="w-full bg-[#C6D62E] hover:bg-[#b5c527] text-slate-900 font-semibold py-3 rounded-lg transition-colors shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-[#C6D62E] focus:ring-offset-2 cursor-pointer"
              >
                Send reset link
              </button>
            </div>

            <p className="text-center text-sm text-slate-600 pt-2">
              Remember your password?{" "}
              <Link
                href="/signin"
                className="text-slate-900 font-bold hover:underline transition-all"
              >
                Sign in
              </Link>
            </p>

          </div>
        </div>

        <div className="hidden lg:flex bg-[#C6D62E]/10 items-center justify-center relative overflow-hidden select-none">
          <div className="relative w-80 h-80 flex items-center justify-center">
            <div className="absolute bottom-4 w-72 h-36 bg-[#C6D62E]/25 rounded-b-full blur-xl transform translate-y-4" />
            <div className="absolute top-[50%] w-76 h-12 bg-[#C6D62E]/25 blur-md" />
            <div className="absolute top-0 w-72 h-36 bg-[#C6D62E] rounded-t-full shadow-inner" />
          </div>
        </div>

      </div>
    </div>
  );
};

export default ForgetPassword;