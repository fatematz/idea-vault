"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import banner1 from "@/assets/banner.png";
import banner2 from "@/assets/banner2.png";
import banner3 from "@/assets/banner3.png";
import Link from "next/link";

const slides = [
  {
    image: banner1,
    heading: "Turn Your Ideas Into Reality",
    sub: "Where visionaries meet opportunity.",
  },
  {
    image: banner2,
    heading: "Innovate. Build. Disrupt.",
    sub: "The launchpad for tomorrow's breakthroughs.",
  },
  {
    image: banner3,
    heading: "Your Startup Journey Starts Here",
    sub: "Connect, collaborate, and create the future.",
  },
];

const Banner = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden">

   
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === current ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={slide.image}
            alt={`slide-${index}`}
            fill
            className="object-cover"
            priority={index === 0}
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
      ))}

      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
        <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight drop-shadow-lg transition-all duration-700">
          {slides[current].heading}
        </h1>
        <p className="mt-4 text-lg md:text-xl text-white/80 max-w-xl">
          {slides[current].sub}
        </p>
        <Link href="/ideas" className="mt-8 px-8 py-4 bg-[#C6D62E] text-black font-bold text-lg rounded-full hover:scale-105 transition-transform shadow-lg">
          Explore Ideas →
        </Link>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === current
                ? "bg-[#C6D62E] scale-125"
                : "bg-white/50 hover:bg-white"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Banner;