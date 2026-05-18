import React from 'react';
import { FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6'; 
import { HiOutlineMail, HiOutlinePhone, HiOutlineLocationMarker } from 'react-icons/hi';

import logo from '@/assets/logo3.png'; 
import Image from 'next/image';

const Footer = () => {
  return (
    <footer className="bg-[#1F6F5F] text-gray-300 py-12 px-6 border-t border-gray-800">
      <div className="max-w-[1450px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        
        <div className="space-y-4">
          <div className="flex items-center gap-1">
                    <Image src={logo} alt="logo" width={50} />
                  <div className="text-2xl font-black">
                    <h2> <span className='text-[#C6D62E] text-4xl'>Idea</span  >Vault</h2>
                  </div>
              </div>
          <p className="text-[20px] text-gray-400 max-w-xs">
            Welcome to IdeaVault – your partner in fueling startups and scaling investments.
          </p>
          <div className="flex space-x-3 pt-2">
            <a href="#" className="p-2 bg-gray-800 hover:bg-[#C6D62E] hover:text-[#0b1c15] transition-all rounded-full text-[20px]">
              <FaFacebookF />
            </a>
            <a href="#" className="p-2 bg-gray-800 hover:bg-[#C6D62E] hover:text-[#0b1c15] transition-all rounded-full text-[20px]">
              <FaXTwitter />
            </a>
            <a href="#" className="p-2 bg-gray-800 hover:bg-[#C6D62E] hover:text-[#0b1c15] transition-all rounded-full text-[20px]">
              <FaInstagram />
            </a>
            <a href="#" className="p-2 bg-gray-800 hover:bg-[#C6D62E] hover:text-[#0b1c15] transition-all rounded-full text-[20px]">
              <FaLinkedinIn />
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-4 text-[20px]">Platform</h3>
          <ul className="space-y-2 text-[16px] font-bold">
            <li><a href="#" className="hover:text-[#C6D62E] transition-colors">Home</a></li>
            <li><a href="#" className="hover:text-[#C6D62E] transition-colors">Ideas</a></li>
            <li><a href="#" className="hover:text-[#C6D62E] transition-colors">Add Idea</a></li>
            <li><a href="#" className="hover:text-[#C6D62E] transition-colors">My Ideas</a></li>
            <li><a href="#" className="hover:text-[#C6D62E] transition-colors">My Interactions</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-4 text-[20px]">Contact Info</h3>
          <ul className="space-y-3 text-[16px] text-gray-400">
            <li className="flex items-center space-x-2">
              <HiOutlinePhone className="text-[#C6D62E] text-lg" />
              <span>01712345678</span>
            </li>
            <li className="flex items-center space-x-2">
              <HiOutlineMail className="text-[#C6D62E] text-lg" />
              <span>123@IdeaVault.com</span>
            </li>
            <li className="flex items-start space-x-2">
              <HiOutlineLocationMarker className="text-[#C6D62E]  mt-0.5" />
              <span>Dhaka, Bangladesh</span>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-4 text-[20px]">Get Updates</h3>
          <p className="text-[18px] text-gray-400 mb-3">Subscribe for Investment Tips.</p>
          <div className="flex max-w-sm bg-gray-800 rounded-lg overflow-hidden border border-gray-700 focus-within:border-[#C6D62E] transition-all">
            <input 
              type="email" 
              placeholder="Email Address" 
              className="bg-transparent px-4 py-2 text-sm w-full outline-none text-white"
            />
            <button className="bg-[#C6D62E] text-[#0b1c15] font-semibold px-4 py-2 text-[16px] hover:bg-[#C6D62E] transition-colors">
              Join
            </button>
          </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center text-[16px] text-white">
        <p>&copy; {new Date().getFullYear()} IdeaVault. All rights reserved.</p>
        <p>Designed by Fatema Tuj Johura</p>
      </div>
    </footer>
  );
};

export default Footer;