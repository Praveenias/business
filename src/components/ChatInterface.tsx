import React, { useState, useRef, useEffect } from 'react';
import { BusinessType, BusinessDetails, Message, AdminRole, AdminDetails, SubscriptionTier, LocationType, UploadMethod, SubscriptionPlan } from '../types';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import BusinessOverview from './BusinessOverview';
import ImageGallery from './ImageGallery';
import AdminRoleSelector from './Chatbox/AdminRoleSelector';
import AdminDetailsForm from './Chatbox/AdminDetailsForm';
import BusinessTypeSelector from './Chatbox/BusinessTypeSelector';
import LocationTypeSelector from './Chatbox/LocationTypeSelector';
import TaxDetailsForm from './Chatbox/TaxDetailsForm';
import ProductUpload from './Chatbox/ProductUpload';
import FoodItems from './Chatbox/FoodItems';
import logo1 from '../assets/images/login1.svg';
import logo from '../assets/images/logo.svg';
import menuicon from '../assets/images/menu_icon.svg';
import EmailVerification from './Chatbox/EmailVerification';

import { createOrganization, uploadProductFile } from '../services/api';

interface ChatInterfaceProps {
  businessType: BusinessType;
  onClose: () => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ businessType, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      type: 'bot',
      content: "Welcome to Zuno! I'll help you set up your customer feedback system. First, what's your name?",
    },
  ]);
  const [currentStep, setCurrentStep] = useState(1);
  const [businessData, setBusinessData] = useState<BusinessDetails>({
    name: '',
    type: '',
    locations: '',
    mainBranch: ''
  });

  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan | null>(null);
  const [showZunocode, setShowZunocode] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [adminData, setAdminData] = useState<Partial<AdminDetails>>({});

  const [isComplete, setIsComplete] = useState(false);
  const [productSource, setProductSource] = useState<{ fileName: string|any; count: number }>({ fileName: '', count: 0 });

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const scrollableDivRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    if (scrollableDivRef.current) {
      scrollableDivRef.current.scrollTop = scrollableDivRef.current.scrollHeight;
    }
  };

  const isInputDisabled = () => {
    return isLoggingIn ||
      messages[messages.length - 1]?.component !== undefined ||
      isComplete;
  };

  const handleSend = (input: string) => {
    if (!input.trim() || isLoggingIn) return;
    const newMessages = [...messages, { type: 'user', content: input }];
    setMessages(newMessages);
    scrollToBottom();
    
    if (currentStep === 1) {
      setAdminData({ ...adminData, name: input });
      newMessages.push({
        type: 'bot',
        content: 'What is your role in the business?',
        component: 'admin-role',
      });
      scrollToBottom();
      setCurrentStep(2);
    } else if (currentStep === 3) {
      setBusinessData({ ...businessData, name: input });
      newMessages.push({
        type: 'bot',
        content: 'What type of business do you operate?',
        component: 'business-type',
      });
      scrollToBottom();
      setCurrentStep(4);
    } else if (currentStep === 6) {
      if (businessData.locationType === 'multi') {
        const locations = parseInt(input);
        if (isNaN(locations)) {
          newMessages.push({
            type: 'bot',
            content: 'Please enter a valid number of locations.',
          });
          return;
        }
        setBusinessData({ ...businessData, locations });
        newMessages.push({
          type: 'bot',
          content: 'What is your current location/branch address?',
        });
        setCurrentStep(6.5);
      } else {
        setBusinessData({ ...businessData, mainBranch: input });
        newMessages.push({
          type: 'bot',
          content: "Let's verify your business details. Please provide your tax information.",
          component: 'tax-details',
        });
        setCurrentStep(7);
      }
      scrollToBottom();
    } else if (currentStep === 6.5) {
      setBusinessData({ ...businessData, mainBranch: input });
      newMessages.push({
        type: 'bot',
        content: "Let's verify your business details. Please provide your tax information.",
        component: 'tax-details',
      });
      setCurrentStep(7);
      scrollToBottom();
    } else if (currentStep === 9) {
      const otp = input.trim();
      if (otp.length === 6 && /^\d+$/.test(otp)) {
        setOtpVerified(true);
        newMessages.push({
          type: 'bot',
          content: "OTP verified successfully! Your account is now ready to use.",
        });
        setIsComplete(true);
        setShowZunocode(true);
      } else {
        newMessages.push({
          type: 'bot',
          content: "Invalid OTP. Please enter a valid 6-digit OTP.",
        });
      }
      setMessages(newMessages);
      scrollToBottom();
    }
  };

  const handleAdminRole = (role: AdminRole) => {
    setAdminData({ ...adminData, role });
    const newMessages = [
      ...messages,
      { type: 'user', content: `Role: ${role}` },
      {
        type: 'bot',
        content: 'Please provide your Company Email and Contact details.',
        component: 'admin-details',
      },
    ];
    setMessages(newMessages);
    setCurrentStep(3);
  };

  const handleAdminDetails = (details: Partial<AdminDetails>) => {
    setAdminData({ ...adminData, ...details });
    const newMessages = [
      ...messages,
      { type: 'user', content: 'Admin details submitted' },
      {
        type: 'bot',
        content: "Great! Now, what's your Business/Brand name?",
      },
    ];
    setMessages(newMessages);
  };

  const handleBusinessTypeSelect = (type: BusinessType) => {
    setBusinessData({ ...businessData, type });
    const newMessages = [
      ...messages,
      { type: 'user', content: `Business Type: ${type}` },
      {
        type: 'bot',
        content: 'Is your business single location or multi-location?',
        component: 'location-type',
      },
    ];
    setMessages(newMessages);
    setCurrentStep(5);
  };

  const handleLocationTypeSelect = (locationType: LocationType) => {
    setBusinessData({ ...businessData, locationType });
    const newMessages = [
      ...messages,
      { type: 'user', content: `Location Type: ${locationType}` },
      {
        type: 'bot',
        content: locationType === 'multi'
          ? 'How many locations do you operate?'
          : 'Please enter your Company address:',
      },
    ];
    setMessages(newMessages);
    setCurrentStep(6);
    if (locationType === 'multi') {
      setCurrentStep(6);
    }
  };

  const handleTaxDetails = (details: { gstNumber: string; taxIdentifier: string }) => {
    setBusinessData({ ...businessData, ...details });
    const newMessages = [
      ...messages,
      { type: 'user', content: 'Tax details submitted' },
      {
        type: 'bot',
        content: "Great! Now, let's upload your product list. You can either upload a file or share a link to your spreadsheet.",
        component: 'product-upload',
      },
    ];
    setMessages(newMessages);
    setCurrentStep(8);
  };

  const handleProductUpload =async (data: { method: UploadMethod; file?: File; link?: string }) => {
    // try {
    //   if (data.file) {
    //     const products = await uploadProductFile(data.file);
    //     console.log(products);
        
        
    //     const fileName = data.file.name;
    //     setProductSource({
    //       fileName: fileName.length > 10 ? fileName.substring(0, 10) + "..." : fileName,
    //       count: products.length || 0
    //     });

    //     const newMessages = [
    //       ...messages,
    //       { type: 'user', content: 'Products file uploaded successfully' },
    //       {
    //         type: 'bot',
    //         content: "Here are your menu items",
    //         component: 'item-selection',
    //       },
    //     ];
    //     setMessages(newMessages);
    //     setCurrentStep(9);
    //   }
    // } catch (error: any) {
    //   const errorMessage = error.message || 'Failed to upload products. Please try again.';
    //   const newMessages = [
    //     ...messages,
    //     { type: 'user', content: 'Product upload attempted' },
    //     {
    //       type: 'bot',
    //       content: errorMessage,
    //       component: 'product-upload',
    //     },
    //   ];
    //   setMessages(newMessages);
    // }
    const newMessages = [
      ...messages,
      { type: 'user', content: 'Products file uploaded successfully' },
      {
        type: 'bot',
        content: "Here are your menu items",
        component: 'item-selection',
      },
    ];
    setMessages(newMessages);
    setCurrentStep(9);
  };

  const handleFoodItemsComplete = () => {
    const newMessages = [
      ...messages,
      { type: 'user', content: 'Menu items uploaded' },
      {
        type: 'bot',
        content: "Generate the OTP with your business Mail ID",
        component: 'email-verification'
      }
    ];
    setMessages(newMessages);
    scrollToBottom();
  };


  const handleVerificationComplete =async (email: string) => {
    const tempdata = {
       "name":adminData.name,
       "userRole":adminData.role,
       "email":email,
       "mobileNumber":adminData.mobile,
       "orgName":businessData.name,
       "businessType":businessData.type,
       "singleBranch":businessData.locationType,
       "noOfLocations":businessData.locations,
       "branchAddress":businessData.mainBranch,
       "gstNo":businessData.panOrGst
    }
    console.log(tempdata,businessData);
    try {
      await createOrganization(tempdata);
      setIsComplete(true);
      setShowZunocode(true);
      scrollToBottom();
    } catch (error: any) {
      console.log(error);
      const newMessages = [
        ...messages,
        {
          type: 'bot',
          content: "Failed to create organization. Please try again.",
        },
      ];
      setMessages(newMessages);
    }    
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 z-[99999]">
      <div className="w-[100%] h-[100%] bg-white rounded-xl shadow-2xl flex flex-col">
        <div className="flex w-full  py-3 rounded-t-xl h-14 flex items-center justify-center">
          <div className="w-[90%] ">
            <img src={logo1} alt="Play Store" className="max-w-[80%] pl-10 h-[27px]" onClick={onClose}/>
          </div>
          <div className="w-[10%]  flex justify-center items-center gap-3.5">
          </div>
        </div>

        <div className="flex flex-1 overflow-hidden ">
          <div className="w-[70%] flex flex-col pt-[15px]">
            <div className="flex-1" >
              <div className="px-6">
                <div className="bg-white h-[90vh] w-full overflow-hidden border border-gray-300 rounded-[20px] m-auto ">
                  <div className="bg-white rounded-lg pt-[3.5%] p-[10px] shadow-lg h-full flex flex-col" >
                    <div className="sticky top-0 z-10 mb-4">
                      <div className="flex bg-[#400C7A] w-[98%] rounded-[15px] h-[50px] m-auto items-center">
                        <div className="w-[10%] flex justify-end">
                          <img src={logo} alt="Play Store" className="max-w-[80%] pr-[10px] h-[27px]" />
                        </div>
                        <div className="w-[50%] border-l-2 border-l-white flex justify-start">
                          <p className="text-white font-bold text-[12px] pl-[10px]">Let's get you On-boarded</p>
                        </div>
                        <div className="w-[40%] flex justify-end">
                          <img src={menuicon} alt="Play Store" className="max-w-[80%] pr-[20px] h-[23px]" />
                        </div>
                      </div>
                    </div>
                    <div 
                      id="scrollableDiv"
                      ref={scrollableDivRef} 
                      className="flex-1 overflow-y-auto p-6 pt-[10px] space-y-4 pb-24"
                    >
                      <ImageGallery />

                      {messages.map((message, index) => (
                        <div key={index} className='mb-8'>
                          <ChatMessage message={message} />
                          {message.component === 'admin-role' && (
                            <AdminRoleSelector onSelect={handleAdminRole} />
                          )}
                          {message.component === 'admin-details' && (
                            <AdminDetailsForm onSubmit={handleAdminDetails} />
                          )}
                          {message.component === 'business-type' && (
                            <BusinessTypeSelector onSelect={handleBusinessTypeSelect} />
                          )}
                          {message.component === 'location-type' && (
                            <LocationTypeSelector onSelect={handleLocationTypeSelect} />
                          )}
                          {message.component === 'tax-details' && (
                            <TaxDetailsForm onSubmit={handleTaxDetails} />
                          )}
                          {message.component === 'product-upload' && (
                            <ProductUpload onSubmit={handleProductUpload} />
                          )}
                          {message.component === 'item-selection' && (
                            <FoodItems onComplete={handleFoodItemsComplete} />
                          )}
                          {message.component === 'email-verification' && (
                            <EmailVerification onVerificationComplete={handleVerificationComplete} adminData={adminData} businessData={businessData}/>
                          )}
                        </div>
                      ))}
                      <div ref={messagesEndRef} />
                    </div>
                    {!isComplete && (
                      <ChatInput
                        onSend={handleSend}
                        disabled={isInputDisabled()}
                        placeholder={isInputDisabled() ? "Please complete the current step..." : "Type your response..."}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-[30%]">
            <div className="h-full overflow-y-auto">
              <BusinessOverview
                progress={((currentStep - 1) / 9) * 100}
                selectedPlan={selectedPlan}
                showZunocode={showZunocode}
                adminData={adminData}
                businessData={businessData}
                productSource={productSource}
              />
            </div>
          </div>
        </div>
      </div>
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatInterface;