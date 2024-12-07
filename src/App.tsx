import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import ChatInterface from './components/ChatInterface';
import { BusinessType } from './types';

function App() {
  const [selectedBusiness, setSelectedBusiness] = useState<BusinessType | null>(null);

  const handleClose = () => {
    setSelectedBusiness(null);
  };

  return (
    <div className="min-h-screen bg-white">
      <LandingPage onBusinessSelect={setSelectedBusiness} />
      {selectedBusiness && (
        <ChatInterface 
          businessType={selectedBusiness} 
          onClose={handleClose}
        />
      )}
    </div>
  );
}

export default App;