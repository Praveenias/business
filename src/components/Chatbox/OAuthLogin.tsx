import React, { useState } from 'react';
import { Mail, Facebook, Loader2 } from 'lucide-react';

const OAuthLogin: React.FC<{ onLogin: () => void }> = ({ onLogin }) => {
  const [loading, setLoading] = useState<string | null>(null);

  const handleLogin = async (provider: string) => {
    setLoading(provider);
    
    // Simulate login process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setLoading(null);
    onLogin();
  };

  return (
    <div className="flex flex-col items-center space-y-4 w-full max-w-md mx-auto mt-4">
      {['google', 'facebook', 'apple'].map((provider) => (
        <button
          key={provider}
          onClick={() => handleLogin(provider)}
          disabled={loading !== null}
          className={`w-full flex items-center justify-center space-x-2 ${
            provider === 'google'
              ? 'bg-white text-gray-700 border-2 border-gray-200 hover:bg-gray-50'
              : provider === 'facebook'
              ? 'bg-[#1877F2] text-white hover:bg-[#1864D9]'
              : 'bg-black text-white hover:bg-gray-800'
          } rounded-lg px-4 py-3 transition-colors duration-200 relative disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          {loading === provider ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <>
              {provider === 'google' && <Mail className="h-5 w-5 text-red-500" />}
              {provider === 'facebook' && <Facebook className="h-5 w-5" />}
              {provider === 'apple' && (
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z"/>
                </svg>
              )}
              <span>
                Continue with {provider.charAt(0).toUpperCase() + provider.slice(1)}
              </span>
            </>
          )}
        </button>
      ))}
    </div>
  );
};

export default OAuthLogin;