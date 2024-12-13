import React from 'react';
import { useNavigate } from 'react-router-dom'; 


import PBB from '../assets/PBB.png';
import Listrik from '../assets/Listrik.png';
import Pulsa from '../assets/Pulsa.png';
import PDAM from '../assets/PDAM.png';
import PGN from '../assets/PGN.png';
import Televisi from '../assets/Televisi.png';
import Musik from '../assets/Musik.png';
import Game from '../assets/Game.png';
import VoucherMakanan from '../assets/Voucher Makanan.png';
import Kurban from '../assets/Kurban.png';
import Zakat from '../assets/Zakat.png';
import PaketData from '../assets/Paket Data.png';


const services = [
  { name: 'PPB', image: PBB },
  { name: 'Listrik', image: Listrik },
  { name: 'Pulsa', image: Pulsa },
  { name: 'PDAM', image: PDAM },
  { name: 'PGN', image: PGN },
  { name: 'TV Langganan', image: Televisi },
  { name: 'Musik', image: Musik },
  { name: 'Voucher Game', image: Game },
  { name: 'Voucher Makanan', image: VoucherMakanan },
  { name: 'Kurban', image: Kurban },
  { name: 'Zakat', image: Zakat },
  { name: 'Paket Data', image: PaketData },
];

const Services = () => {
  const navigate = useNavigate();

  // Fungsi untuk menangani klik layanan dan navigasi ke halaman transaksi
  const handleServiceClick = (service) => {
    navigate('/transaction', {
      state: {
        service_name: service.name,
        service_code: service.name, 
      },
    });
  };

  return (
    <div className="flex flex-wrap justify-center gap-7 p-6">
      {services.map((service, index) => (
        <div
          key={index}
          className="text-center flex flex-col items-center cursor-pointer"
          onClick={() => handleServiceClick(service)} 
        >
          <img
            src={service.image}
            alt={service.name}
            className="w-20 h-20 object-cover mb-2"
          />
          <p className="text-sm text-gray-700 break-words w-24 text-center">{service.name}</p>
        </div>
      ))}
    </div>
  );
};

export default Services;
