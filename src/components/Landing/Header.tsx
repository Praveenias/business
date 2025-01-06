import React, { useState, useEffect } from 'react';

import SearchBar from './SearchBar';
import logo from '../../assets/images/logo.svg';


export default function Header() {
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolling(true);
      } else {
        setIsScrolling(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header
      className={`sticky w-full z-[9999] top-0 transition-all duration-300 ease-in-out
        ${isScrolling 
          ? 'py-2 bg-[#400C7A] shadow-lg' 
          : 'py-6 bg-gradient-to-t from-[#400C7A] to-[#7616E0]'
        }`}
    >
      <div className="mx-auto px-4">
        <div className="flex justify-between items-center">
        <div 
          className={`flex transition-all duration-500 ease-in-out
            ${isScrolling ? 'justify-center' : 'justify-between'} items-center`}
        >
            <img src={logo} alt="logo" className="max-w-[70%] pl-8 pt-[5%]" />
          </div>
        </div>

        <div 
          className={`transform transition-all duration-300 ease-in-out
            ${isScrolling 
              ? 'h-0 opacity-0 -translate-y-4' 
              : 'h-[125px] opacity-100 translate-y-0'
            }`}
        >
          <div className="text-center mb-8 h-[100px]">
            <h1 className="text-white text-3xl md:text-4xl font-medium mb-2 mt-4">
              Get your Business Connected with{' '}
              <span className="text-orange-500">Zuno</span>
            </h1>
          </div>
        </div>

        <div className={`relative w-full flex justify-center items-center transition-transform duration-300
          ${isScrolling ? '-translate-y-2' : ''}`}>
          <SearchBar />
        </div>
      </div>
    </header>
  );
}
