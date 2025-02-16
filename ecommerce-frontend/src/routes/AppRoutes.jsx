import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Signup from "../pages/SignUp";
import Dashboard from "../pages/Dashboard";
import LoginPage from "../pages/LoginPage";
import PrivateRoute from "../components/privateRoute";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login"  element={<LoginPage/>} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
