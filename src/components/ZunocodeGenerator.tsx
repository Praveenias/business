import React, { useState } from 'react';
import QRCode from 'qrcode.react';
import { Printer } from 'lucide-react';

interface ZunocodeGeneratorProps {
  businessName: string;
  businessId: string;
}

const ZunocodeGenerator: React.FC<ZunocodeGeneratorProps> = ({ businessName, businessId }) => {
  const [showQR, setShowQR] = useState(false);

  const handleGenerate = () => {
    setShowQR(true);
  };

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      const qrCodeUrl = document.getElementById('business-qr') as HTMLCanvasElement;
      printWindow.document.write(`
        <html>
          <head>
            <title>Zunocode - ${businessName}</title>
            <style>
              body { 
                font-family: system-ui, -apple-system, sans-serif;
                padding: 2rem;
                text-align: center;
              }
              .container {
                max-width: 400px;
                margin: 0 auto;
              }
              img {
                max-width: 100%;
                height: auto;
              }
              h1 {
                color: #4A0079;
                font-size: 1.5rem;
                margin-bottom: 1rem;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <h1>${businessName}</h1>
              <img src="${qrCodeUrl.toDataURL()}" alt="Business QR Code" />
            </div>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.focus();
      printWindow.print();
    }
  };

  return (
    <div className="mt-6 text-center">
      {!showQR ? (
        <button
          onClick={handleGenerate}
          className="px-6 py-3 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors"
        >
          Generate Zunocode!!
        </button>
      ) : (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-md inline-block">
            <QRCode
              id="business-qr"
              value={`https://zuno.app/business/${businessId}`}
              size={200}
              level="H"
              includeMargin
            />
          </div>
          <div>
            <button
              onClick={handlePrint}
              className="flex items-center justify-center space-x-2 mx-auto px-6 py-3 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition-colors"
            >
              <Printer className="w-5 h-5" />
              <span>Print Zunocode</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ZunocodeGenerator;