import React from 'react';
import { Pie } from 'react-chartjs-2';

function Chart({ data }) {
  const chartData = {
    labels: ['Devices', 'Installation', 'Add-Ons'],
    datasets: [
      {
        data: [50, 30, 20],
        backgroundColor: ['#FF6F61', '#6BFF94', '#617BFF'],
      },
    ],
  };

  return <Pie data={chartData} />;
}

export default Chart;
