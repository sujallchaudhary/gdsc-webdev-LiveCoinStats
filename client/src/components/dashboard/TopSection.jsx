import React, {useState,useEffect} from 'react';
const TopSection = ({ heading, style, onCurrencyChange }) => {
  const userData = localStorage.getItem('userData');
  if(!userData){
    return null;
  }
  const userName = JSON.parse(userData).userName;
  const currency = ['BTCUSDT', 'ETHUSDT', 'BNBUSDT', 'SOLUSDT', 'DOGEUSDT'];
  const [priceFilter, setPriceFilter] = useState('BTCUSDT');

  useEffect(() => {
    onCurrencyChange(priceFilter);
  }, [priceFilter]);

  const changeCurrency = (event) => {
    const selectedCurrency = event.target.value;
    setPriceFilter(selectedCurrency);
  };

  return (
    <div className="flex flex-col md:flex-row justify-between items-center mb-8">
      <h1 className="text-2xl font-semibold mb-4 md:mb-0">{heading}</h1>
      <div className="flex items-center space-x-4">
        <div className="relative">
          <select onChange={changeCurrency} style={{ display: style }} className="border border-gray-200 rounded-lg px-3 py-2 focus:outline-none">
            {currency.map((item, index) => (
              <option key={index} value={item}>{item}</option>
            ))}
          </select>
          <i className="fas fa-search absolute right-3 top-3 text-gray-400"></i>
        </div>
        <i className="far fa-bell text-gray-500"></i>
        <div className="items-center space-x-2 hidden md:inline">
          <img src={`https://ui-avatars.com/api/?name=${userName}`} alt="User image" className="rounded-full" />
          <span>{userName}</span>
          <i className="fas fa-chevron-down"></i>
        </div>
      </div>
    </div>
  );
};

export default TopSection;
