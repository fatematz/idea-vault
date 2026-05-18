"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import logo from "@/assets/logo2.png";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Ideas", href: "/ideas" },
  { label: "Add Idea", href: "/ideas/add" },
  { label: "My Ideas", href: "/my-ideas" },
  { label: "My Interactions", href: "/my-interactions" },
];

const Navbar = () => {
  const pathname = usePathname();



  return (
    <div className="sticky top-0 z-50 px-6 py-3">
      <div className="max-w-4xl mx-auto bg-white rounded-full border border-gray-200 shadow-sm h-14 flex items-center px-4 gap-4">
        <Link href="/" className="flex-shrink-0">
          <Image src={logo} alt="logo" height={30} />
        </Link>

        <ul className="flex items-center gap-1 flex-1 justify-center list-none m-0 p-0">
          {navLinks.map(({ label, href }) => {
            const isActive = pathname === href;
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-base no-underline transition-colors
                    ${
                      isActive
                        ? "text-[#C6D62E] font-semibold"
                        : "text-black font-normal"
                    }`}
                >
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-primary inline-block" />
                  )}
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="">
          <h1>hi</h1>
        </div>


      </div>
    </div>
  );
};

export default Navbar;
