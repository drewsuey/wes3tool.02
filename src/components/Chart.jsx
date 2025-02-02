import React from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

function Chart({ data }) {
  // Suppose your form or parent logic calculates these three fields:
  //  - data.devices
  //  - data.installation
  //  - data.addOns

  const devicesCount = data?.devices ?? 0;       // or default to 0 if undefined
  const installationCount = data?.installation ?? 0;
  const addOnsCount = data?.addOns ?? 0;

  const chartData = {
    labels: ['Devices', 'Installation', 'Add-Ons'],
    datasets: [
      {
        data: [devicesCount, installationCount, addOnsCount],
        backgroundColor: ['#FF6F61', '#6BFF94', '#617BFF'],
      },
    ],
  };

  return <Pie data={chartData} />;
}

export default Chart;
