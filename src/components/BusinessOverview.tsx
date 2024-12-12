import React from 'react';
import { Building2, MapPin, FileText } from 'lucide-react';
import OverveiwBg from '../assets/images/overveiw.svg';
import overviewicon from '../assets/images/overviewicon.svg'
import drinks from '../assets/images/drinks.svg'
import brandname from '../assets/images/brand_name.svg'
interface BusinessOverviewProps {
  businessName: string;
  branchName: string | null;
  locations: number | null;
  progress: number;
  selectedPlan?: any;
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
  console.log('Business Name:', businessName);
  return (
    <div className="h-full flex flex-col">
      {/* Overview Header */}
      {/* <div className="p-4 border-b">
        <div className="flex items-center space-x-2">
          <span className="text-orange-500 font-medium">Overview</span>
        </div>
      </div> */}

      <div className="flex-1 p-4 space-y-6 overflow-y-auto">
        {/* Business Type Card */}
        {/* <div className="bg-purple-50 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <Building2 className="h-5 w-5 text-purple-600" />
            <div>
              <span className="text-sm font-medium">{business}</span>
              <p className="text-xs text-gray-600">Owned by Individuals</p>
            </div>
          </div>
        </div> */}

        {/* Basic Details */} 
        {(
          <div className="space-y-4 border border-[#D9D9D9] p-2.5 rounded-tl-none rounded-tr-[20px] rounded-br-[20px] rounded-bl-[20px] bg-white shadow-md h-[290px] shadow-md w-[90%] m-auto mt-[40%] relative">
<div className="w-[45%] mx-auto mt-[-45px] ml-[-11px] h-[35px] flex justify-center items-center gap-2 font-[Cirka] font-bold text-[14px] border border-b-0 border-[#D9D9D9] rounded-tl-[20px] rounded-tr-[21px] bg-white max-w-full">
  <img src={overviewicon} alt="icon" className="w-[16px] h-[16px] sm:w-[20px] sm:h-[20px] max-w-full" />
  <span className="text-sm sm:text-[16px] overflow-hidden whitespace-nowrap">Overview</span>
</div>

  <div>
    {/* The div that extends beyond the parent container */}
    <div className="absolute top-[5%] left-[-5%] w-[110%] h-[50px] rounded-lg shadow-lg bg-[#E4D0F9] border border-[#400C7A] flex">
  <div className="w-[30%] flex justify-center items-center">
    <img src={drinks} alt="drinks" className="w-[25px] h-[25px]" />
  </div>
  <div className="w-[70%] flex flex-col justify-center items-start">
    <span className="text-sm font-medium">business</span>
    <p className="text-xs text-gray-600">Owned by Individuals</p>
  </div>
</div>

<div className="absolute top-[calc(5%+50px)] left-[5%] w-[90%] h-[40px] border border-[#DFDFDF] rounded-[10px] p-5 flex mt-[10%]">
  <div className="w-[30%] flex justify-center items-center gap-1.5">
    <img src={brandname} alt="drinks" className="w-[25px] h-[25px]" />
    <span className="text-sm font-medium">Brand Name </span>
  </div>
  <div className="w-[70%] flex justify-center items-center">
    <span className="text-sm font-medium text-center">{businessName}</span>
  </div>
</div>


<div className="absolute top-[calc(5%+50px+40px+60px)] left-[5%] w-[100%]">
  <div className="flex flex-col justify-start items-start gap-[3%]">
    <h3 className="text-sm font-medium mb-3">Business Details</h3>
    {/* <div className="flex items-center justify-between">
      <span className="text-sm text-gray-600">Brand Name</span>
      <span className="text-sm font-medium">{businessName}</span>
    </div> */}
  <div className="flex items-center justify-between mb-3">
  
  <div className="w-[20%] flex justify-center items-center">
    <MapPin className="h-[20px] w-[20px] text-orange-500" />
  </div>

 
  <div className="w-[35%] flex justify-start items-center">
    <span className="text-[12px] text-gray-600">Main Branch</span>
  </div>

  
  <div className="w-[45%] flex justify-start items-center">
    <span className="text-[12px] font-medium text-orange-500">{branchName}</span>
  </div>
</div>

<div className="flex items-center justify-between">
 
  <div className="w-[20%] flex justify-center items-center">
    <MapPin className="h-[20px] w-[20px] text-orange-500" />
  </div>


  <div className="w-[35%] flex justify-start items-center">
    <span className="text-[12px] text-gray-600">Main Branch</span>
  </div>


  <div className="w-[45%] flex justify-start items-center">
    <span className="text-[12px] font-medium text-orange-500">{locations} locations</span>
  </div>
</div>




    {/* <div className="flex items-center justify-between">
      <span className="text-sm text-gray-600">Number of Locations</span>
      <span className="text-sm font-medium">{locations} locations</span>
    </div> */}
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
        {/* {selectedPlan && (
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
        )} */}
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