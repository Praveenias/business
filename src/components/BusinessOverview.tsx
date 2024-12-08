import React from 'react';
import { Building2, MapPin, FileText } from 'lucide-react';

interface BusinessOverviewProps {
  businessName: string;
  branchName: string | null;
  locations: number | null;
  progress: number;
  selectedPlan?: string | null;
  business:any
}

const BusinessOverview: React.FC<BusinessOverviewProps> = ({
  businessName,
  branchName,
  locations,
  progress,
  selectedPlan,
  business
}) => {
  return (
    <div className="h-full flex flex-col">
      {/* Overview Header */}
      <div className="p-4 border-b">
        <div className="flex items-center space-x-2">
          <span className="text-orange-500 font-medium">Overview</span>
        </div>
      </div>

      <div className="flex-1 p-4 space-y-6 overflow-y-auto">
        {/* Business Type Card */}
        <div className="bg-purple-50 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <Building2 className="h-5 w-5 text-purple-600" />
            <div>
              <span className="text-sm font-medium">{business}</span>
              <p className="text-xs text-gray-600">Owned by Individuals</p>
            </div>
          </div>
        </div>

        {/* Basic Details */}
        {businessName && (
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium mb-3">Business Details</h3>
              <div className="space-y-3 bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Brand Name</span>
                  <span className="text-sm font-medium">{businessName}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-orange-500" />
                    <span className="text-sm text-gray-600">Main Branch</span>
                  </div>
                  <span className="text-sm font-medium text-orange-500">{branchName}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Number of Locations</span>
                  <span className="text-sm font-medium">{locations} locations</span>
                </div>
              </div>
            </div>

            {/* Restaurant Menu */}
            {/* <div>
              <h3 className="text-sm font-medium mb-3">Restaurant Menu</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <FileText className="h-4 w-4 text-orange-500" />
                    <span className="text-sm text-gray-600">Menu File</span>
                  </div>
                  <span className="text-sm font-medium">A2B Menu-1.pdf</span>
                </div>
                <div className="mt-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Total Items</span>
                    <span className="font-medium">240 items</span>
                  </div>
                  <div className="flex items-center justify-between text-sm mt-1">
                    <span className="text-gray-600">Categories</span>
                    <span className="font-medium">5 categories</span>
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        )}

        {/* Selected Plan */}
        {selectedPlan && (
          <div className="bg-orange-50 rounded-lg p-4">
            <h3 className="text-sm font-medium mb-2">Selected Plan</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Plan Type</span>
                <span className="text-sm font-medium text-orange-500">{selectedPlan}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Total Amount</span>
                <span className="text-sm font-medium">₹19,803.6</span>
              </div>
              <p className="text-xs text-gray-500">*GST included in this</p>
            </div>
          </div>
        )}
      </div>

      {/* Progress Footer */}
      <div className="mt-auto p-4 border-t">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Steps completed</span>
            <span className="text-sm font-medium text-purple-600">{Math.round(progress)}%</span>
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