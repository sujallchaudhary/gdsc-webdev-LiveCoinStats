import React, { useState, useEffect } from 'react';

function roundNum(number){
  return +(Math.round(number + "e+2") + "e-2");
}

const StatsSection = ({ currencyPrice,randomNumber }) => {
  const [totalCustomers, setTotalCustomers] = useState(0);
  const fetchTotalCustomers = async () => {
    try {
      const response = await fetch('https://gdscbackend.sujal.info/auth/users',{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        }
      })
      const data = await response.json();
      setTotalCustomers(data.data.length);
    } catch (error) {
      console.error("Error fetching total customers:", error);
    }
  };
  useEffect(() => {
    fetchTotalCustomers();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-gray-500">Current Price</h3>
        <p className="text-2xl font-semibold">${roundNum(currencyPrice.price)}</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-gray-500">Random Number</h3>
        <p className="text-2xl font-semibold">{randomNumber}</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-gray-500">Total Users</h3>
        <p className="text-2xl font-semibold">{totalCustomers}</p>
      </div>
    </div>
  );
};

export default StatsSection;
