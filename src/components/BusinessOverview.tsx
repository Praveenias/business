import React from 'react';

import overviewicon from '../assets/images/overviewicon.svg'

import ZunocodeGenerator from './ZunocodeGenerator';
import { AdminDetails, BusinessDetails, SubscriptionPlan } from '../types';
import { AdminCard } from './Overview/AdminCard';
import { BrandCard } from './Overview/BrandCard';
import { BusinessDetails as BusinessDetailsComponent } from './Overview/BusinessDetails';
import { DetailRow } from './Overview/DetailRow';
interface BusinessOverviewProps {
  progress: number;
  selectedPlan?: SubscriptionPlan;
  productSource: any;
  showZunocode: boolean;
  adminData: AdminDetails
  businessData: BusinessDetails
}


const BusinessOverview: React.FC<BusinessOverviewProps> = ({
  progress,
  selectedPlan,
  showZunocode,
  productSource,
  adminData,
  businessData
}) => {
  const getContentHeight = () => {
    let height = 290; // Base height
    if (businessData.name) height += 80;
    if (adminData) height += 80;
    if (productSource?.fileName) height += 100;
    return `${height}px`;
  };
  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 px-4 py-4 space-y-6 overflow-y-auto">

        {/* Basic Details */}

        <div
          className={`relative border border-[#D9D9D9] p-2.5 rounded-tl-none rounded-tr-[20px] rounded-br-[20px] rounded-bl-[20px] bg-white shadow-md w-[90%] m-auto mt-[7%] transition-all duration-300`}
          style={{ minHeight: '290px', height: getContentHeight() }}>
          <div className="w-[45%] mx-auto mt-[-45px] ml-[-11px] h-[35px] flex justify-center items-center gap-2 font-bold text-[14px] border border-b-0 border-[#D9D9D9] rounded-tl-[20px] rounded-tr-[21px] bg-white max-w-full">
            <img src={overviewicon} alt="icon" className="w-[16px] h-[16px] sm:w-[20px] sm:h-[20px] max-w-full" />
            <span className="text-sm sm:text-[16px] overflow-hidden whitespace-nowrap">Overview</span>
          </div>

          <div className="flex flex-col gap-2 p-2">
            {adminData && (
              <div className="w-full">
                <AdminCard adminData={adminData} />
              </div>
            )}
            
            {businessData?.name && (
              <div className="w-full transform transition-all duration-300 ease-in-out">
                <BrandCard name={businessData.name} />
              </div>
            )}
            
            {businessData && (
              <div className="w-full transform transition-all duration-300 ease-in-out">
                <BusinessDetailsComponent businessData={businessData} />
              </div>
            )}
            
            {productSource?.fileName && (
              <div>
                <div className="w-full transform transition-all duration-300 ease-in-out">
                  <BrandCard name={productSource.fileName} label='Restaurant' />
                </div>
                <DetailRow label="Items Count" value={productSource.count} />
              </div>
            )}
           
          </div>
        </div>
        <div >
          {showZunocode && (
            <ZunocodeGenerator
              businessName={businessData.name}
              businessId={`${businessData.name.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`}
            />
          )}
        </div>


      </div>
      <div className="mx-auto mb-[15%] mt-auto p-4  w-[90%] border border-gray-300 rounded-lg shadow-md">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-[#400C7A] font-bold text-[12px]">Preparing your Zunocode</span>
            <span className="text-sm font-medium text-[#7F7F7F#7F7F7F]">{Math.round(progress)}%</span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-orange-500 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessOverview;