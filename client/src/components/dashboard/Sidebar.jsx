import { useState } from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button 
        className={`lg:hidden p-4 text-white fixed top-4 left-4 z-50 ${isOpen ? 'hidden' : 'block'}`}
        onClick={toggleSidebar}
      >
        <img height={24} width={24} src="https://static-00.iconduck.com/assets.00/menu-icon-512x447-x6ipilkh.png" alt="User image"/>
      </button>
      <div 
        className={`fixed h-full lg:relative top-0 left-0 lg:left-auto lg:h-screen bg-gray-900 text-white p-6 w-64 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-300 ease-in-out z-40`}
      >
        <h2 className="text-2xl font-semibold mb-8">LiveCoinStats</h2>
        <nav className="space-y-6">
          <Link to="/dashboard" className="flex items-center space-x-2 text-lg">
            <span>DashBoard</span>
          </Link>
          <Link to="/dashboard/allCurrency" className="flex items-center space-x-2 text-lg">
            <span>All Crypto Currency</span>
          </Link>
          <Link to="/dashboard/allUsers" className="flex items-center space-x-2 text-lg">
            <span>All Users</span>
          </Link>
        </nav>
        <Link to="/logout" className="flex items-center space-x-2 text-lg mt-4 absolute bottom-10">
          <span>Log out</span>
        </Link>
      </div>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden" 
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  );
};

export default Sidebar;
