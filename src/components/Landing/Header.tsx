import React from 'react';
import { User } from 'lucide-react';
import SearchBar from './SearchBar';
import logo from '../../assets/images/logo.svg';
import MyIcon from '../../assets/images/profile.svg';
import HeaderBG from '../../assets/images/Header_bg.svg'

export default function Header() {
  return (
     <header
      className="bg-cover bg-center bg-purple-700 bg-blend-multiply py-6"
      style={{ backgroundImage: `url(${HeaderBG})` }}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <div className="text-white text-2xl font-bold">
          <img src={logo} alt="logo" className="max-w-[80%]" />
            </div>
          <div className="text-white">
          <img src={MyIcon} alt="profile" className="max-w-[80%]" />
          </div>
        </div>
        
        <div className="text-center mb-8">
        <button className="bg-[rgba(255,110,1,0.2)] border border-[rgba(255,110,1,1)] font-bold text-white px-6 py-2 rounded-full text-sm h-[45px]">
            LET US KNOW ABOUT YOUR BUSINESS
          </button>
          <h1 className="text-white text-3xl md:text-4xl font-cirka font-medium mb-2 mt-4">
            Get your Business Connected with <span className="text-orange-500">Zuno</span>
          </h1>
      
        </div>
<div className="relative w-full flex justify-center items-center">
<SearchBar/>
</div>
       
      </div>
    </header>
  );
}