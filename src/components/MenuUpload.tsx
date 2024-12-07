import React, { useState } from 'react';
import { Upload } from 'lucide-react';

interface MenuUploadProps {
  onFileUpload: (file: File) => void;
}

const MenuUpload: React.FC<MenuUploadProps> = ({ onFileUpload }) => {
  const [showUpload, setShowUpload] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    if (file.type === 'application/pdf' || 
        file.type === 'image/jpeg' || 
        file.type === 'image/png') {
      onFileUpload(file);
    }
  };

  if (!showUpload) {
    return (
      <div className="flex space-x-4 mt-4">
        <button
          onClick={() => setShowUpload(true)}
          className="flex-1 px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
        >
          Yes
        </button>
        <button
          onClick={() => onFileUpload(new File([], 'skip'))}
          className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
        >
          No
        </button>
      </div>
    );
  }

  return (
    <div className="mt-4">
      <p className="text-sm text-gray-600 mb-4">Upload your restaurant's menu</p>
      <div
        className="border-2 border-dashed border-gray-300 rounded-lg p-6"
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          type="file"
          id="menu-upload"
          className="hidden"
          accept=".pdf,.jpg,.jpeg,.png"
          onChange={handleChange}
        />
        
        <label
          htmlFor="menu-upload"
          className="flex flex-col items-center cursor-pointer"
        >
          <Upload className="h-12 w-12 text-gray-400 mb-3" />
          <p className="text-sm text-gray-600 text-center mb-2">
            Drag and drop your file or browse files
          </p>
          <div className="flex items-center space-x-2">
            <span className="px-2 py-1 bg-gray-100 rounded text-xs">PDF</span>
            <span className="px-2 py-1 bg-gray-100 rounded text-xs">JPG</span>
            <span className="px-2 py-1 bg-gray-100 rounded text-xs">PNG</span>
          </div>
        </label>
      </div>
    </div>
  );
};

export default MenuUpload;