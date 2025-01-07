import React from 'react';

const stats = [
  { value: '99.2%', label: 'Successful Business' },
  { value: '5L+', label: 'Successful Business' },
  { value: '4.93★', label: 'Successful Business' }
];

export default function Stats() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-7xl">
      <h2 className="text-center text-[#403F3F] font-medium text-35px mb-3 ">
        Grow your Business with <span className="text-orange-500">Zuno</span>
      </h2>
    
      <p className="text-center text-[#403F3F] mb-12 max-w-xl mx-auto">
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text since the 1500s.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-2">
        {stats.map((stat, index) => (
          <div className="h-[200px] relative" key={index}>
            <div
              className={`absolute bottom-0 w-full h-[200px] hover:h-[250px] transition-all duration-300 ease-in-out p-6 rounded-lg flex flex-col justify-end ${
                index === 1 
                  ? 'bg-purple-800 text-white md:transform md:-translate-y-0' 
                  : index === 2 
                    ? 'bg-orange-500 text-white' 
                    : 'bg-gray-100'
              }`}
            >
              <div className="text-3xl font-bold mb-2">{stat.value}</div>
              <div className={index === 0 ? 'text-[#403F3F]' : 'text-white'}>
                {stat.label}
              </div>
              <p className={`text-sm mt-2 ${index === 0 ? 'text-[#403F3F]' : 'text-white/90'}`}>
                Lorem Ipsum is a dummy text used to fill the space. Lorem Ipsum is a dummy text used to fill the spaces.
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}