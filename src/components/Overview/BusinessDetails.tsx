import React from 'react';
import { BusinessDetails as BusinessDetailsType } from '../../types';
import { DetailRow } from './DetailRow';

interface BusinessDetailsProps {
  businessData: BusinessDetailsType;
}

export const BusinessDetails: React.FC<BusinessDetailsProps> = ({ businessData }) => {
  const { mainBranch, locations ,type } = businessData;

  if (!type && !mainBranch && !locations) return null;

  return (
    <div className="absolute top-[calc(5%+50px+40px+60px)] left-0 w-full">
      <div className="mx-4 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-200">
        <div className="p-5 space-y-1">
          <h3 className="text-sm font-bold text-gray-800 mb-4">Business Details</h3>

          {type && (
            <DetailRow
              label="Business Type"
              value={type}
            />
          )}
          
          {mainBranch && (
            <DetailRow
              label="Main Branch"
              value={mainBranch}
            />
          )}
          
          {locations && (
            <DetailRow
              label="Number of Locations"
              value={`${locations} locations`}
            />
          )}
        </div>
      </div>
    </div>
  );
};