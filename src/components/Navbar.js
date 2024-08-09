import React from 'react';
import { NavLink } from "react-router-dom";
import { Navbar as BootstrapNavbar, Container, Nav } from "react-bootstrap";
import styles from "../styles/NavBar.module.css";




const Navbar = () => {
  return (
    <BootstrapNavbar bg="light" expand="lg">
      <Container>
        <BootstrapNavbar.Brand href="/">MyApp</BootstrapNavbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link as={NavLink} to="/signin" exact activeClassName={styles.Active}>
            <i className="fas fa-sign-in-alt"></i> Sign in
          </Nav.Link>
          <Nav.Link as={NavLink} to="/signup" exact activeClassName={styles.Active}>
            <i className="fas fa-user-plus"></i> Sign up
          </Nav.Link>
        </Nav>
      </Container>
    </BootstrapNavbar>
  );
}

export default Navbar;