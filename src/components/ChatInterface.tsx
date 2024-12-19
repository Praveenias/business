import React, { useState, useRef, useEffect } from 'react';
import { BusinessType, BusinessDetails, Message,AdminRole,AdminDetails,SubscriptionTier,LocationType,UploadMethod, SubscriptionPlan } from '../types';
import { MessageSquare, X } from 'lucide-react';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import BusinessOverview from './BusinessOverview';
import ImageGallery from './ImageGallery';
import { Business } from '../types/business';
import AdminRoleSelector from './Chatbox/AdminRoleSelector';
import AdminDetailsForm from './Chatbox/AdminDetailsForm';
import BusinessTypeSelector from './Chatbox/BusinessTypeSelector';
import LocationTypeSelector from './Chatbox/LocationTypeSelector';
import TaxDetailsForm from './Chatbox/TaxDetailsForm';
import ProductUpload from './Chatbox/ProductUpload';
import OAuthLogin from './Chatbox/OAuthLogin';
import SubscriptionSelector from './Chatbox/SubscriptionSelector';
import logo1 from '../assets/images/login1.svg';
import logo from '../assets/images/logo.svg';
import menuicon from '../assets/images/menu_icon.svg';
import MyIcon from '../assets/images/profile.svg';
interface ChatInterfaceProps {
  businessType: BusinessType;
  onClose: () => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ businessType,onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      type: 'bot',
      content: "Welcome to Zuno! I'll help you set up your customer feedback system. First, what's your name?",
    },
  ]);
  const [currentStep, setCurrentStep] = useState(1);
  const [businessData, setBusinessData] = useState<BusinessDetails>({
    name: '',
    type: businessType,
    locations: 0,
    mainBranch: ''
  });

  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan | null>(null);
  const [showZunocode, setShowZunocode] = useState(false);
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [adminData, setAdminData] = useState<Partial<AdminDetails>>({});
  
  const [isComplete, setIsComplete] = useState(false);
  const [productSource, setProductSource] = useState<{ type: string; count: number } | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
    const scrollableDivRef = useRef<HTMLDivElement>(null);
  
    useEffect(() => {
      scrollToBottom();
    }, [messages]);
    const scrollToBottom = () => {
      if (scrollableDivRef.current) {
        scrollableDivRef.current.scrollTop =
          scrollableDivRef.current.scrollHeight;
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
        scrollToBottom();
        setBusinessData({ ...businessData, locations });
      } 
      setBusinessData({ ...businessData, mainBranch: input });
      scrollToBottom();
      
      newMessages.push({
        type: 'bot',
        content: "Let's verify your business details. Please provide your tax information.",
        component: 'tax-details',
      });
      scrollToBottom();
      setCurrentStep(7);
    }

  };

  const handleAdminRole = (role: AdminRole) => {
    setAdminData({ ...adminData, role });
    const newMessages = [
      ...messages,
      { type: 'user', content: `Role: ${role}` },
      {
        type: 'bot',
        content: 'Please provide your contact and verification details.',
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
        content: "Great! Now, what's your business name?",
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
          : 'Please enter your business address:',
      },
    ];
    setMessages(newMessages);
    setCurrentStep(6);
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

  const handleProductUpload = (data: { method: UploadMethod; file?: File; link?: string }) => {
    setProductSource({
      type: data.method === 'file' ? 'File Upload' : 'Spreadsheet Link',
      count: Math.floor(Math.random() * 500) + 100
    });
    const newMessages = [
      ...messages,
      { type: 'user', content: `Products ${data.method === 'file' ? 'file uploaded' : 'link shared'}` },
      {
        type: 'bot',
        content: "Perfect! Before we proceed with the subscription, let's get you logged in.",
        component: 'oauth',
      },
    ];
    setMessages(newMessages);
    setCurrentStep(9);
  };

  const handleAuth = () => {
    setIsLoggingIn(true);
    setTimeout(() => {
      setIsAuthenticated(true);
      setIsLoggingIn(false);
      const newMessages = [
        ...messages,
        { type: 'user', content: 'Successfully authenticated' },
        {
          type: 'bot',
          content: "Great! Now let's select a plan that suits your needs.",
          component: 'subscription',
        },
      ];
      setMessages(newMessages);
      setCurrentStep(10);
    }, 2000);
  };

  const handleSubscriptionSelect = (tier: SubscriptionPlan) => {
    
    setSelectedPlan(tier);
    const newMessages = [
      ...messages,
      { type: 'user', content: `Selected Plan: ${tier.tier}` },
      {
        type: 'bot',
        content: "Excellent choice! We'll now process your subscription and set up your account.",
      },
    ];
    setMessages(newMessages);
    setShowZunocode(true);
    setIsComplete(true);
  };

  // const submitForm = (details) => {
  //   setCurrentStep(10);
  //   console.log(businessData,selectedPlan,details);
  //   setShowZunocode(true);
    
  // }

  

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 z-[99999]">
      <div className="w-[100%] h-[100%] bg-white rounded-xl shadow-2xl flex flex-col">

        {/* <div className="flex items-end justify-end px-6 py-4 bg-[#4A0079] rounded-t-xl">
      
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors "
          >
            <X className="h-5 w-5 text-white" />
          </button>
        </div> */}



<div className="flex w-full  py-4 rounded-t-xl h-20 flex items-center justify-center">
 
  <div className="w-[90%] ">
  <img src={logo1} alt="Play Store" className="max-w-[80%] pl-10 h-[27px]" />
  </div>

  <div className="w-[10%]  flex justify-center items-center gap-3.5">
  <img src={MyIcon} alt="profile" className="max-w-[60%] w-[30px]" />
  {/* <button
           
            className="p-2 hover:bg-white/10 rounded-lg transition-colors "
          > */}
            <X  onClick={onClose} className="h-7.5 w-7.5 text-[#FF6E01]" />
          {/* </button> */}
  </div>
</div>

        {/* Main Content */}
        <div className="flex flex-1 overflow-hidden ">
          {/* Left Section (70%) */}
          <div className="w-[70%] flex flex-col">
            {/* Chat Section with Scrollable Content */}
            <div  className="flex-1" >
              <div className="px-6 py-4">
                {/* Image Gallery */}
              
                
                <div className="bg-white h-[90vh] w-full overflow-hidden border border-gray-300 rounded-[20px] m-auto ">
                
            <div className="bg-white rounded-lg  p-[10px] shadow-lg h-full flex flex-col" >
        
              <div id="scrollableDiv"
            ref={scrollableDivRef}  className="flex-1 overflow-y-auto p-6 space-y-4">

<ImageGallery />


<div  className="flex bg-[#400C7A] w-[98%] rounded-[15px] h-[50px] m-auto items-center">
              <div className="w-[10%] flex justify-end">
              <img src={logo} alt="Play Store" className="max-w-[80%] pr-[10px] h-[27px] " />
              </div>
              <div className="w-[50%] border-l-2 border-l-white flex justify-start">
                <p className="text-white font-cirka font-bold text-[12px] pl-[10px]">Let’s get you On-boarded</p>
              </div>
              <div className="w-[40%] flex justify-end">
              <img src={menuicon} alt="Play Store" className="max-w-[80%] pr-[20px] h-[23px]" />
              </div>
             </div>

              
                {messages.map((message, index) => (
                  <div key={index}>
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
                    {message.component === 'oauth' && (
                      <OAuthLogin onLogin={handleAuth} />
                    )}
                    {message.component === 'subscription' && isAuthenticated && (
                      <SubscriptionSelector onSelect={handleSubscriptionSelect} />
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

          {/* Right Panel - Overview (30%) */}
          <div className="w-[30%] border-l">
            <div className="h-full overflow-y-auto">
           
              <BusinessOverview
                progress={((currentStep - 1) / 10) * 100}
                selectedPlan={selectedPlan}
                showZunocode={showZunocode}
                adminData = {adminData}
                businessData= {businessData}
              />
            </div>
          </div>
        </div>
      </div>
      
                  <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatInterface ;