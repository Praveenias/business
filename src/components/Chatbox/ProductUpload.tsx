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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (method === 'file' && file) {
      onSubmit({ method, file });
    } else if (method === 'link' && link) {
      onSubmit({ method, link });
    }
  };

  return (
    <div className="mt-4 space-y-6">
      <div className="flex space-x-4">
        <button
          type="button"
          onClick={() => setMethod('file')}
          className={`flex-1 p-4 rounded-lg border-2 ${
            method === 'file' ? 'border-purple-500 bg-purple-50' : 'border-gray-200'
          } transition-all duration-200`}
        >
          <File className="h-6 w-6 text-purple-600 mx-auto mb-2" />
          <p className="text-sm font-medium text-center">Upload File</p>
          <p className="text-xs text-gray-500 text-center mt-1">PDF or Excel</p>
        </button>
        
        <button
          type="button"
          onClick={() => setMethod('link')}
          className={`flex-1 p-4 rounded-lg border-2 ${
            method === 'link' ? 'border-purple-500 bg-purple-50' : 'border-gray-200'
          } transition-all duration-200`}
        >
          <Link className="h-6 w-6 text-purple-600 mx-auto mb-2" />
          <p className="text-sm font-medium text-center">Share Link</p>
          <p className="text-xs text-gray-500 text-center mt-1">Google Sheets or Excel Online</p>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {method === 'file' ? (
          <div className="space-y-2">
            <label
              htmlFor="file-upload"
              className="relative cursor-pointer rounded-md font-medium text-purple-600 hover:text-purple-500"
            >
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-500 transition-colors duration-200">
                <div className="space-y-1 text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="flex text-sm text-gray-600">
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
                  <p className="text-xs text-gray-500">PDF or Excel up to 10MB</p>
                </div>
              </div>
            </label>
            {file && (
              <p className="text-sm text-green-600">
                Selected file: {file.name}
              </p>
            )}
            {error && (
              <p className="text-sm text-red-600">
                {error}
              </p>
            )}
          </div>
        ) : (
          <div>
            <label htmlFor="sheet-link" className="block text-sm font-medium text-gray-700">
              Spreadsheet Link
            </label>
            <input
              type="url"
              id="sheet-link"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              placeholder="Paste your Google Sheets or Excel Online link"
            />
          </div>
        )}

        <button
          type="submit"
          disabled={!((method === 'file' && file) || (method === 'link' && link))}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#400C7A] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          Continue
        </button>
      </form>
    </div>
  );
};

export default ProductUpload;