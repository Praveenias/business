import React from 'react';

const stats = [
  { value: '99.2%', label: 'Successful Business' },
  { value: '5L+', label: 'Successful Business' },
  { value: '4.93★', label: 'Successful Business' }
];

export default function Stats() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h2 className="text-center text-3xl font-medium mb-2">
        Grow your Business with <span className="text-orange-500">Zuno</span>
      </h2>
      <hr className="w-24 h-1 mx-auto my-4 bg-orange-500 border-0 rounded" />
      <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text since the 1500s.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex flex-col justify-end items-baseline">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`p-8 rounded-lg flex flex-col justify-end items-start ${
              index === 1 
                ? 'bg-purple-800  flex flex-col justify-end items-start text-white md:transform md:-translate-y-0 md:h-[calc(100%+4rem)]' 
                : index === 2 
                  ? 'bg-orange-500 text-white' 
                  : 'bg-gray-100'
            }`}
          >
            <div className="text-3xl font-bold mb-2">{stat.value}</div>
            <div className={index === 0 ? 'text-gray-600' : 'text-white'}>
              {stat.label}
            </div>
            <p className={`text-sm mt-2 ${index === 0 ? 'text-gray-600' : 'text-white/90'}`}>
              Lorem Ipsum is a dummy text used to fill the space. Lorem Ipsum is a dummy text used to fill the space.
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
