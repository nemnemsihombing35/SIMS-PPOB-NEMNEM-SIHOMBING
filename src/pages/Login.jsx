import React, { useState } from 'react';
import { AiOutlineMail, AiOutlineLock, AiOutlineEye, AiOutlineEyeInvisible,} from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../api/axios'; 
import LoginIllustration from '../assets/Illustrasi Login.png'; 

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState(''); 
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/login', {
        email,
        password,
      });
      setMessage('Login berhasil!');
      localStorage.setItem('token', response.data.token);
      navigate('/home');
    } catch (error) {
      setMessage(error.response?.data?.message || 'Login gagal, periksa email dan password Anda.');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="flex bg-white rounded-lg overflow-hidden w-full max-w-5xl">
        <div className="w-1/2 p-8 mt-24">
          <h2 className="text-center text-3xl font-semibold mb-6">
            Masuk atau buat akun untuk memulai
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4 relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <AiOutlineMail size={20} />
              </div>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                placeholder="Masukkan email Anda"
                required
              />
            </div>
            <div className="mb-6 relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <AiOutlineLock size={20} />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                placeholder="Masukkan password Anda"
                required
              />
              <div
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-400"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible size={20} />
                ) : (
                  <AiOutlineEye size={20} />
                )}
              </div>
            </div>
            <button
              type="submit"
              className="w-full p-3 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 focus:outline-none"
            >
              Masuk
            </button>
          </form>
          {message && <p className="text-center text-red-600 mt-4">{message}</p>}
          <p className="text-center text-gray-600 mt-4">
            Belum punya akun? registrasi{' '}
            <Link to="/register" className="text-red-600 font-semibold hover:underline">
              disini
            </Link>
          </p>
        </div>
        
        <div className="w-1/2 bg-white-100 flex items-center justify-center">
          <img src={LoginIllustration} alt="Illustrasi Login" className="w-4/4" />
        </div>
      </div>
    </div>
  );
};

export default Login;
