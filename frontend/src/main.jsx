import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Homepage from './pages/Homepage.jsx'
import Login from './pages/Login.jsx'
import SignUp from './pages/SignUp.jsx'
import './index.css'
import App from './App.jsx'
import AuthProvider from './context/AuthContext.jsx'
import {ToastContainer} from "react-toastify"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
    <BrowserRouter>
    <ToastContainer />
     <App />
     <Routes>
      <Route  path="/" element={<Homepage/>}/>
      <Route path="/signup" element={<SignUp/>} />
      <Route path="/login" element={<Login/>} />
</Routes>
 
    </BrowserRouter>
    </AuthProvider>
  </StrictMode>,
)
