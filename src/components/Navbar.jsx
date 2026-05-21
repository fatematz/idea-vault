"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import logo from "@/assets/logo3.png";
import { authClient } from "@/lib/auth-client";
import { Button } from "@heroui/react";

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => setMounted(true), []);

  const { data: session } = authClient.useSession();
  const user = session?.user;

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: { onSuccess: () => router.push("/signin") },
    });
  };

  const navLinks = user
    ? [
        { label: "Home", href: "/" },
        { label: "Ideas", href: "/ideas" },
        { label: "Add Idea", href: "/addidea" },
        { label: "My Ideas", href: "/myidea" },
        { label: "My Interactions", href: "/myinteractions" },
      ]
    : [
        { label: "Home", href: "/" },
        { label: "Ideas", href: "/ideas" },
      ];

  const ThemeToggle = () => mounted && (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-yellow-400 transition-all"
    >
      {theme === 'dark' ? '☀️' : '🌙'}
    </button>
  );

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 md:px-6 pt-4 pb-2">
      <div className="max-w-[1450px] mx-auto bg-white dark:bg-slate-900 rounded-full border border-gray-200 dark:border-slate-800 shadow-sm h-14 flex items-center px-4 justify-between gap-4 transition-colors">
        
        <div className="flex items-center gap-2 shrink-0">
          <Image src={logo} alt="logo" width={45} className="w-9 h-9" />
          <h2 className="font-bold text-slate-800 dark:text-white m-0 text-lg">
            <span className="text-[#C6D62E]">Idea</span>Vault
          </h2>
        </div>

        <ul className="hidden lg:flex items-center gap-1">
          {navLinks.map(({ label, href }) => (
            <li key={href}>
              <Link href={href} className={`px-4 py-2 rounded-full text-base ${pathname === href ? "text-[#C6D62E] font-bold bg-[#C6D62E]/20" : "text-slate-800 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"}`}>
                {label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden lg:flex items-center gap-3">
          <ThemeToggle />
          {session ? (
            <div className="relative">
              <div className="flex items-center gap-2 cursor-pointer" onClick={() => setDropdownOpen(!dropdownOpen)}>
                <img src={user?.image || "U"} className="w-9 h-9 rounded-full border dark:border-slate-700" alt="user" />
                <svg className={`w-4 h-4 transition-transform ${dropdownOpen ? "rotate-180" : ""}`} viewBox="0 0 24 24" stroke="currentColor" fill="none"><path d="m19.5 8.25-7.5 7.5-7.5-7.5"/></svg>
              </div>
              {dropdownOpen && (
                <div className="absolute right-0 top-14 w-48 bg-white dark:bg-slate-800 border dark:border-slate-700 rounded-2xl shadow-xl p-4">
                  <p className="font-bold text-sm dark:text-white mb-2">{user?.name}</p>
                  <Link href="/profile" className="block py-2 text-sm dark:text-slate-200">Update Profile</Link>
                  <Button onClick={handleLogout} className="w-full bg-[#C6D62E] text-slate-950 mt-2">Logout</Button>
                </div>
              )}
            </div>
          ) : (
     
            <div className="flex gap-3">
            <Link href="/signin" className="bg-[#C6D62E] px-5 py-2 rounded-full font-semibold">Sign In</Link>
            
            <Link href="/signup" className="bg-[#C6D62E] px-5 py-2 rounded-full font-semibold">Sign Up</Link>
            </div>
          )}
        </div>

        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden p-2 rounded-full bg-slate-100 dark:bg-slate-800">
          ☰
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="absolute top-20 left-4 right-4 bg-white dark:bg-slate-900 border dark:border-slate-800 rounded-2xl shadow-xl p-6 lg:hidden z-50">
          <div className="flex justify-between items-center mb-4">
            <span className="font-bold dark:text-white">Menu</span>
            <ThemeToggle />
          </div>
          <ul className="flex flex-col gap-2">
            {navLinks.map(({ label, href }) => (
              <li key={href}>
                <Link href={href} onClick={() => setMobileMenuOpen(false)} className="block p-2 dark:text-slate-300">{label}</Link>
              </li>
            ))}
          </ul>
          {session ? (
            <div className="border-t mt-4 pt-4 dark:border-slate-700">
              <p className="font-bold text-sm dark:text-white">{user?.name}</p>
              <Link href="/profile" className="block py-2 text-sm dark:text-slate-300">Update Profile</Link>
              <Button onClick={handleLogout} className="w-full bg-[#C6D62E] mt-2">Logout</Button>
            </div>
          ) : (
            <div className="border-t mt-4 pt-4">
              <Link href="/signin" className="block w-full text-center bg-[#C6D62E] py-2 rounded-xl font-bold">Sign in</Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;