import React, { useState } from 'react';
import { Upload, Link, File } from 'lucide-react';
import { UploadMethod } from '../../types';

interface ProductUploadProps {
  onSubmit: (data: { method: UploadMethod; file?: File; link?: string }) => void;
}

const ProductUpload: React.FC<ProductUploadProps> = ({ onSubmit }) => {
  const [method, setMethod] = useState<UploadMethod>('file');
  const [file, setFile] = useState<File | null>(null);
  const [link, setLink] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.type === 'application/pdf' || 
          selectedFile.type === 'application/vnd.ms-excel' ||
          selectedFile.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
        setFile(selectedFile);
        setError('');
      } else {
        setError('Please upload a PDF or Excel file');
        setFile(null);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    try {
      if (method === 'file' && file) {
        await onSubmit({ method, file });
      } else if (method === 'link' && link) {
        await onSubmit({ method, link });
      }
    } finally {
      setIsSubmitting(true);
    }
  };

  const isDisabled = isSubmitting || !((method === 'file' && file) || (method === 'link' && link));

  return (
    <div className="mt-3 max-w-2xl mx-auto">
      <div className="flex space-x-3">
        <button
          type="button"
          onClick={() => setMethod('file')}
          className={`flex-1 p-3 rounded-lg border ${
            method === 'file' ? 'border-[#400C7A] bg-purple-50' : 'border-gray-200'
          } transition-all duration-200 hover:border-[#400C7A]`}
        >
          <File className="h-5 w-5 text-[#400C7A] mx-auto mb-1" />
          <p className="text-sm font-medium">Upload File</p>
          <p className="text-xs text-gray-500">PDF or Excel</p>
        </button>
        
        <button
          type="button"
          onClick={() => setMethod('link')}
          className={`flex-1 p-3 rounded-lg border ${
            method === 'link' ? 'border-[#400C7A] bg-purple-50' : 'border-gray-200'
          } transition-all duration-200 hover:border-[#400C7A]`}
        >
          <Link className="h-5 w-5 text-[#400C7A] mx-auto mb-1" />
          <p className="text-sm font-medium">Share Link</p>
          <p className="text-xs text-gray-500">Sheets or Excel</p>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="mt-4">
        {method === 'file' ? (
          <div>
            <label
              htmlFor="file-upload"
              className="block cursor-pointer"
            >
              <div className="px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-[#400C7A] transition-colors duration-200">
                <div className="text-center">
                  <Upload className="mx-auto h-8 w-8 text-gray-400 mb-1" />
                  <div className="text-sm text-gray-600">
                    <span>Upload your product list</span>
                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      className="sr-only"
                      accept=".pdf,.xls,.xlsx"
                      onChange={handleFileChange}
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">PDF or Excel up to 10MB</p>
                </div>
              </div>
            </label>
            {file && (
              <p className="text-sm text-green-600 mt-2">
                Selected: {file.name}
              </p>
            )}
            {error && (
              <p className="text-sm text-red-600 mt-2">
                {error}
              </p>
            )}
          </div>
        ) : (
          <div>
            <input
              type="url"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-[#400C7A] focus:ring-1 focus:ring-[#400C7A] text-sm"
              placeholder="Paste your spreadsheet link here"
            />
          </div>
        )}

        <div className="flex justify-center mt-4">
          <button
            type="submit"
            disabled={isDisabled}
            className="w-[300px] h-[35px] flex justify-center items-center rounded-lg text-sm font-medium text-white bg-[#400C7A] hover:bg-[#4d0e94] transition-colors duration-200 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Continue
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductUpload;