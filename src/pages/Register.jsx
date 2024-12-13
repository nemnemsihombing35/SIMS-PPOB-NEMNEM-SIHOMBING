import React, { useState } from 'react';
import {
  AiOutlineMail,
  AiOutlineLock,
  AiOutlineEye,
  AiOutlineEyeInvisible,
} from 'react-icons/ai';
import { BiUser } from 'react-icons/bi';
import { Link, useNavigate } from 'react-router-dom';
import RegisterIllustration from '../assets/Illustrasi Login.png';
import { register } from '../api/axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Regex untuk validasi email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validasi input
    if (!emailRegex.test(email)) {
      alert('Email tidak valid');
      return;
    }

    if (password.length < 6) {
      alert('Password harus lebih dari 6 karakter');
      return;
    }

    if (password !== confirmPassword) {
      alert('Password dan Konfirmasi Password tidak cocok!');
      return;
    }

    setLoading(true);

    try {
      const payload = {
        first_name: firstName,
        last_name: lastName,
        email,
        password,
      };

      console.log('Mengirim data:', payload);
      const response = await register(payload);

      console.log('Response dari server:', response.data);

      if (response.data.status === 0) {
        toast.success(response.data.message, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
        });

        setTimeout(() => {
          navigate('/login');
        }, 3000);
      } else {
        alert('Registrasi gagal: ' + response.data.message);
      }
    } catch (error) {
      console.error('Error selama registrasi:', error);
      if (error.response) {
        console.error('Data error dari server:', error.response.data);
        alert('Registrasi gagal: ' + error.response.data.message);
      } else {
        alert('Terjadi kesalahan saat registrasi. Silakan coba lagi.');
      }
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    if (e.target.value !== password) {
      setPasswordError('Password tidak sama');
    } else {
      setPasswordError('');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="flex bg-white rounded-lg overflow-hidden w-full max-w-5xl">
        <div className="w-1/2 p-8 mt-12">
          <h2 className="text-center text-3xl font-semibold mb-6">
            Lengkapi data untuk membuat akun
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

            <div className="mb-4 relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <BiUser size={20} />
              </div>
              <input
                type="text"
                id="firstname"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                placeholder="Nama Depan"
                required
              />
            </div>

            <div className="mb-4 relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <BiUser size={20} />
              </div>
              <input
                type="text"
                id="lastname"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                placeholder="Nama Belakang"
                required
              />
            </div>

            <div className="mb-4 relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <AiOutlineLock size={20} />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                placeholder="Buat Password"
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

            <div className="mb-6 relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <AiOutlineLock size={20} />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                id="confirmPassword"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                placeholder="Konfirmasi Password"
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
              {passwordError && (
                <p className="text-red-500 text-sm mt-1">{passwordError}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full p-3 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 focus:outline-none"
              disabled={loading}
            >
              {loading ? 'Loading...' : 'Registrasi'}
            </button>
          </form>
          <p className="text-center text-gray-600 mt-4">
            Sudah punya akun? Login{' '}
            <Link to="/" className="text-red-600 font-semibold hover:underline">
              disini
            </Link>
          </p>
        </div>

        <div className="w-1/2 bg-white-100 flex items-center justify-center">
          <img src={RegisterIllustration} alt="Ilustrasi Register" className="w-4/4" />
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default Register;
