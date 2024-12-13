import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'; 
import Navbar from '../components/Navbar';
import BackgroundSaldo from '../assets/Background Saldo.png';
import ProfilePhoto from '../assets/Profile Photo.png';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import Services from '../components/Services';
import InfoBanner from '../components/InfoBanner';
import axios from '../api/axios';

const Home = () => {
  const [balance, setBalance] = useState(null);
  const [showBalance, setShowBalance] = useState(false);
  
  const user = useSelector((state) => state.user);  
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        let token = localStorage.getItem('token');
        if (!token) {
          window.location.href = '/login';
          return;
        }
        // Mengambil data saldo
        const balanceResponse = await axios.get('/balance', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBalance(balanceResponse.data);

      } catch (error) {
        console.error('Error fetching data from API', error);
      }
    };

    fetchData();
  }, []);

  const toggleBalanceVisibility = () => {
    setShowBalance(!showBalance);
  };

  return (
    <div>
      <Navbar />
      <div className="bg-white mt-2 px-4 md:px-16 lg:px-24">
        <div className="container mx-auto py-4 flex flex-col md:flex-row">
          {/* Gambar Profile */}
          <div className="flex flex-col md:w-1/2">
            <img
              src={user ? user.photoUrl : ProfilePhoto} 
              alt="Profile"
              className="w-32 h-32 mb-4 rounded-full"
            />
            <div className="ml-4">
              <h1 className="text-lg">Selamat datang,</h1>
              <p className="text-3xl font-semibold">{user ? user.name : 'Loading...'}</p>
            </div>
          </div>

          {/* Bagian Saldo */}
          <div className="md:w-1/2 flex flex-col items-center justify-start mt-4 md:mt-0">
            <div className="relative w-full flex justify-center mb-4">
              <img
                src={BackgroundSaldo}
                alt="Saldo Background"
                className="w-full h-auto rounded-lg shadow-md"
              />
              <div className="absolute top-1/2 transform -translate-y-1/2 w-full ml-14 mb-4">
                <p className="text-white mb-2">Saldo Anda</p>
                <h2 className="text-3xl font-semibold text-white">
                  Rp.
                  {showBalance ? (
                    balance ? balance.amount.toLocaleString() : 'Loading...'
                  ) : (
                    <span className="inline-block">........</span>
                  )}
                </h2>
                <p className="text-white cursor-pointer mt-2 flex items-center" onClick={toggleBalanceVisibility}>
                  Lihat saldo
                  {showBalance ? (
                    <AiOutlineEyeInvisible className="ml-2 text-white" size={20} />
                  ) : (
                    <AiOutlineEye className="ml-2 text-white" size={20} />
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
        <Services />
        <InfoBanner />
      </div>
    </div>
  );
};

export default Home;
