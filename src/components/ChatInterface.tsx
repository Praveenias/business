import React, { useState, useRef, useEffect } from 'react';
import { BusinessType, BusinessDetails, Message,AdminRole,AdminDetails,SubscriptionTier,LocationType,UploadMethod } from '../types';
import { MessageSquare, X } from 'lucide-react';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import BusinessOverview from './BusinessOverview';
import ImageGallery from './ImageGallery';
import { Business } from '../types/business';
import ZunocodeGenerator from './ZunocodeGenerator';
import AdminRoleSelector from './Chatbox/AdminRoleSelector';
import AdminDetailsForm from './Chatbox/AdminDetailsForm';
import BusinessTypeSelector from './Chatbox/BusinessTypeSelector';
import LocationTypeSelector from './Chatbox/LocationTypeSelector';
import TaxDetailsForm from './Chatbox/TaxDetailsForm';
import ProductUpload from './Chatbox/ProductUpload';
import OAuthLogin from './Chatbox/OAuthLogin';
import SubscriptionSelector from './Chatbox/SubscriptionSelector';

interface ChatInterfaceProps {
  businessType: BusinessType;
  businessDetails: Business;
  onClose: () => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ businessType, businessDetails,onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      type: 'bot',
      content: "Welcome to Zuno! I'll help you set up your customer feedback system. First, what's your full name?",
    },
  ]);
  const [currentStep, setCurrentStep] = useState(1);
  const [businessData, setBusinessData] = useState<BusinessDetails>({
    name: '',
    type: businessType,
    locations: 0,
    mainBranch: ''
  });
  const [selectedPlan, setSelectedPlan] = useState<{ tier: string; price: string } | null>(null);
  const [showZunocode, setShowZunocode] = useState(false);
  

  console.log('Business Name:', businessData);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [adminData, setAdminData] = useState<Partial<AdminDetails>>({});
  
  const [isComplete, setIsComplete] = useState(false);
  const [productSource, setProductSource] = useState<{ type: string; count: number } | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const isInputDisabled = () => {
    return isLoggingIn || 
           messages[messages.length - 1]?.component !== undefined || 
           isComplete;
  };

  const handleSend = (input: string) => {
    if (!input.trim() || isLoggingIn) return;
    const newMessages = [...messages, { type: 'user', content: input }];
    setMessages(newMessages);

    if (currentStep === 1) {
      setAdminData({ ...adminData, name: input });
      newMessages.push({
        type: 'bot',
        content: 'What is your role in the business?',
        component: 'admin-role',
      });
      setCurrentStep(2);
    } else if (currentStep === 3) {
      setBusinessData({ ...businessData, name: input });
      newMessages.push({
        type: 'bot',
        content: 'What type of business do you operate?',
        component: 'business-type',
      });
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
      } else {
        setBusinessData({ ...businessData, mainBranch: input });
      }
      newMessages.push({
        type: 'bot',
        content: "Let's verify your business details. Please provide your tax information.",
        component: 'tax-details',
      });
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

  const handleSubscriptionSelect = (tier: SubscriptionTier) => {
    const prices = {
      starter: '$49',
      growth: '$149',
      enterprise: 'Custom'
    };
    setSelectedPlan({ tier, price: prices[tier] });
    const newMessages = [
      ...messages,
      { type: 'user', content: `Selected Plan: ${tier}` },
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
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="w-[100%] h-[100%] bg-white rounded-xl shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#4A0079] rounded-t-xl">
          <div className="flex items-center space-x-3">
            <MessageSquare className="h-6 w-6 text-white" />
            <span className="text-lg font-medium text-white">Let's get you On-boarded</span>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="h-5 w-5 text-white" />
          </button>
        </div>

        {/* Main Content */}
        <div className="flex flex-1 overflow-hidden">
          {/* Left Section (70%) */}
          <div className="w-[70%] flex flex-col">
            {/* Chat Section with Scrollable Content */}
            <div className="flex-1 overflow-y-auto">
              <div className="px-6 py-4">
                {/* Image Gallery */}
                <ImageGallery />
                
                <div className="flex-1 py-8">
            <div className="bg-white rounded-lg shadow-lg h-full flex flex-col">
              <div 
                ref={chatContainerRef}
                className="flex-1 overflow-y-auto p-6 space-y-4"
              >
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
                businessName={businessData.name}
                branchName={businessData.mainBranch}
                locations={businessData.locations}
                progress={((currentStep - 1) / 9) * 100}
                selectedPlan={selectedPlan}
              />
            </div>
          </div>
        </div>
      </div>
      {showZunocode && (
                    <ZunocodeGenerator 
                      businessName={businessData.name}
                      businessId={`${businessData.name.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`}
                    />
                  )}
                  <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatInterface;