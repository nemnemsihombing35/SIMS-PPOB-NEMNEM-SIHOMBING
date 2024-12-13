import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import TopUp from "./pages/TopUp";
import Akun from "./pages/Akun";
import Transaction from "./pages/Transaction";
import { Provider } from 'react-redux';
import store from './redux/store';  // Pastikan store sudah terkonfigurasi dengan benar

function App() {
  return (
    // Provider Redux yang membungkus seluruh aplikasi
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="/topup" element={<TopUp />} />
          <Route path="/akun" element={<Akun />} />
          <Route path="/transaction" element={<Transaction />} />
          
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
