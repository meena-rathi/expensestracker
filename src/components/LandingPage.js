// src/pages/LandingPage.js

import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import styles from '../styles/LandingPage.module.css';
import screenshot from '../assets/expenses.jpg';
const LandingPage = () => {
  return (
    <Container className={`text-center mt-4 ${styles.landingContainer}`}>
      <Row className="mb-4">
        <Col>
          <h1 className={styles.heading}>Welcome to BudgetMaster</h1>
          <p className={styles.subHeading}>
            Manage your expenses and budget effortlessly.
          </p>
        </Col>
      </Row>
      <Row className="mb-4">
  <Col>
    <img
      src={screenshot}
      alt="App Screenshot"
      className={styles.screenshot}
    />
  </Col>
</Row>
      <Row>
        <Col>
          <p className={styles.description}>
            Keep track of your finances, set budgets, and visualize your expenses with our easy-to-use tools.
          </p>
          <NavLink to="/signup">
            <Button variant="primary" size="lg" className={styles.ctaButton}>
              Get Started - Sign Up for Free!
            </Button>
          </NavLink>
          <p className={styles.signinPrompt}>
            Already have an account?{' '}
            <NavLink to="/signin" className={styles.signinLink}>
              Sign in
            </NavLink>
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default LandingPage;
