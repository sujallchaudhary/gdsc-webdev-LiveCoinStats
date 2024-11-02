import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const showAlert = (message, color) => {
    const newAlert = document.createElement('div');
    newAlert.classList.add(
      'fixed',
      'top-5',
      'right-5',
      'text-white',
      'px-4',
      'py-3',
      'rounded-lg',
      'shadow-lg',
      'alerts',
      'z-50'
    );
    newAlert.innerHTML = message;
    newAlert.style.backgroundColor = color;
    document.body.insertBefore(newAlert, document.body.firstChild);
    setTimeout(() => {
      newAlert.remove();
    }, 2000);
  };

  const login = async () => {
    const request = await fetch('https://gdscbackend.sujal.info/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: emailRef.current.value,
        password: passwordRef.current.value,
      }),
    });

    const response = await request.json();
    console.log(response);

    if (response.success) {
      showAlert('Login Successful', 'green');
      localStorage.setItem('token', response.token);
      localStorage.setItem('userData', JSON.stringify(response.data));
      setTimeout(() => {
        navigate('/dashboard');
      }, 1000);
    } else {
      showAlert('Login Failed', 'red');
    }
  };

  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate('/dashboard');
    }
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    login();
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gray-100">
      <div className="flex max-w-4xl w-full shadow-lg rounded-lg overflow-hidden">
        <div
          style={{ backgroundImage: 'url(https://i.pinimg.com/originals/8c/3d/9e/8c3d9e9bc113c82b278b7925060e4ef0.gif)' }}
          className="hidden lg:block lg:w-1/2 bg-gray-900 p-8 bg-cover bg-center bg-no-repeat"
        ></div>
        <div className="w-full lg:w-1/2 p-8 bg-white">
          <h2 className="text-3xl font-bold text-black mb-4">Aspirion</h2>
          <h2 className="text-2xl font-bold text-gray-700">Login</h2>
          <form onSubmit={handleSubmit} className="mt-6">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
              <input
                ref={emailRef}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
                type="email"
                placeholder="Enter your email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
              <input
                ref={passwordRef}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
                type="password"
                placeholder="Enter your password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
              />
            </div>
            <div className="flex items-center justify-between">
              <Link to="/forgotPassword" className="text-sm text-gray-600 hover:underline">
                Forgot Password?
              </Link>
            </div>
            <button
              type="submit"
              className="w-full mt-6 bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Login
            </button>
          </form>
          <p className="mt-4 text-center text-gray-600">
            Don't have an account?{' '}
            <Link to="/signup" className="text-blue-600 hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
