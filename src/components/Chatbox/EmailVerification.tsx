import React, { useState, useEffect } from 'react';
import { Loader2, AlertCircle } from 'lucide-react';
import { AdminDetails } from '../../types';
import { createUserwithOTP, verifyOTP, createOrganization } from '../../services/api';

interface EmailVerificationProps {
  onVerificationComplete: (email: string) => void;
  adminData: Partial<AdminDetails>;
  businessData: any;
}

const EmailVerification: React.FC<EmailVerificationProps> = ({ 
  onVerificationComplete, 
  adminData,
  businessData,
}) => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [otpError, setOtpError] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [organizationError, setOrganizationError] = useState('');

  useEffect(() => {
    if (adminData?.email) {
      setEmail(adminData.email);
      validateEmail(adminData.email);
    }
  }, [adminData]);

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
    setOrganizationError('');
    try {
      await createUserwithOTP({
        email,
        name: adminData.name,
        role: adminData.role,
        phone: adminData.phone
      });
      setOtpSent(true);
      setEmailError('');
    } catch (error: any) {
      setEmailError(error.data?.error || 'Failed to send OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length !== 6) {
      setOtpError('Please enter a valid 6-digit OTP');
      return;
    }

    setIsLoading(true);
    setOrganizationError('');
    try {
      await verifyOTP(email, otp);
      const isSingle = (value) => value === "single";
      const tempdata = {
        "name":adminData.name,
        "userRole":adminData.role,
        "email":email,
        "mobileNumber":adminData.mobile,
        "orgName":businessData.name,
        "businessType":businessData.type,
        "singleBranch":isSingle(businessData.locationType),
        "noOfLocations":businessData.locations,
        "branchAddress":businessData.mainBranch,
        "gstNo":businessData.panOrGst,
        "subdomain":email.split("@")[1]
     }
      
     
      try {
        await createOrganization(tempdata);
        setIsVerified(true);
        setOtpError('');
        onVerificationComplete(email);
      } catch (error: any) {
        setOrganizationError(
          error.data?.error || 
          'Failed to create organization. Please check your details and try again.'
        );
        throw error;
      }
    } catch (error: any) {
      console.log(error);
      
      if (!error.config.url?.includes('organization')) {
        setOtpError(error.data?.error || 'Invalid OTP. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
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
        {organizationError && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-red-700 font-medium">Organization Creation Failed</p>
              <p className="text-sm text-red-600">{organizationError}</p>
            </div>
          </div>
        )}

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
              } text-[15px] text-[#400C7A] focus:outline-none focus:border-[#6750A4] focus:ring-1 focus:ring-[#6750A4] pr-24 placeholder:text-[#49454F]`}
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
                otpSent ? 'Resend OTP' : 'Get OTP'
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
              onChange={(e) => {
                setOtp(e.target.value.slice(0, 6));
                setOtpError('');
                setOrganizationError('');
              }}
              placeholder="Enter 6-digit OTP"
              maxLength={6}
              pattern="\d{6}"
              className={`w-full bg-[#F8F8F8] text-[#400C7A] px-4 py-3 rounded-[25px] border ${
                otpError ? 'border-red-500' : 'border-[rgba(155, 155, 155, 1)]'
              } text-[15px] focus:outline-none focus:border-[#6750A4] focus:ring-1 focus:ring-[#6750A4] pr-24 placeholder:text-[#49454F]`}
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
          {otpError && (
            <p className="text-red-500 text-sm ml-4">{otpError}</p>
          )}
        </form>
      </div>

      <div className="border-b border-[#898989]">
        <p className='text-[#BEBEBE] py-[15px]'>
          {otpSent ? 'Enter the OTP sent to your email.' : 'Enter your email to receive an OTP.'}
        </p>
      </div>

      {isVerified && (
        <div className="space-y-4 w-[300px] mt-[2%]">
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