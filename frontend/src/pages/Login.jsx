import React from 'react'
import { useState } from 'react';
import {useNavigate }from "react-router-dom"
import {toast}from "react-toastify"
import axios from "axios"
const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
  
    const handleLogin = async (e) => {
      e.preventDefault();
      console.log(password);
      try {
        const { data } = await axios.post(
          `${import.meta.env.VITE_API_URL}/api/auth/login`,
          { email, password }
        );
       console.log(data);
      
        localStorage.setItem("token", data.token);
        toast.success("Login Successful!");
        navigate("/");
      } catch (error) {
        toast.error("Invalid credentials");
      }
    };
    return (
        <>
      <div className="p-4 flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="border p-2 mb-2 w-80" />
      <input type="password" value={password} placeholder="Password"  onChange={(e) => setPassword(e.target.value)} className="border p-2 mb-2 w-80" />
      <button onClick={handleLogin} className="bg-blue-600 text-white px-4 py-2 rounded">Login</button>
    </div>
        </>
    )
    
}

export default Login
