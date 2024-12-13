import axios from 'axios';


const api = axios.create({
  baseURL: 'https://take-home-test-api.nutech-integrasi.com', 
  headers: {
    'Content-Type': 'application/json', 
  },
});

// Fungsi untuk mengambil token dari localStorage
const getAuthToken = () => {
  return localStorage.getItem('authToken'); 
};

// Fungsi untuk mengatur token di header permintaan API
const setAuthHeader = () => {
  const token = getAuthToken();
  if (token) {
    api.defaults.headers['Authorization'] = `Bearer ${token}`; 
  }
};

// Fungsi untuk registrasi
export const register = async (data) => {
  return await api.post('/registration', data); 
};

// Fungsi untuk login
export const login = async (data) => {
  return await api.post('/login', data); 
};

// Fungsi untuk mendapatkan profil
export const getProfile = async () => {
  setAuthHeader(); 
  return await api.get('/profile'); 
};

// Fungsi untuk memperbarui profil
export const updateProfile = async (data) => {
  setAuthHeader(); 
  return await api.put('/profile/update', data); 
};

// Fungsi untuk mengubah gambar profil
export const updateProfileImage = async (data) => {
  setAuthHeader(); 
  return await api.post('/profile/image', data); 
};

// Fungsi untuk mendapatkan banner
export const getBanner = async () => {
  return await api.get('/banner'); 
};

// Fungsi untuk mendapatkan layanan
export const getServices = async () => {
  return await api.get('/services'); 
};

// Fungsi untuk mendapatkan saldo
export const getBalance = async () => {
  setAuthHeader(); 
  return await api.get('/balance'); 
};

// Fungsi untuk melakukan top-up
export const topUp = async (data) => {
  setAuthHeader(); 
  return await api.post('/topup', data); 
};

// Fungsi untuk transaksi
export const createTransaction = async (data) => {
  setAuthHeader(); 
};

// Fungsi untuk mendapatkan riwayat transaksi
export const getTransactionHistory = async () => {
  setAuthHeader(); 
  return await api.get('/transaction/history');
};

export default api;
