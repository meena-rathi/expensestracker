import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import styles from '../styles/Pie.module.css';
ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const PieChart = ({ data = [] }) => {
  if (!data.length) {
    return <p className="error">No data available to display</p>;
  }

  const chartData = {
    labels: data.map((expense) => expense.description || 'Undefined'),
    datasets: [
      {
        label: 'Expenses',
        data: data.map((expense) => expense.amount || 0),
        backgroundColor: [
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
        datalabels: {
          color: '#fff',
          anchor: 'end',
          align: 'start',
          formatter: (value) => `$${value}`,
        },
      },
    ],
  };

  const options = {
    plugins: {
      datalabels: {
        display: true,
        color: 'white',
        formatter: (value, context) => {
          const label = context.chart.data.labels[context.dataIndex];
          return `${label}: $${value}`;
        },
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className={styles.pieChartWrapper}>
      <Pie data={chartData} options={options} />
    </div>
  );
};

export default PieChart;
