import React from 'react';
import { Container, Row, Col, Alert } from 'react-bootstrap';
import styles from '../../styles/Pie.module.css';
import PieChart from "../../components/PieChart";
import useExpenses from '../../Hooks/useExpenses';

const PieChartDisplay = () => {
  const { expenses, error } = useExpenses();

  return (
    <Container className={`mt-4 ${styles['pieChartContainer']}`}>
      <Row className="mb-4">
        <Col xs={12}>
          <h2 className="text-center mb-3">Expenses Breakdown</h2>
          {error && <Alert variant="danger" className={styles['error']}>{error}</Alert>}
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <div className={styles['pieChartWrapper']}>
            <PieChart data={expenses} />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default PieChartDisplay;
