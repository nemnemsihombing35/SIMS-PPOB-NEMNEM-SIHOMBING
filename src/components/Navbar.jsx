import React from 'react';
import logo from '../assets/Logo.png'; 
import { Link } from 'react-router-dom'; 

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md mt-6 p-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/home" className="flex items-center">
            <img src={logo} alt="Logo" className="h-8 w-auto mr-3" /> 
            <span className="text-black text-lg font-semibold hover:text-orange-400">SIMS PPOB</span> 
          </Link>
        </div>

        
        <div className="flex space-x-16">
          <Link to="/topup" className="text-black text-lg font-medium hover:text-orange-400">Top Up</Link>
          <Link to="/transaction" className="text-black text-lg font-medium hover:text-orange-400">Transaction</Link>
          <Link to="/akun" className="text-black text-lg font-medium hover:text-orange-400">Akun</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
