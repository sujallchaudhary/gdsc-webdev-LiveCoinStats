import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopSection from './TopSection';
import StatsSection from './StatsSection';
import AnalyticsChart from './AnalyticsChart';
import RandomNumberChart from './RandomNumberChart';
import io from 'socket.io-client';


const SOCKET_URL = "https://gdscbackend.sujal.info";
const SOCKET_URL_2 = "https://data.gdscnsut.com";

const Dashboard = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/login');
    }
  }, []);
  const [currencyPrice, setCurrencyPrice] = useState({});
  const [selectedCurrency, setSelectedCurrency] = useState('BTCUSDT');
  const [randomNumber, setRandomNumber] = useState(0);
  const [socket, setSocket] = useState(null);

  const fetchInitialCurrencyData = async (currency) => {
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
        if(d.symbol === currency){
          setCurrencyPrice(d);
        }
      });
    } catch (error) {
      console.error('Error fetching initial currency data from API:', error);
    }
  };

  const establishSocketConnection = (currency) => {
    if (socket) {
      socket.disconnect();
    }

    const newSocket = io(SOCKET_URL);
    const newSocket2 = io(SOCKET_URL_2);

    newSocket.on('allCurrency', (priceData) => {
      priceData = priceData.map(d => {
      if(d.symbol === selectedCurrency){
        setCurrencyPrice(d);
      }
      else{
        return;
      }
    });
  });

    newSocket2.on('random_number', (newData) => {
      setRandomNumber(newData.number);
    });

    newSocket.emit('currencyChange', currency);

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
      newSocket2.disconnect();
    };
  };

  useEffect(() => {
    fetchInitialCurrencyData(selectedCurrency);
    const cleanup = establishSocketConnection(selectedCurrency);
    return () => {
      if (cleanup) cleanup();
    };
  }, [selectedCurrency]);
  const handleCurrencyChange = (currency) => {
    setSelectedCurrency(currency);
  };

  return (
<div className="flex flex-col lg:flex-row">
  <Sidebar />
  <main className="w-full lg:w-4/5 p-4 lg:p-6">
    <TopSection
      heading="DashBoard"
      style="block"
      onCurrencyChange={handleCurrencyChange}
    />
    <StatsSection currencyPrice={currencyPrice} randomNumber={randomNumber} />
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mt-6">
      <div className="bg-white p-4 lg:p-6 rounded-lg shadow-lg col-span-2 flex flex-col">
        <h3 className="text-gray-500 mb-4 text-lg">Price Graph</h3>
        <div className="flex-grow min-h-[200px] lg:min-h-[300px] overflow-x-auto">
          <AnalyticsChart currency={selectedCurrency} currencyPrice={currencyPrice} />
        </div>
      </div>
      <div className="bg-white p-4 lg:p-6 rounded-lg shadow-lg col-span-1 flex flex-col">
        <h3 className="text-gray-500 mb-4 text-lg">Random Number</h3>
        <div className="flex-grow min-h-[200px] lg:min-h-[300px] overflow-x-auto">
          <RandomNumberChart randomNumber={randomNumber} />
        </div>
      </div>
    </div>
  </main>
</div>


  
  );
};

export default Dashboard;
