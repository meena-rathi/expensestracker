

import React from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar as BootstrapNavbar, Container, Nav } from 'react-bootstrap';
import styles from '../styles/NavBar.module.css';
import { useCurrentUser, useSetCurrentUser } from '../contexts/CurrentUserContext';
import axios from 'axios';
import useClickOutsideToggle from '../Hooks/useClickOutsideToggle';


const NavBar = () => {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();

  // Toggle hook to handle navbar expansion/collapse
  const { expanded, setExpanded, ref } = useClickOutsideToggle();

  // Handle user sign out
  const handleSignOut = async () => {
    try {
      await axios.post('dj-rest-auth/logout/');
      setCurrentUser(null);
      localStorage.removeItem('refreshToken');
    } catch (err) {
      console.log(err);
    }
  };

  // Logged in menu options
  const loggedInMenu = (
    <>
      <Nav.Link as={NavLink} to="/" exact activeClassName={styles.Active}>
        <i className="fas fa-home"></i> Home
      </Nav.Link>
      <Nav.Link as={NavLink} to="/add-expense" exact activeClassName={styles.Active}>
        <i className="fas fa-plus-circle"></i> Add Expenses
      </Nav.Link>
      <Nav.Link as={NavLink} to="/view-expenses" exact activeClassName={styles.Active}>
        <i className="fas fa-list"></i> View Expenses
      </Nav.Link>
      <Nav.Link onClick={handleSignOut}>
        <i className="fas fa-sign-out-alt"></i> Sign out
      </Nav.Link>
      <Nav.Link as={NavLink} to={`/profiles/${currentUser?.profile_id}`} exact>
        {/* <Avatar src={currentUser?.profile_image} text="Profile" height={40} /> */}
      </Nav.Link>
    </>
  );

  // Logged out menu options
  const loggedOutMenu = (
    <>
      <Nav.Link as={NavLink} to="/signin" exact activeClassName={styles.Active}>
        <i className="fas fa-sign-in-alt"></i> Sign in
      </Nav.Link>
      <Nav.Link as={NavLink} to="/signup" exact activeClassName={styles.Active}>
        <i className="fas fa-user-plus"></i> Sign up
      </Nav.Link>
    </>
  );

  return (
    <BootstrapNavbar expanded={expanded} className={styles.NavBar} expand="md" fixed="top">
      <Container>
        <NavLink to="/">
          {/* <BootstrapNavbar.Brand>
            <img src={logo} alt="logo" height="45" />
          </BootstrapNavbar.Brand> */}
        </NavLink>
        <BootstrapNavbar.Toggle ref={ref} onClick={() => setExpanded(!expanded)} aria-controls="basic-navbar-nav" />
        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto text-left">
            {currentUser ? loggedInMenu : loggedOutMenu}
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
};

export default NavBar;