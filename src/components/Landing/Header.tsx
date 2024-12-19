import React, { useState, useEffect } from 'react';
import { User } from 'lucide-react';
import SearchBar from './SearchBar';
import logo from '../../assets/images/logo.svg';
import MyIcon from '../../assets/images/profile.svg';
import HeaderBG from '../../assets/images/Header_bg.svg';

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
      className="fixed w-full z-[9999] top-0 bg-cover bg-center bg-blend-multiply py-6"
      style={{ backgroundImage: `url(${HeaderBG})` }}>
      <div className="mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <div className="text-white text-2xl font-bold">
            <img src={logo} alt="logo" className="max-w-[70%] pl-8" />
          </div>
          <div className="text-white">
            <img src={MyIcon} alt="profile" className="max-w-[75%] pr-8" />
          </div>
        </div>

        {!isScrolling && (
          <div className="text-center mb-8">
            <h1 className="text-white text-3xl md:text-4xl font-cirka font-medium mb-2 mt-4">
              Get your Business Connected with{' '}
              <span className="text-orange-500">Zuno</span>
            </h1>
          </div>
        )}

        <div className="relative w-full flex justify-center items-center">
          <SearchBar />
        </div>
      </div>
    </header>
  );
}
