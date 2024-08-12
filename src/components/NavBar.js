// import React from 'react';
// import { NavLink } from "react-router-dom";
// import { Navbar as BootstrapNavbar, Container, Nav } from "react-bootstrap";
// import styles from "../styles/NavBar.module.css";
// const Navbar = () => {
//   return (
//     <BootstrapNavbar bg="light" expand="lg">
//       <Container>
//         <BootstrapNavbar.Brand href="/">MyApp</BootstrapNavbar.Brand>
//         <Nav className="mr-auto">
//           <Nav.Link as={NavLink} to="/signin" exact activeClassName={styles.Active}>
//             <i className="fas fa-sign-in-alt"></i> Sign in
//           </Nav.Link>
//           <Nav.Link as={NavLink} to="/signup" exact activeClassName={styles.Active}>
//             <i className="fas fa-user-plus"></i> Sign up
//           </Nav.Link>
//         </Nav>
//       </Container>
//     </BootstrapNavbar>
//   );
// }

import React from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar as BootstrapNavbar, Container, Nav } from 'react-bootstrap';
import styles from '../styles/NavBar.module.css';
import { useCurrentUser, useSetCurrentUser } from '../contexts/CurrentUserContext';

const NavBar = () => {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();

  const handleSignOut = () => {
    setCurrentUser(null); // Clear the user context
    localStorage.removeItem('refreshToken'); // Example: remove token if stored in local storage
  };

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
      <Nav.Link disabled>
        <i className="fas fa-user"></i> {currentUser?.username}
      </Nav.Link>
    </>
  );

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
    <BootstrapNavbar bg="light" expand="lg">
      <Container>
        <BootstrapNavbar.Brand href="/">MyApp</BootstrapNavbar.Brand>
        <Nav className="ml-auto">
          {currentUser ? loggedInMenu : loggedOutMenu}
        </Nav>
      </Container>
    </BootstrapNavbar>
  );
};

export default NavBar;