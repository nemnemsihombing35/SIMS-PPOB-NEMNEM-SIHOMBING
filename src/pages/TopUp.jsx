import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'; 
import Navbar from '../components/Navbar';
import BackgroundSaldo from '../assets/Background Saldo.png';
import ProfilePhoto from '../assets/Profile Photo.png'; 
import { AiOutlineEye, AiOutlineEyeInvisible, AiOutlineCheckCircle } from 'react-icons/ai';
import { MdOutlineMoney } from 'react-icons/md';
import { topUp } from '../api/axios'; 

const TopUp = () => {
  const [showBalance, setShowBalance] = useState(false);
  const [balance, setBalance] = useState(10000);
  const [topUpAmount, setTopUpAmount] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalAmount, setModalAmount] = useState(0);

  const user = useSelector((state) => state.user); 
  const dispatch = useDispatch();

  const toggleBalanceVisibility = () => {
    setShowBalance(!showBalance);
  };

  const handleTopUp = async (amount) => {
    try {
     
      const response = await topUp(amount); 

      if (response.status === 200) {
        setBalance((prevBalance) => prevBalance + amount);
        setModalAmount(amount);
        setShowModal(true);
      } else {
        alert('Top-up gagal. Coba lagi.');
      }
    } catch (error) {
      console.error('Terjadi kesalahan saat melakukan top-up:', error);
      alert('Terjadi kesalahan. Silakan coba lagi.');
    }
  };

  const handleInputChange = (e) => {
    const value = Number(e.target.value);
    if (value >= 0) {
      setTopUpAmount(value);
    } else {
      setTopUpAmount('');
    }
  };

  const handleTopUpSubmit = () => {
    if (topUpAmount >= 10000 && topUpAmount <= 1000000) {
      handleTopUp(topUpAmount);
      setTopUpAmount('');
    } else {
      alert('Masukkan nominal top up antara Rp 10.000 dan Rp 1.000.000.');
    }
  };

  const handleSelectAmount = (amount) => {
    setTopUpAmount(amount);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <Navbar />
      <div className="bg-white mt-2 px-4 md:px-16 lg:px-24">
        <div className="container mx-auto py-4 flex flex-wrap md:flex-nowrap">
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
            <div className="relative w-full">
              <div className="mb-4 mt-10">
                <label htmlFor="topUpAmount" className="block text-gray-700">Silahkan Masukkan</label>
                <label htmlFor="topUpAmount" className="block text-black text-2xl font-bold">Nominal Top-Up</label>
              </div>
              <div className="flex items-center border border-gray-300 rounded-md mb-4">
                <MdOutlineMoney className="text-gray-500 ml-3" size={20} />
                <input
                  type="number"
                  id="topUpAmount"
                  value={topUpAmount}
                  onChange={handleInputChange}
                  placeholder="Masukkan nominal Top Up"
                  className="w-full p-2 pl-3 focus:outline-none focus:ring focus:ring-green-200"
                />
              </div>
              <button
                onClick={handleTopUpSubmit}
                className={`bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 w-full ${topUpAmount < 10000 || topUpAmount > 1000000 ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={topUpAmount < 10000 || topUpAmount > 1000000}
              >
                Top Up Sekarang
              </button>
            </div>
            <div className="mt-4 w-full">
              <p className="text-gray-700 mb-2">Atau pilih nominal:</p>
              <div className="grid grid-cols-3 gap-4">
                {[10000, 20000, 50000, 100000, 200000, 500000].map((amount) => (
                  <button
                    key={amount}
                    onClick={() => handleSelectAmount(amount)}
                    className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-green-500 hover:text-white"
                  >
                    Rp. {amount.toLocaleString()}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="md:w-1/2 flex flex-col items-center justify-start mt-8 md:mt-0">
            <div className="relative w-full flex justify-center mb-4">
              <img 
                src={BackgroundSaldo} 
                alt="Saldo Background" 
                className="w-full h-auto"
              />
              <div className="absolute top-1/2 transform -translate-y-1/2 w-full ml-14 mb-4">
                <p className="text-white mb-2">Saldo Anda</p>
                <h2 className="text-3xl font-semibold text-white">
                  Rp. 
                  {showBalance ? (
                    balance.toLocaleString()
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
      </div>
      
      {showModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-10 rounded-lg text-center">
            <AiOutlineCheckCircle className="text-green-500 mb-4 mx-auto" size={60} />
            <p className="text-lg mb-4">
              Top Up sebesar
              <br />
              <span className="font-bold text-2xl">Rp. {modalAmount.toLocaleString()}</span>
              <br />
              berhasil!
            </p>
            <button
              onClick={handleCloseModal}
              className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600"
            >
              Kembali ke Beranda
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TopUp;
