// src/components/Chart.jsx

import React from 'react';
import { Doughnut } from 'react-chartjs-2';
// Import chart.js and register the necessary components:
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} 
// Tell chart.js which components to use
from 'chart.js';
ChartJS.register(ArcElement, Tooltip, Legend);


function Chart({ data }) {
  // Pull each device count from the deviceCounts object in parent data (or default to 0)
  const smokes = data.deviceCounts?.smoke || 0;
  const heats = data.deviceCounts?.heat || 0;
  const calls = data.deviceCounts?.callPoints || 0;
  const interfaces = data.deviceCounts?.interfaceUnits || 0;

  const chartData = {
    labels: ['Smoke', 'Heat', 'Call Points', 'Interface'],
    datasets: [
      {
        label: 'Device Count',
        data: [smokes, heats, calls, interfaces],
        backgroundColor: [
          '#FF0000', // Smoke = red
          '#9B59B6', // Heat = purple
          '#00B050', // Call Points = green
          '#000000', // Interface = black
        ],
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: true },  // If you want to hide "Device Count" legend
      title: {
        display: true,
        text: 'Device Quantities',
      },
    },
  
  };

  return <Doughnut data={chartData} options={chartOptions} />;
}

export default Chart;
