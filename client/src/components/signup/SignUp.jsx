import React, { useState,useEffect } from 'react';
import { Link,useNavigate} from 'react-router-dom';

const SignUp = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cPassword, setCPassword] = useState('');
  const [alert, setAlert] = useState(null);

  const showAlert = (message, color) => {
    setAlert({ message, color });
    setTimeout(() => setAlert(null), 1000);
  };

  const signup = async () => {
    if (password !== cPassword) {
      showAlert('Passwords do not match', 'red');
      return;
    }
    
    const request = await fetch('https://gdscbackend.sujal.info/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userName,
        email,
        password,
      }),
    });

    const response = await request.json();
    
    if (response.success) {
      showAlert('Signup Successful', 'green');
      localStorage.setItem('token', response.token);
      localStorage.setItem('userData', JSON.stringify(response.data));
      setTimeout(() => {
        navigate('/dashboard');
      }, 1000);
    } else {
      showAlert('Signup Failed', 'red');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signup();
  };

  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate('/dashboard');  // relative path
    }
  }, [navigate]);

  return (
    <div className="h-screen flex justify-center items-center bg-gray-100">
      <div className="flex max-w-4xl w-full shadow-lg rounded-lg overflow-hidden">
      <div  style={{ backgroundImage: 'url(https://i.pinimg.com/originals/8c/3d/9e/8c3d9e9bc113c82b278b7925060e4ef0.gif)' }} className="hidden lg:block lg:w-1/2 bg-gray-900 p-8 bg-cover bg-center bg-no-repeat">
        </div>
        <div className="w-full lg:w-1/2 p-8 bg-white">
        <h2 className="text-3xl font-bold text-black mb-4">LiveCoinStats</h2>
          <h2 className="text-2xl font-bold text-gray-700">Sign Up</h2>
          {alert && (
            <div className={`fixed top-5 right-5 text-white px-4 py-3 rounded-lg shadow-lg z-50`} style={{ backgroundColor: alert.color }}>
              {alert.message}
            </div>
          )}
          <form onSubmit={handleSubmit} className="mt-6">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Username</label>
              <input
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
                type="text"
                placeholder="Enter your username"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                required={true}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
              <input
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required={true}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
              <input
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required={true}
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2">Confirm Password</label>
              <input
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
                type="password"
                placeholder="Confirm your password"
                value={cPassword}
                onChange={(e) => setCPassword(e.target.value)}
                required={true}
              />
            </div>
            <button type="submit" className="w-full mt-6 bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition duration-300">
              Sign Up
            </button>
          </form>
          <p className="mt-4 text-center text-gray-600">
            Already have an account? <Link to="/login" className="text-blue-600 hover:underline">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
