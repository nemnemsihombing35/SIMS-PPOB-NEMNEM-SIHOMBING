import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import BackgroundSaldo from '../assets/Background Saldo.png';
import ProfilePhoto from '../assets/Profile Photo.png';
import { AiOutlineEye, AiOutlineEyeInvisible, AiOutlineCheckCircle, AiOutlineCloseCircle } from 'react-icons/ai';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'; 

const Transaction = () => {
  const location = useLocation(); 
  const { service_name, service_code, service_image } = location.state || {}; 

  const [showBalance, setShowBalance] = useState(false);
  const [balance, setBalance] = useState(10000);  
  const [showConfirmModal, setShowConfirmModal] = useState(false); 
  const [showSuccessModal, setShowSuccessModal] = useState(false);  
  const [showFailedModal, setShowFailedModal] = useState(false); 
  const [modalAmount, setModalAmount] = useState(0);  
  const [amount, setAmount] = useState(0); 
  
  const toggleBalanceVisibility = () => {
    setShowBalance(!showBalance);
  };


  const user = useSelector((state) => state.user); 
  const dispatch = useDispatch();  

  const handleConfirmPayment = () => {
    setShowConfirmModal(true); 
  };

  const handlePayment = () => {
    setShowConfirmModal(false); 
    if (balance >= amount) {
      setBalance(balance - amount);
      setModalAmount(amount);
      setShowSuccessModal(true); 
    } else {
      setModalAmount(amount); 
      setShowFailedModal(true); 
    }
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

        <div className="mb-4 mt-6 w-full">
          <p className="text-xl mb-2 text-left">Pembayaran</p>
          <div className="mb-4">
            <p className="text-2xl font-bold">{service_name}</p>
          </div>
        </div>

        <div className="mb-4 w-full">
          <label htmlFor="amount" className="block text-gray-700">Jumlah Pembayaran</label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="mt-2 p-2 border border-gray-300 rounded-md w-full"
            placeholder="Masukkan jumlah pembayaran"
          />
        </div>

        <button
          onClick={handleConfirmPayment}
          className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md w-full"
        >
          Bayar
        </button>
      </div>

     
      {showConfirmModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-10 rounded-lg text-center">
            <img 
              src="/src/assets/Logo.png" 
              alt="Logo" 
              className="w-16 h-16 mx-auto mb-4"
            />
            <p className="text-lg mb-4">
              Beli <span className="font-bold">{service_name}</span> senilai
              <br />
              <span className="font-bold text-2xl">Rp. {amount.toLocaleString()}</span>
            </p>
            <div className="flex flex-col">
              <button
                onClick={handlePayment}
                className=" text-red-500 font-bold text-xl  px-6 py-2 rounded-md w-full"
              >
                Ya, Lanjutkan Bayar
              </button>
              <button
                onClick={() => setShowConfirmModal(false)}
                className="text-gray-500 text-xl font-bold px-6 py-2 mbrounded-md"
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      )}

      {showSuccessModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-10 rounded-lg text-center">
            <AiOutlineCheckCircle className="text-green-500 mb-4 mx-auto" size={60} />
            <p className="text-lg mb-4">
              Pembayaran {service_name} sebesar
              <br />
              <span className="font-bold text-2xl">Rp. {modalAmount.toLocaleString()}</span>
              <br />
              berhasil!
            </p>
            <button
              onClick={() => setShowSuccessModal(false)}
              className="font-bold text-xl text-red-500 hover:text-600 px-6 py-2 rounded-md"
            >
              Kembali ke Beranda
            </button>
          </div>
        </div>
      )}

     
      {showFailedModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-10 rounded-lg text-center">
            <AiOutlineCloseCircle className="text-red-500 mb-4 mx-auto" size={60} />
            <p className="text-lg mb-4">
              Pembayaran {service_name} sebesar
              <br />
              <span className="font-bold text-2xl">Rp. {modalAmount.toLocaleString()}</span>
              <br />
              gagal!
            </p>
            <button
              onClick={() => setShowFailedModal(false)}
              className="font-bold text-xl text-red-500 hover:text-600 px-6 py-2 rounded-md"
            >
              Kembali ke Beranda
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Transaction;
