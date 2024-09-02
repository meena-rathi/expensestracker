import React from 'react';
import styles from '../../styles/Home.module.css';
import PieChart from "../../components/PieChart";
import useExpenses from '../../Hooks/useExpenses';



const PieChartDisplay = () => {
  const { expenses, error } = useExpenses();

  return (
    <div className={styles.pieChartContainer}>
      <h2>Expenses Breakdown</h2>
      {error && <p className={styles.error}>{error}</p>}
      <PieChart data={expenses} /> {/* Pass the expenses data to the PieChart component */}
    </div>
  );
};

export default PieChartDisplay;
