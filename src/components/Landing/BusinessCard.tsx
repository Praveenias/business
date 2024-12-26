import React, { useState } from 'react';
import { Users, ArrowRight } from 'lucide-react';
import { categoryConfig } from '../../utils/categoryUtils';
import type { Business } from '../../types/business';
import drinks from '../../assets/images/drinks.svg'
interface BusinessCardProps extends Business {
  selectedCategory: string;
  index: number;
}

export default function BusinessCard({ 
  image, 
  title, 
  subtitle, 
  peopleCount, 
  category,
  selectedCategory,
  index,
  ...business
}: BusinessCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  // const [showChat, setShowChat] = useState(false);
  const isSelected = selectedCategory === 'All' || category === selectedCategory;
  const config = categoryConfig[category as keyof typeof categoryConfig];
  const Icon = config?.icon;

  // const getOpacity = () => {
  //   if (isHovered) return 'opacity-100';
  //   if (!document.querySelector(':hover') && isSelected) return 'opacity-100';
  //   return 'opacity-30';
  // };
 

  return (
    <>
      <div 
        className={`
          rounded-[20px] p-[5px] overflow-hidden shadow-md bg-white 
          transition-all duration-300 cursor-pointer
          hover:shadow-xl transform hover:-translate-y-1
          
          ${isHovered ? 'scale-105' : ''}
          ${!document.querySelector(':hover') && isSelected ? 'scale-105' : ''}
        `}
        onMouseEnter={() => {
          setIsHovered(true);
          document.body.classList.add('card-hovered');
        }}
        onMouseLeave={() => {
          setIsHovered(false);
          document.body.classList.remove('card-hovered');
        }}
        
        tabIndex={0}
        
       
      >
        <div className="relative">
          <img src={image} alt={title} className="w-full h-48 object-cover rounded-[15px]" />
          {/* <div className="absolute bottom-2 left-2 bg-white px-2 py-1 rounded-full text-xs flex items-center gap-1">
            <Users className="w-4 h4" />
            {peopleCount} People On-boarded
          </div> */}
        </div>
        <div className="p-4 flex justify-center items-center">
        <div className="w-[20%] flex justify-start items-center">
                <img src={drinks} alt="drinks" className="w-[30px] h-[30px]" />
              </div>
          <div className='w-[80%]'>
          <div className="flex justify-between items-center">
            <h3 className="font-medium text-lg">{title}</h3>
            {/* <span className="text-orange-500">
              <ArrowRight className="w-5 h-5" />
            </span> */}
          </div>
          <p className="text-gray-500 text-sm">{subtitle}</p>
          {/* <div className="mt-3">
            <span className={`
              inline-block px-3 py-1 rounded-full text-xs flex items-center gap-1
              ${config?.bgColor} ${config?.textColor}
            `}>
              {Icon && <Icon className="w-3 h-3" />}
              {category}
            </span>
          </div> */}
        </div>
        </div>
      </div>

    </>
  );
}