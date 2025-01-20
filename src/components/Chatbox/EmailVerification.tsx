import React, { useState } from 'react';
import { Loader2 } from 'lucide-react';

interface EmailVerificationProps {
  onVerificationComplete: (email: string) => void;
}

const EmailVerification: React.FC<EmailVerificationProps> = ({ onVerificationComplete }) => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [emailError, setEmailError] = useState('');

  const validateEmail = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!email) {
      setEmailError('Email is required');
      return false;
    }
    if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email address');
      return false;
    }
    setEmailError('');
    return true;
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEmail(email)) return;
    
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    if (otp.length === 6 && /^\d+$/.test(otp)) {
      setIsVerified(true);
      setIsLoading(false);
    }
    onVerificationComplete(email);
  };

  const handleLaunchZuno = () => {
    window.location.href = "https://admin.playzuno.com/";
    
    
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    if (emailError) {
      validateEmail(newEmail);
    }
  };

  return (
    <div className="">
      <div className="space-y-4 w-full max-w-md rounded-[20px] bg-[#F8F8F8] shadow-sm p-6 my-4 mb-0">
        <form onSubmit={handleEmailSubmit} className="space-y-4">
          <div className="relative">
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              onBlur={() => validateEmail(email)}
              placeholder="Enter your business email"
              className={`w-full px-4 py-3 bg-[#F8F8F8] rounded-[25px] border ${
                emailError ? 'border-red-500' : 'border-[rgba(155, 155, 155, 1)]'
              }text-[15px] text-[#400C7A] focus:outline-none focus:border-[#6750A4] focus:ring-1 focus:ring-[#6750A4] pr-24 placeholder:text-[#49454F]`}
              required
            />
            <button
              type="submit"
              disabled={isLoading || !email || !!emailError}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#FF6E01] text-sm font-medium hover:text-[#FF6E01] disabled:text-[#CAC4D0] disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                'Get OTP'
              )}
            </button>
          </div>
          {emailError && (
            <p className="text-red-500 text-sm ml-4">{emailError}</p>
          )}
        </form>

        <form onSubmit={handleOtpSubmit} className="space-y-4">
          <div className="relative">
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value.slice(0, 6))}
              placeholder="Enter 6-digit OTP"
              maxLength={6}
              pattern="\d{6}"
              className="w-full bg-[#F8F8F8] text-[#400C7A] px-4 py-3 rounded-[25px] border border-[rgba(155, 155, 155, 1)] text-[15px] focus:outline-none focus:border-[#6750A4] focus:ring-1 focus:ring-[#6750A4] pr-24 placeholder:text-[#49454F]"
              required
            />
            <button
              type="submit"
              disabled={isLoading || otp.length !== 6}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#FF6E01] text-sm font-medium hover:text-[#FF6E01] disabled:text-[#CAC4D0] disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                'Verify'
              )}
            </button>
          </div>
        </form>

     
      </div>
      <div className="border-b border-[#898989]">
        <p className='text-[#BEBEBE] py-[15px]'>Enter your OTP and Let’s get Onboarded.</p>
      </div>
      {isVerified && (
          <div className="space-y-4 w-[300px] mt-[2%]">
            {/* <div className="flex items-center justify-center space-x-2 text-green-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              <span className="font-medium">Email verified successfully!</span>
            </div> */}
            <button
              onClick={handleLaunchZuno}
              className="w-full bg-[rgba(64,12,122,0.2)] text-[rgb(64,12,122)] border border-[rgb(64,12,122)] h-[50px] rounded-[25px]"
            >
              Now Zuno it!
            </button>
          </div>
        )}
    </div>
  );
};

export default EmailVerification;