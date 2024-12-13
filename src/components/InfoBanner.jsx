import React from 'react';


import Banner1 from '../assets/Banner 1.png';
import Banner2 from '../assets/Banner 2.png';
import Banner3 from '../assets/Banner 3.png';
import Banner4 from '../assets/Banner 4.png';
import Banner5 from '../assets/Banner 5.png';


const banners = [
  { imageURL: Banner1 },
  { imageURL: Banner2 },
  { imageURL: Banner3 },
  { imageURL: Banner4 },
  { imageURL: Banner5 },
];

const InfoBanner = () => {
  return (
    <div className="overflow-x-auto py-4">
      <div className="text-xl font-semibold mb-4">
        Temukan promo menarik
      </div>
      <div className="flex space-x-4">
        {/* Menampilkan setiap banner dalam satu baris */}
        {banners.map((banner, index) => (
          <div key={index} className="flex-shrink-0">
            <img
              src={banner.imageURL}
              alt={`Banner ${index + 1}`}
              className="w-full h-[200px] object-cover rounded-lg"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default InfoBanner;
