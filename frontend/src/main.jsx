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
import Men from './Collections/Men.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
    <BrowserRouter>
    <ToastContainer />
     <App />
    </BrowserRouter>
    </AuthProvider>
  </StrictMode>,
)
