"use client";

import React from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";

const signInPage = () => {
  const router = useRouter();

  // const onSubmit = async (e) => {
  //   e.preventDefault();

  //   const formData = new FormData(e.currentTarget);
  //   const user = Object.fromEntries(formData.entries());

  //   const { data, error } = await authClient.signIn.email({
  //     email: user.email,
  //     password: user.password,
  //   });

  //   if (error) {
  //     toast.error(error.message || "Invalid email or password!");
  //     return;
  //   }

  //   if (data) {
  //     toast.success("Welcome back!");
  //     e.currentTarget.reset();

  //     setTimeout(() => {
  //       router.push("/"); 
  //     });
  //   }
  // };


const onSubmit = async (e) => {
  e.preventDefault();

  const formData = new FormData(e.currentTarget);
  const user = Object.fromEntries(formData.entries());

  const { error } = await authClient.signIn.email({
    email: user.email,
    password: user.password,
  });

  if (error) {
    toast.error(error.message || "Invalid email or password!");
    return;
  }

  toast.success("Welcome back!");
  
  setTimeout(() => {
    window.location.href = "/";
  }, 500);
};

  const handleGoogleSignin = async () => {
    await authClient.signIn.social({
      provider: "google",
    });
  };


  return (
    <div className="bg-[#C6D62E]/10 min-h-screen flex items-center justify-center px-4">
      <ToastContainer position="top-right" autoClose={3000} />

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
                Welcome back
              </h2>
              <p className="text-slate-500 text-sm">
                Welcome back! Please enter your details.
              </p>
            </div>

            <form onSubmit={onSubmit} className="space-y-5">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#C6D62E]/30 focus:border-[#C6D62E] transition-all text-slate-800 text-sm"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  required
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#C6D62E]/30 focus:border-[#C6D62E] transition-all text-slate-800 text-sm"
                />
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 text-slate-600 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-slate-300 text-[#C6D62E] focus:ring-[#C6D62E]"
                  />
                  Remember for 30 days
                </label>
                <Link
                  href="/forgot-password"
                  className="text-slate-600 hover:text-slate-900 font-medium transition-colors no-underline"
                >
                  Forgot password
                </Link>
              </div>

              <button
                type="submit"
                className="w-full bg-[#C6D62E] hover:bg-[#b5c527] text-slate-900 font-semibold py-3 rounded-lg transition-colors shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-[#C6D62E] focus:ring-offset-2 cursor-pointer"
              >
                Sign in
              </button>
            </form>

            <button
              onClick={handleGoogleSignin}
              type="button"
              className="w-full bg-white hover:bg-[#b5c527] text-slate-900 font-semibold py-3 rounded-lg transition-colors shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-[#C6D62E] focus:ring-offset-2 cursor-pointer"
            >
              <div className="flex justify-center items-center gap-2">
                <FcGoogle size={18} />
                <div>Sign in with google</div>
              </div>
            </button>

            <p className="text-center text-sm text-slate-600 pt-2">
              Don't have an account?
              <Link
                href="/signup"
                className="text-slate-900 font-bold hover:underline transition-all"
              >
                Sign up
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

export default signInPage;