import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';

function AnalyticsChart({ currencyPrice, currency }) {
  const [priceData, setPriceData] = useState([]);
  const [timeLabels, setTimeLabels] = useState([]);
  useEffect(() => {
    setPriceData((prevPriceData) => [...prevPriceData, currencyPrice.price]);
    setTimeLabels((prevTimeLabels) => [...prevTimeLabels, new Date().toLocaleTimeString()]);
  }, [currencyPrice]);
  useEffect(() => {
    setPriceData([]);
    setTimeLabels([]);
  }, [currency]);

  const chartData = {
    labels: timeLabels,
    datasets: [
      {
        label: `${currency} Price (USD)`,
        data: priceData,
        fill: false,
        borderColor: 'rgba(75,192,192,1)',
        tension: 0.1,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        title: {
          display: true,
          text: 'Time (5 seconds)',
        },
      },
      y: {
        beginAtZero: false,
        title: {
          display: true,
          text: 'Price (USD)',
        },
        ticks: {
          callback: function (value) {
            return value.toFixed(2);
          },
        },
      },
    },
  };

  return <Line data={chartData} options={options} />;
}

export default AnalyticsChart;
