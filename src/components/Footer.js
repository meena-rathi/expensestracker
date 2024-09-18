import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaLinkedin, FaFacebook } from 'react-icons/fa'; // Ensure correct import
import styles from '../styles/Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Container>
        <Row className="text-center py-3">
          <Col xs={12} className={`${styles['footer-content']} d-flex justify-content-between`}>
            <div className={styles['social-links']}>
              <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer" className={`${styles['link']} ${styles['linkedin-icon']}`}>
                <FaLinkedin className={styles.icon} />
              </a>
              <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" className={`${styles['link']} ${styles['facebook-icon']}`}>
                <FaFacebook className={styles.icon} />
              </a>
            </div>
            <div className={styles['footer-right']}>
              <Link to="/home" className={styles.link}>Home</Link>
              <Link to="/piechart" className={styles.link}>Pie Chart</Link>
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs={12} className="text-center">
            <p>&copy; {new Date().getFullYear()} Your Company Name. All rights reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
