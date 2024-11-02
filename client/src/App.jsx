import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/login/Login';
import SignUp from './components/signup/SignUp';
import ForgotPasswordPage from './components/forgotPassword/ForgotPassword';
import ResetPassword from './components/resetPassword/ResetPassword';
import Dashboard from './components/dashboard/Index';
import AllUsers from './components/dashboard/allUsers';
import AllCurrency from './components/dashboard/AllCurrency';
import Logout from './components/dashboard/Logout';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgotPassword" element={<ForgotPasswordPage />} />
        <Route path="/resetPassword" element={<ResetPassword />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/allUsers" element={<AllUsers />} />
        <Route path="/dashboard/allCurrency" element={<AllCurrency />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </Router>
  );
};

export default App;
