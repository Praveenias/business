import React, { useState } from 'react';
import { Upload, Link, File } from 'lucide-react';
import { UploadMethod } from '../../types';
import pdf from '../../assets/images/pdf.svg'
import excel from '../../assets/images/excel.svg'

interface ProductUploadProps {
  onSubmit: (data: { method: UploadMethod; file?: File; link?: string }) => void;
}

const ProductUpload: React.FC<ProductUploadProps> = ({ onSubmit }) => {
  const [method, setMethod] = useState<UploadMethod>('file');
  const [file, setFile] = useState<File | any>(null);
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
  const isValidFileType = (file) => {
    const validTypes = ['application/pdf', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'image/png'];
    return file && validTypes.includes(file.type);
  };
  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (isValidFileType(droppedFile)) {
      setFile(droppedFile);
    }
  };
  const handleFileInput = async (e: React.FormEvent) => {
    const selectedFile = e.target.files[0];
    if (isValidFileType(selectedFile)) {
      setFile(selectedFile);
    }
    
    setIsSubmitting(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    console.log("hit");
    

    e.preventDefault();
    //if (isSubmitting) return;
    
    setIsSubmitting(true);
    try {
      await onSubmit({ method, file });
      // if (method === 'file' && file) {
        
      // } else if (method === 'link' && link) {
      //   await onSubmit({ method, link });
      // }
    } finally {
      setIsSubmitting(true);
    }
  };

  const isDisabled = isSubmitting || !((method === 'file' && file) || (method === 'link' && link));

  return (
    // <div className="mt-3 max-w-2xl mx-auto">
    //   <div className="flex space-x-3">
    //     <button
    //       type="button"
    //       onClick={() => setMethod('file')}
    //       className={`flex-1 p-3 rounded-lg border ${
    //         method === 'file' ? 'border-[#400C7A] bg-purple-50' : 'border-gray-200'
    //       } transition-all duration-200 hover:border-[#400C7A]`}
    //     >
    //       <File className="h-5 w-5 text-[#400C7A] mx-auto mb-1" />
    //       <p className="text-sm font-medium">Upload File</p>
    //       <p className="text-xs text-gray-500">PDF or Excel</p>
    //     </button>
        
    //     <button
    //       type="button"
    //       onClick={() => setMethod('link')}
    //       className={`flex-1 p-3 rounded-lg border ${
    //         method === 'link' ? 'border-[#400C7A] bg-purple-50' : 'border-gray-200'
    //       } transition-all duration-200 hover:border-[#400C7A]`}
    //     >
    //       <Link className="h-5 w-5 text-[#400C7A] mx-auto mb-1" />
    //       <p className="text-sm font-medium">Share Link</p>
    //       <p className="text-xs text-gray-500">Sheets or Excel</p>
    //     </button>
    //   </div>

    //   <form onSubmit={handleSubmit} className="mt-4">
    //     {method === 'file' ? (
    //       <div>
    //         <label
    //           htmlFor="file-upload"
    //           className="block cursor-pointer"
    //         >
    //           <div className="px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-[#400C7A] transition-colors duration-200">
    //             <div className="text-center">
    //               <Upload className="mx-auto h-8 w-8 text-gray-400 mb-1" />
    //               <div className="text-sm text-gray-600">
    //                 <span>Upload your product list</span>
    //                 <input
    //                   id="file-upload"
    //                   name="file-upload"
    //                   type="file"
    //                   className="sr-only"
    //                   accept=".pdf,.xls,.xlsx"
    //                   onChange={handleFileChange}
    //                 />
    //               </div>
    //               <p className="text-xs text-gray-500 mt-1">PDF or Excel up to 10MB</p>
    //             </div>
    //           </div>
    //         </label>
    //         {file && (
    //           <p className="text-sm text-green-600 mt-2">
    //             Selected: {file.name}
    //           </p>
    //         )}
    //         {error && (
    //           <p className="text-sm text-red-600 mt-2">
    //             {error}
    //           </p>
    //         )}
    //       </div>
    //     ) : (
    //       <div>
    //         <input
    //           type="url"
    //           value={link}
    //           onChange={(e) => setLink(e.target.value)}
    //           className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-[#400C7A] focus:ring-1 focus:ring-[#400C7A] text-sm"
    //           placeholder="Paste your spreadsheet link here"
    //         />
    //       </div>
    //     )}

    //     <div className="flex justify-center mt-4">
    //       <button
    //         type="submit"
    //         disabled={isDisabled}
    //         className="w-[300px] h-[35px] flex justify-center items-center rounded-lg text-sm font-medium text-white bg-[#400C7A] hover:bg-[#4d0e94] transition-colors duration-200 disabled:bg-gray-300 disabled:cursor-not-allowed"
    //       >
    //         Continue
    //       </button>
    //     </div>
    //   </form>
    // </div>
    <div className=" bg-gray-50 flex items-center justify-center p-4">
    <div className="w-full max-w-2xl">
      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center"
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
              <img src={pdf} alt="User" className="w-[40px] h-[40px]" />
                {/* <svg className="w-12 h-12 text-red-500" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20 2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-8.5 7.5c0 .83-.67 1.5-1.5 1.5H9v2H7.5V7H10c.83 0 1.5.67 1.5 1.5v1zm5 2c0 .83-.67 1.5-1.5 1.5h-2.5V7H15c.83 0 1.5.67 1.5 1.5v3zm4-3H19v1h1.5V11H19v2h-1.5V7h3v1.5zM9 9.5h1v-1H9v1zM4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm10 5.5h1v-3h-1v3z"/>
                </svg> */}
                {/* <span className="mt-1 text-sm">PDF</span> */}
              </div>
              <div className="flex flex-col items-center">
                {/* <svg className="w-12 h-12 text-green-500" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-1 16H6c-.55 0-1-.45-1-1V6c0-.55.45-1 1-1h12c.55 0 1 .45 1 1v12c0 .55-.45 1-1 1z"/>
                  <path d="M7 7h4v4H7zm6 0h4v4h-4zm-6 6h4v4H7zm6 0h4v4h-4z"/>
                </svg>
                <span className="mt-1 text-sm">Excel</span> */}
                 <img src={excel} alt="User" className="w-[40px] h-[40px]" />
              </div>
            </div>
          <label htmlFor="fileInput" className="cursor-pointer">
          <div className="relative">
              <input
                type="file"
                onChange={handleFileInput}
                // disabled={isDisabled}
                accept=".pdf,.xls,.xlsx,.png"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div className="px-5 py-1 bg-[#400C7A] text-white rounded-md hover:bg-purple-700 inline-block rounded-md">
                Browse Files
              </div>
            </div>
          </label>
        </div>
      </div>

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
            //disabled={isDisabled}
            className="w-[300px] h-[35px] flex justify-center items-center rounded-lg text-sm font-medium text-white bg-[#400C7A] hover:bg-[#4d0e94] transition-colors duration-200 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Continue
          </button>
        </div>
    </div>
  </div>
  );
};

export default ProductUpload;