import React from 'react';

const BusinessGrowth: React.FC = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      <h2 className="text-2xl font-bold text-center">
        Grow your Business with <span className="text-orange-500">Zuno</span>
      </h2>
      <p className="text-center text-gray-600 max-w-3xl mx-auto mt-4 mb-12">
        Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum has been the industry's standard dummy text ever since the 1500s.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* First Card */}
        <div className="bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition-shadow flex flex-col justify-center items-center">
          <div className="text-4xl font-bold">99.2%</div>
          <div className="text-lg font-medium mt-2">Successful Business</div>
          <p className="text-gray-600 mt-2 text-sm">
            Lorem ipsum is a dummy text used to fill the space. Lorem ipsum is a dummy text used to fill the space
          </p>
        </div>

        {/* Second Card */}
        <div className="bg-purple-700 rounded-2xl p-8 text-white hover:shadow-lg transition-shadow flex flex-col justify-center items-center">
          <div className="text-4xl font-bold">5L+</div>
          <div className="text-lg font-medium mt-2">Successful Business</div>
          <p className="text-purple-100 mt-2 text-sm">
            Lorem ipsum is a dummy text used to fill the space. Lorem ipsum is a dummy text used to fill the space
          </p>
        </div>

        {/* Third Card */}
        <div className="bg-orange-500 rounded-2xl p-8 text-white hover:shadow-lg transition-shadow flex flex-col justify-center items-center">
          <div className="text-4xl font-bold">4.93★</div>
          <div className="text-lg font-medium mt-2">Successful Business</div>
          <p className="text-orange-100 mt-2 text-sm">
            Lorem ipsum is a dummy text used to fill the space. Lorem ipsum is a dummy text used to fill the space
          </p>
        </div>
      </div>
    </section>
  );
};

export default BusinessGrowth;