import React from 'react';
import { MapPin, Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div>
            <h3 className="text-xl font-bold mb-4">About us</h3>
            <p className="text-gray-600">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Office Location</h3>
            <div className="flex items-start gap-2 text-gray-600">
              <MapPin className="w-5 h-5 mt-1" />
              <p>No. 32 RV Garden, Kodaperi, Tambaram, Chennai- 600045</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t">
          <div className="text-2xl font-bold mb-4 md:mb-0">Zuno</div>
          
          <div className="flex gap-6">
            <Facebook className="w-5 h-5" />
            <Instagram className="w-5 h-5" />
            <Twitter className="w-5 h-5" />
            <Youtube className="w-5 h-5" />
          </div>
        </div>
        
        <div className="text-center text-sm text-gray-600 mt-8">
          Zuno, All rights reserved • Privacy • Terms
        </div>
      </div>
    </footer>
  );
}