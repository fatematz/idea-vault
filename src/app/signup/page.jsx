"use client";

import React, { useState } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation"; 

const signUpPage = () => {
  const [passwordError, setPasswordError] = useState("");
  const router = useRouter();
  const onSubmit = async (e) => {
    e.preventDefault();

    const fromData = new FormData(e.currentTarget);
    const user = Object.fromEntries(fromData.entries());
    console.log("user", user)
    const password = user.password;

    const hasMinLength = password.length >= 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);

    if (!hasMinLength || !hasUppercase || !hasLowercase) {
      setPasswordError("Password must be at least 8 characters and include uppercase & lowercase letters.");
      return; 
    }

    const { data, error } = await authClient.signUp.email({
        email: user.email,
        password: user.password,
        name: user.name,
        image: user.photoURL 
    });

    if (error) {
      toast.error(error.message || "Something went wrong! Please try again.");
    } else if (data) {
      toast.success("Account created successfully! 🎉");
      e.target.reset(); 
      setPasswordError("");
      
      setTimeout(() => {
        router.push("/");
      });
    }
  };

  const handlePasswordChange = (e) => {
    const password = e.target.value;

    const hasMinLength = password.length >= 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);

    if (password === "") {
      setPasswordError("");
    } else if (!hasMinLength || !hasUppercase || !hasLowercase) {
      setPasswordError("Password must be at least 8 characters and include uppercase & lowercase letters.");
    } else {
      setPasswordError("");
    }
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
                Create an account
              </h2>
              <p className="text-slate-500 text-sm">
                Please enter your details to register.
              </p>
            </div>

            <form onSubmit={onSubmit} className="space-y-5">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700">
                  Name
                </label>
                <input
                  type="text"
                  name="name" 
                  required
                  placeholder="Enter your full name"
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#C6D62E]/30 focus:border-[#C6D62E] transition-all text-slate-800 text-sm"
                />
              </div>

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
                  Photo URL
                </label>
                <input
                  type="url"
                  name="photoURL" 
                  required
                  placeholder="https://example.com/photo.jpg"
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
                  onChange={handlePasswordChange}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#C6D62E]/30 focus:border-[#C6D62E] transition-all text-slate-800 text-sm"
                />
                {passwordError && (
                  <p className="text-red-500 text-xs mt-1">{passwordError}</p>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-[#C6D62E] hover:bg-[#b5c527] text-slate-900 font-semibold py-3 rounded-lg transition-colors shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-[#C6D62E] focus:ring-offset-2 cursor-pointer mt-4"
              >
                Sign up
              </button>
            </form>

            <p className="text-center text-sm text-slate-600 pt-2">
              Already have an account?{" "}
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

export default signUpPage;