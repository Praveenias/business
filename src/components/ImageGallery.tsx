import React from 'react';

const ImageGallery: React.FC = () => {
  const images = [
    {
      url: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop",
      className: "col-span-2 row-span-2"
    },
    {
      url: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800&auto=format&fit=crop",
      className: ""
    },
    {
      url: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&auto=format&fit=crop",
      className: ""
    },
    {
      url: "https://images.unsplash.com/photo-1544148103-0773bf10d330?w=800&auto=format&fit=crop",
      className: ""
    },
    {
      url: "https://images.unsplash.com/photo-1560624052-449f5ddf0c31?w=800&auto=format&fit=crop",
      className: ""
    }
  ];

  return (
    <div className="grid grid-cols-4 gap-2 rounded-lg overflow-hidden mb-6">
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