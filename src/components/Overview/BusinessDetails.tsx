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
    <div className="w-full">
      <div className="mx-2">
        <div className="p-3 space-y-1">
          <h3 className="text-sm font-bold text-gray-800 mb-4">Business Details</h3>

          {type && (
            <DetailRow
              label="Business Type"
              value={type}
            />
          )}
               {locations && (
            <DetailRow
              label="Number of Locations"
              value={`${locations} locations`}
            />
          )}
          {mainBranch && (
            <DetailRow
              label="Main Branch"
              value={mainBranch}
            />
          )}
          
     
        </div>
      </div>
    </div>
  );
};