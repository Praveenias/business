import React from 'react';
import { MapPin, Facebook, Instagram, Twitter, Youtube } from 'lucide-react';
import playstoreImage from '../../assets/images/playstore .png';
import logo1 from '../../assets/images/login1.svg';
export default function Footer() {
  return (
    <footer className="bg-white pt-16 pb-8 border-t-[1.5px] border-[#797474cf] mt-[5%]">
      <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
  <div className="w-full"> 
    <h3 className="text-xl font-bold mb-4">About us</h3>
    <p className="text-gray-600">
      Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
    </p>
  </div>
  
  <div className="w-full flex flex-col items-end">
<div>
<h3 className="text-xl font-bold mb-2">Office Location</h3>
  
  <div className="flex items-start gap-2 text-gray-600">
    <MapPin className="w-5 h-5 mt-1" />
    <p>No. 32 RV Garden, Kodaperi, Tambaram, Chennai- 600045</p>
  </div>

</div>
  
</div>
</div>


        <div className="flex flex-col md:flex-row justify-between pb-5 items-center">
          <div className="text-2xl font-bold mb-4 md:mb-0">
          <img src={logo1} alt="Play Store" className="max-w-[85%]" />
            </div>
          
          <div className="flex gap-6">
          <img src={playstoreImage} alt="Play Store" className="max-w-[85%]" />
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-4 border-t">
          <div className="text-0.5xl mb-4 md:mb-0">Zuno, All rights reserved • Privacy • Terms</div>
          
          <div className="flex gap-6">
            <Facebook className="w-5 h-5" />
            <Instagram className="w-5 h-5" />
            <Twitter className="w-5 h-5" />
            <Youtube className="w-5 h-5" />
          </div>
        </div>
      </div>
    </footer>
  );
}