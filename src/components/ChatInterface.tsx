import React, { useState, useRef, useEffect } from 'react';
import { BusinessType, BusinessDetails, Message } from '../types';
import { MessageSquare, X } from 'lucide-react';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import BusinessOverview from './BusinessOverview';
import ImageGallery from './ImageGallery';
import MenuUpload from './MenuUpload';
import SubscriptionPlans from './SubscriptionPlans';
import SignIn from './SignIn';
import BusinessProfile from './BusinessProfile';
import TaxDetails from './TaxDetails';
import { Business } from '../types/business';
import ZunocodeGenerator from './ZunocodeGenerator';

interface ChatInterfaceProps {
  businessType: BusinessType;
  businessDetails: Business;
  onClose: () => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ businessType, businessDetails,onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      type: 'bot',
      content: `Lets get to know more about your ${businessDetails.title} business. What is Your Brand Name?`
    }
  ]);
  const [currentStep, setCurrentStep] = useState(1);
  const [businessData, setBusinessData] = useState<BusinessDetails>({
    name: '',
    type: businessType,
    locations: 0,
    mainBranch: ''
  });
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [showZunocode, setShowZunocode] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (input: string) => {
    const newMessages = [...messages, { type: 'user', content: input }];

    switch (currentStep) {
      case 1:
        setBusinessData({ ...businessData, name: input });
        newMessages.push({
          type: 'bot',
          content: 'How many branches does your business operate?'
        });
        setCurrentStep(2);
        break;

      case 2:
        const locations = parseInt(input);
        if (!isNaN(locations)) {
          setBusinessData({ ...businessData, locations });
          newMessages.push({
            type: 'bot',
            content: 'Which is the main branch out of these?'
          });
          setCurrentStep(3);
        }
        break;

      case 3:
        setBusinessData({ ...businessData, mainBranch: input });
        newMessages.push({
          type: 'bot',
          content: 'Enter the address of the main branch'
        });
        setCurrentStep(4);
        break;

      case 4:
        setBusinessData({ ...businessData, mainBranchAddress: input });
        newMessages.push({
          type: 'bot',
          content: "Let's verify your business details. Please provide your tax information.",
          component: 'tax-details'
        });
        setCurrentStep(5);
        break;
    }

    setMessages(newMessages);
  };

  const handleTaxDetails = (details: { panOrGst: string }) => {
    setBusinessData({ ...businessData, panOrGst: details.panOrGst });
    const newMessages = [
      ...messages,
      { type: 'user', content: `Tax details submitted: ${details.panOrGst}` },
      {
        type: 'bot',
        content: 'Do you want to upload your restaurant menu?',
        component: 'menu-upload'
      }
    ];
    setMessages(newMessages);
    setCurrentStep(6);
  };

  const handleFileUpload = (file: File) => {
    const newMessages = [
      ...messages,
      { type: 'user', content: file.name === 'skip' ? 'No' : `Uploaded: ${file.name}` },
      {
        type: 'bot',
        content: "Great! Now let's select a subscription plan that suits your needs.",
        component: 'subscription'
      }
    ];
    setMessages(newMessages);
    setCurrentStep(7);
  };

  const handlePlanSelect = (plan: string) => {
    setSelectedPlan(plan);
    const newMessages = [
      ...messages,
      { type: 'user', content: `Selected plan: ${plan}` },
      {
        type: 'bot',
        content: 'Please sign in to complete your subscription',
        component: 'sign-in'
      }
    ];
    setMessages(newMessages);
    setCurrentStep(8);
  };

  const handleSignIn = (email: string, password: string) => {
    const newMessages = [
      ...messages,
      { type: 'user', content: 'Signed in successfully' },
      {
        type: 'bot',
        content: 'Now set up your Business Profile',
        component: 'business-profile'
      }
    ];
    console.log(email,password);
    
    setMessages(newMessages);
    setCurrentStep(9);
    
  };

  const submitForm = (details) => {
    setCurrentStep(10);
    console.log(businessData,selectedPlan,details);
    setShowZunocode(true);
    
  }

  const renderComponent = (component: string) => {
    switch (component) {
      case 'tax-details':
        return <TaxDetails onSubmit={handleTaxDetails} />;
      case 'menu-upload':
        return <MenuUpload onFileUpload={handleFileUpload} />;
      case 'subscription':
        return <SubscriptionPlans onSelect={handlePlanSelect} />;
      case 'sign-in':
        return <SignIn onSignIn={handleSignIn} />;
      case 'business-profile':
        return <BusinessProfile onSubmit={submitForm} />;
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="w-[90%] h-[90vh] bg-white rounded-xl shadow-2xl flex flex-col">
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
                
                {/* Messages */}
                <div className="space-y-6">
                  {messages.map((message, index) => (
                    <div key={index} className="animate-fade-in">
                      <ChatMessage message={message} />
                      {message.component && (
                        <div className="mt-4">
                          {renderComponent(message.component)}
                        </div>
                      )}
                    </div>
                  ))}
                  {showZunocode && (
                    <ZunocodeGenerator 
                      businessName={businessData.name}
                      businessId={`${businessData.name.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`}
                    />
                  )}
                  <div ref={messagesEndRef} />
                </div>
              </div>
            </div>

            {/* Fixed Input Area */}
            <div className="flex-none p-4 bg-white border-t">
              <ChatInput 
                onSend={handleSend}
                disabled={currentStep === 9 || messages[messages.length - 1]?.component !== undefined}
                placeholder="Type your response..."
              />
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
    </div>
  );
};

export default ChatInterface;