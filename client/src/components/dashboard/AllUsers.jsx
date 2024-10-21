import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import TopSection from './TopSection';
import Table from './Table';

const columns = ['userName', 'email'];
const fetchUserData = async () => {
  const response = await fetch('https://gdscbackend.sujal.info/auth/users', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
  });
  return response.json();
};

function AllUsers() {
  const [data, setData] = useState([]);
  const [selectedCurrency, setSelectedCurrency] = useState('BTCUSDT');
const handleCurrencyChange = (currency) => {
  setSelectedCurrency(currency);
};
  useEffect(() => {
    const getData = async () => {
      try {
        const userData = await fetchUserData();
        console.log(userData.data);
        setData(userData.data);
      } catch (err) {
        setError('Failed to fetch data');
      }
    };
    getData();
  }, []);

  return (
<div className='flex flex-col lg:flex-row'>
  <Sidebar />
  <main className="w-full lg:w-4/5 p-4 lg:p-6">
    <TopSection heading="All Users" style="none" onCurrencyChange={handleCurrencyChange} />
    <div className="overflow-x-auto">
      <Table columns={columns} data={data} />
    </div>
  </main>
</div>
  );
}

export default AllUsers;
