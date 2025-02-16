import React, { useContext } from 'react'
import { useState } from 'react';
import {Link} from "react-router-dom"
import { AuthContext } from '../context/AuthContext';
const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
     const {user,logout} = useContext(AuthContext);

    return (
        
      <nav className="bg-blue-600 p-4 ">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-white text-xl font-bold">Dashboard</Link>
          <div className="hidden md:flex space-x-4">
          <Link to="/mens" className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md">Men's Collection</Link>
          <Link to="/womens" className="bg-pink-600 text-white px-6 py-2 rounded-lg shadow-md">Women's Collection</Link>
            <Link to="/login" className="text-white px-4 py-2 border border-white rounded">Login</Link>
            <Link to="/signup" className="text-blue-600 bg-white px-4 py-2 rounded">Sign Up</Link>
          </div>
          <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
            ☰
          </button>
        </div>
        {isOpen && (
          <div className="md:hidden flex flex-col items-center mt-2 space-y-2">
            <Link to="/login" className="text-white px-4 py-2 border border-white rounded">Login</Link>
            <Link to="/signup" className="text-blue-600 bg-white px-4 py-2 rounded">Sign Up</Link>
          </div>
        )}
      </nav>
    );
}
const Dashboard = () => (
    <div className="p-4 text-center text-xl">Welcome to the Dashboard!</div>
  );
  
export default Navbar
