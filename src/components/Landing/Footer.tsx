import React from 'react';
import { MapPin, Facebook, Instagram, Twitter, Youtube } from 'lucide-react';
import mapicon from '../../assets/images/mapicon.svg';
import playstoreImage from '../../assets/images/playstore .png';
import logo1 from '../../assets/images/login1.svg';

export default function Footer() {
  return (
    <footer className="pt-12 pb-1 border-t border-t-[1px] border-t-[#CECECE] ">
      <div className="container mx-auto px-4 py-16 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="w-full max-w-md">
            <h3 className="text-lg text-[#403F3F] font-bold mb-2">About us</h3>
            <p className="text-[#403F3F] text-sm">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
            </p>
          </div>
          <div className="w-full flex justify-end">
            <div className="max-w-md">
              <h3 className="text-lg text-[#403F3F] font-bold mb-2">Office Location</h3>
              <div className="flex items-start gap-2 text-[#403F3F]">
                <MapPin className="h-5 w-5 flex-shrink-0" />
                <p className="text-sm text-right">
                  HD-092 AT Wework Olympia Cyber Space, NO 21/22 Alandhur Road, Arulayiammanpet, 2nd Street, Guindy, Chennai- 600032
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between pb-4 items-center">
          <div className="mb-4 md:mb-0">
            <img src={logo1} alt="Logo" className="h-[30px]" />
          </div>
          <div>
            <img src={playstoreImage} alt="Play Store" className="h-12" />
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-4 border-t border-t-[1px] border-t-[#CECECE] text-sm">
          <div className="mb-4 md:mb-0 text-[#403F3F]">
            Zunolabs, All rights reserved • Privacy • Terms
          </div>
          <div className="flex gap-4">
            <Facebook className="w-5 h-5 text-[#403F3F] hover:text-gray-700 cursor-pointer" />
            <Instagram className="w-5 h-5 text-[#403F3F] hover:text-gray-700 cursor-pointer" />
            <Twitter className="w-5 h-5 text-[#403F3F] hover:text-gray-700 cursor-pointer" />
            <Youtube className="w-5 h-5 text-[#403F3F] hover:text-gray-700 cursor-pointer" />
          </div>
        </div>
      </div>
    </footer>
  );
}