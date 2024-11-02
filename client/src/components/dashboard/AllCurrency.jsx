import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import TopSection from './TopSection';
import Table from './Table';
import io from 'socket.io-client';
import { useNavigate } from 'react-router-dom';

const SOCKET_URL = "https://gdscbackend.sujal.info";
function roundNum(number){
    return +(Math.round(number + "e+2") + "e-2");
  }

function AllCurrency() {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/login');
    }
  }, []);
  const columns = ['symbol', 'price'];
  const [selectedCurrency, setSelectedCurrency] = useState('BTCUSDT');
  const [priceData, setPriceData] = useState([]);


  const handleCurrencyChange = (currency) => {
    setSelectedCurrency(currency);
  };
  const fetchPriceData = async () => {
    try {
      const response = await fetch(`${SOCKET_URL}/price/all`,{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
        }
      });
      const data = await response.json();
        data.data = data.data.map(d => {
            d.price = "$" + roundNum(d.price);
            return d;
        });
      setPriceData(data.data);
    } catch (error) {
      console.error('Error fetching data from API:', error);
    }
  };

  useEffect(() => {
    fetchPriceData();
    const socket = io(SOCKET_URL);
    socket.on('allCurrency', (data) => {
        data = data.map(d => {
            d.price = "$" + roundNum(d.price);
            return d;
          });
      setPriceData(data);
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
<div className='flex flex-col lg:flex-row'>
  <Sidebar />
  <main className="w-full lg:w-4/5 p-4 lg:p-6">
    <TopSection heading="All Currency (Updating in 5 seconds)" style="none" onCurrencyChange={handleCurrencyChange} />
    <div className="overflow-x-auto">
      <Table columns={columns} data={priceData} />
    </div>
  </main>
</div>
  );
}

export default AllCurrency;
