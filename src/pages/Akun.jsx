import React, { useState } from 'react';
import Navbar from '../components/Navbar'; 
import { MdOutlineEdit } from "react-icons/md";

const Akun = () => {
  const [profile, setProfile] = useState({
    email: 'user@nutech.com',
    firstName: 'Kristanto',
    lastName: 'Wibowo',
    profileImage: '/src/assets/Profile Photo.png',
  });
  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleEditProfile = () => {
    setIsEditing(true);
  };

  const handleSaveProfile = () => {
    console.log('Profile saved:', profile);
    setIsEditing(false);
  };

  const handleLogout = () => {
    console.log('Logout');
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <div className="flex items-center justify-center flex-grow p-4">
        <div className="p-6 bg-white rounded-xl w-full max-w-4xl">
          <div className="mb-6 text-center relative">
            <div className="relative inline-block">
              <img
                src={profile.profileImage}
                alt="Profile"
                className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-white"
              />
              <button
                onClick={handleEditProfile}
                className="absolute bottom-0 right-0 border border-gray-200 bg-white rounded-full p-2 shadow-md"
              >
                <MdOutlineEdit size={20} className="text-black" />
              </button>
            </div>
          </div>

          <div className="mb-6">
            <strong className="text-lg">Email:</strong>
            {isEditing ? (
              <input
                type="email"
                name="email"
                value={profile.email}
                onChange={handleInputChange}
                className="mt-2 p-4 border border-gray-300 rounded-lg bg-gray-50 text-lg w-full"
              />
            ) : (
              <div className="mt-2 p-4 border border-gray-300 rounded-lg bg-gray-50 text-lg">
                {profile.email}
              </div>
            )}
          </div>

          <div className="mb-6">
            <strong className="text-lg">Nama Depan:</strong>
            {isEditing ? (
              <input
                type="text"
                name="firstName"
                value={profile.firstName}
                onChange={handleInputChange}
                className="mt-2 p-4 border border-gray-300 rounded-lg bg-gray-50 text-lg w-full"
              />
            ) : (
              <div className="mt-2 p-4 border border-gray-300 rounded-lg bg-gray-50 text-lg">
                {profile.firstName}
              </div>
            )}
          </div>

          <div className="mb-8">
            <strong className="text-lg">Nama Belakang:</strong>
            {isEditing ? (
              <input
                type="text"
                name="lastName"
                value={profile.lastName}
                onChange={handleInputChange}
                className="mt-2 p-4 border border-gray-300 rounded-lg bg-gray-50 text-lg w-full"
              />
            ) : (
              <div className="mt-2 p-4 border border-gray-300 rounded-lg bg-gray-50 text-lg">
                {profile.lastName}
              </div>
            )}
          </div>

          <div className="flex flex-col space-y-4 md:space-y-2">
            {isEditing ? (
              <button
                onClick={handleSaveProfile}
                className="px-6 py-3 bg-red-600 font-bold text-white text-lg rounded-lg hover:bg-red-700"
              >
                Simpan
              </button>
            ) : (
              <>
                <button
                  onClick={handleEditProfile}
                  className="px-6 py-3 bg-white font-bold text-red-500 border-2 border-orange-300 rounded-lg hover:bg-red-600 hover:text-white hover:border-red-700"
                >
                  Edit Profil
                </button>
                <button
                  onClick={handleLogout}
                  className="px-6 py-3 bg-white font-bold text-red-500 border-2 border-orange-300 rounded-lg hover:bg-red-600 hover:text-white hover:border-red-700"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Akun;
