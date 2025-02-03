import React, { useState } from 'react';
import { Upload, Loader2 } from 'lucide-react';
import { UploadMethod } from '../../types';
import pdf from '../../assets/images/pdf.svg';
import excel from '../../assets/images/excel.svg';

interface ProductUploadProps {
  onSubmit: (data: { method: UploadMethod; file?: File; link?: string }) => void;
}

const ProductUpload: React.FC<ProductUploadProps> = ({ onSubmit }) => {
  const [method, setMethod] = useState<UploadMethod>('file');
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isValidFileType = (file: File) => {
    const validTypes = [
      'application/pdf',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'image/png'
    ];
    return file && validTypes.includes(file.type);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (isValidFileType(selectedFile)) {
        setFile(selectedFile);
        setError('');
      } else {
        setError('Please upload a PDF or Excel file');
        setFile(null);
      }
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (isValidFileType(droppedFile)) {
      setFile(droppedFile);
      setError('');
    } else {
      setError('Please upload a PDF or Excel file');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting || !file) return;

    setIsSubmitting(true);
    try {
      await onSubmit({ method, file });
    } catch (error) {
      setError('Failed to upload file. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          className={`border-2 border-dashed rounded-lg p-8 text-center ${
            error ? 'border-red-500' : 'border-gray-300'
          }`}
        >
          <input
            type="file"
            onChange={handleFileChange}
            accept=".pdf,.xls,.xlsx,.png"
            className="hidden"
            id="fileInput"
          />
          <div className="space-y-4">
            <div className="flex justify-center">
              <Upload className="w-35 h-35 text-[#400C7A]" strokeWidth={2.2} />
            </div>
            <p className="text-lg">Drag and drop your file or browse files</p>
            <p className="text-sm text-gray-500">Supported formats: PDF, Excel</p>
            <div className="flex justify-center items-center gap-[33px] pt-[5px] pb-[20px]">
              <div className="flex flex-col items-center">
                <img src={pdf} alt="PDF" className="w-[40px] h-[40px]" />
              </div>
              <div className="flex flex-col items-center">
                <img src={excel} alt="Excel" className="w-[40px] h-[40px]" />
              </div>
            </div>
            <label htmlFor="fileInput" className="cursor-pointer">
              <div className="relative">
                <input
                  type="file"
                  onChange={handleFileChange}
                  disabled={isSubmitting}
                  accept=".pdf,.xls,.xlsx,.png"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div className="px-5 py-1 bg-[#400C7A] text-white rounded-md hover:bg-purple-700 inline-block">
                  Browse Files
                </div>
              </div>
            </label>
          </div>
        </div>

        {error && (
          <p className="mt-2 text-sm text-red-500">{error}</p>
        )}

        {file && (
          <div className="mt-4 p-3 bg-white rounded-lg shadow">
            <div className="flex items-center">
              <div className="flex-1">
                <p className="text-sm font-medium">{file.name}</p>
                <p className="text-xs text-gray-500">
                  {(file.size / (1024 * 1024)).toFixed(2)}mb
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-center mt-4">
          <button
            type="submit"
            onClick={handleSubmit}
            disabled={isSubmitting || !file}
            className="w-[300px] h-[35px] flex justify-center items-center gap-2 rounded-lg text-sm font-medium text-white bg-[#400C7A] hover:bg-[#4d0e94] transition-colors duration-200 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Uploading...</span>
              </>
            ) : (
              'Continue'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductUpload;