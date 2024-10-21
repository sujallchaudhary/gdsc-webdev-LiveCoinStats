import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';

const RandomNumberChart = ({randomNumber}) => {
    const [chartData, setChartData] = useState(0);

    useEffect(() => {
        setChartData(randomNumber);
      }, [randomNumber]);

    const data = {
        labels: ['Number'],
        datasets: [
            {
                label: 'Random Number',
                data: [chartData],
                backgroundColor: '#A5B4FC',
                borderColor: '#C7D2FE',
                borderWidth: 1,
                barThickness: 100,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom',
            },
        },
        scales: {
            y: {
                min: 0,
                max: 10,
                ticks: {
                    stepSize: 1,
                },
            },
        },
    };

    return <Bar data={data} options={options} />;
};

export default RandomNumberChart;
