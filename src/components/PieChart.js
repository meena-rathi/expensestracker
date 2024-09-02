import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ data = [] }) => {
  if (!data.length) {
    return <p>No data available to display</p>;
  }

  const chartData = {
    labels: data.map((expense) => expense.description || 'Undefined'), // Fallback to 'Undefined' if category is missing
    datasets: [
      {
        label: 'Expenses',
        data: data.map((expense) => expense.amount || 0), // Fallback to 0 if amount is missing
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40',
          '#C9CBCF', // Extra colors in case of more categories
          '#47D147',
          '#D147D1',
        ],
        hoverBackgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40',
          '#C9CBCF',
          '#47D147',
          '#D147D1',
        ],
      },
    ],
  };

  return <Pie data={chartData} />;
};

export default PieChart;