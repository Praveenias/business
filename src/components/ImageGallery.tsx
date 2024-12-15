import React from 'react';
import image1 from "../assets/images/topimage1.svg"
import image2 from "../assets/images/topimage2.svg"
import image3 from "../assets/images/topimage3.svg"
import image4 from "../assets/images/topimage4.svg"
import image5 from "../assets/images/topimage5.svg"
const ImageGallery: React.FC = () => {
  const images = [
    {
      url: image1,
      className: "col-span-2 row-span-2 h-[388px]"
    },
    {
      url:image2,
      className: "h-[190px]"
    },
    {
      url:image3,
      className: "h-[190px]"
    },
    {
      url:image4,
      className: "h-[190px]"
    },
    {
      url:image5,
      className: "h-[190px]"
    }
  ];

  return (
    <div className="grid grid-cols-4 gap-2 rounded-[20px] overflow-hidden mb-6">
      {images.map((image, index) => (
        <div key={index} className={image.className}>
          <img
            src={image.url}
            alt={`Restaurant interior ${index + 1}`}
            className="w-full h-full object-cover"
            style={{ aspectRatio: index === 0 ? '16/9' : '1/1' }}
          />
        </div>
      ))}
    </div>
  );
};

export default ImageGallery;