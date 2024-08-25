// import React from 'react';
// import { NavLink } from 'react-router-dom';
// import { Navbar, Container, Nav } from 'react-bootstrap';
// import styles from '../styles/NavBar.module.css';
// import { useCurrentUser, useSetCurrentUser } from '../contexts/CurrentUserContext';
// import axios from 'axios';
// import useClickOutsideToggle from '../Hooks/useClickOutsideToggle';
// import Avatar from './Avatar';
// import logo from "../assets/logo.webp";

// const NavBar = () => {
//   const currentUser = useCurrentUser();
//   const setCurrentUser = useSetCurrentUser();

//   const { expanded, setExpanded, ref } = useClickOutsideToggle();

//   const handleSignOut = async () => {
//     try {
//       await axios.post("dj-rest-auth/logout/");
//       setCurrentUser(null);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const loggedInIcons = (
//     <>
//       <NavLink
//         className={styles.NavLink}
//         activeClassName={styles.Active}
//         to="/"
//         exact
//       >
//         <i className="fas fa-home"></i> Home
//       </NavLink>
//       <NavLink
//         className={styles.NavLink}
//         activeClassName={styles.Active}
//         to="/add-expense"
//         exact
//       >
//         <i className="fas fa-plus-circle"></i> Add Expenses
//       </NavLink>
//       <NavLink
//         className={styles.NavLink}
//         activeClassName={styles.Active}
//         to="/view-expenses"
//         exact
//       >
//         <i className="fas fa-list"></i> View Expenses
//       </NavLink>
//       <NavLink className={styles.NavLink} to="/" onClick={handleSignOut}>
//         <i className="fas fa-sign-out-alt"></i> Sign out
//       </NavLink>
//       <NavLink
//         className={styles.NavLink}
//         to={`/profiles/${currentUser?.profile_id}`}
//       >
//         <Avatar src={currentUser?.profile_image} text="Profile" height={40} />
//       </NavLink>
//     </>
//   );

//   const loggedOutIcons = (
//     <>
//       <NavLink
//         className={styles.NavLink}
//         activeClassName={styles.Active}
//         to="/signin"
//         exact
//       >
//         <i className="fas fa-sign-in-alt"></i> Sign in
//       </NavLink>
//       <NavLink
//         to="/signup"
//         className={styles.NavLink}
//         activeClassName={styles.Active}
//         exact
//       >
//         <i className="fas fa-user-plus"></i> Sign up
//       </NavLink>
//     </>
//   );

//   return (
//     <Navbar
//       expanded={expanded}
//       className={styles.NavBar}
//       expand="md"
//       fixed="top"
//     >
//       <Container>
//         <NavLink to="/">
//           <Navbar.Brand>
//             <img src={logo} alt="logo" height="45" />
//           </Navbar.Brand>
//         </NavLink>
//         <Navbar.Toggle
//           ref={ref}
//           onClick={() => setExpanded(!expanded)}
//           aria-controls="basic-navbar-nav"
//         />
//         <Navbar.Collapse id="basic-navbar-nav">
//           <Nav className="ms-auto text-left"> {/* `ms-auto` pushes the menu to the right */}
//             {currentUser ? loggedInIcons : loggedOutIcons}
//           </Nav>
//         </Navbar.Collapse>
//       </Container>
//     </Navbar>
//   );
// };

// export default NavBar;

import React from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar, Container, Nav } from 'react-bootstrap';
import styles from '../styles/NavBar.module.css';
import { useCurrentUser, useSetCurrentUser } from '../contexts/CurrentUserContext';
import axios from 'axios';
import useClickOutsideToggle from '../Hooks/useClickOutsideToggle';
import Avatar from './Avatar';
import logo from "../assets/logo.webp";

// Import Font Awesome icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faSignInAlt, faUserPlus, faPlusCircle, faList, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

const NavBar = () => {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();

  const { expanded, setExpanded, ref } = useClickOutsideToggle();

  const handleSignOut = async () => {
    try {
      await axios.post("dj-rest-auth/logout/");
      setCurrentUser(null);
    } catch (err) {
      console.log(err);
    }
  };

  const loggedInIcons = (
    <>
      <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/"
        exact
      >
        <FontAwesomeIcon icon={faHome} /> Home
      </NavLink>
      <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/add-expense"
        exact
      >
        <FontAwesomeIcon icon={faPlusCircle} /> Add Expenses
      </NavLink>
      <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/view-expenses"
        exact
      >
        <FontAwesomeIcon icon={faList} /> View Expenses
      </NavLink>
      <NavLink className={styles.NavLink} to="/" onClick={handleSignOut}>
        <FontAwesomeIcon icon={faSignOutAlt} /> Sign out
      </NavLink>
      <NavLink
        className={styles.NavLink}
        to={`/profiles/${currentUser?.profile_id}`}
      >
        <Avatar src={currentUser?.profile_image} text="Profile" height={40} />
      </NavLink>
    </>
  );

  const loggedOutIcons = (
    <>
      <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/signin"
        exact
      >
        <FontAwesomeIcon icon={faSignInAlt} /> Sign in
      </NavLink>
      <NavLink
        to="/signup"
        className={styles.NavLink}
        activeClassName={styles.Active}
        exact
      >
        <FontAwesomeIcon icon={faUserPlus} /> Sign up
      </NavLink>
    </>
  );

  return (
    <Navbar
      expanded={expanded}
      className={styles.NavBar}
      expand="md"
      fixed="top"
    >
      <Container>
        {/* Logo on the left */}
        <NavLink to="/">
          <Navbar.Brand>
            <img src={logo} alt="logo" height="45" />
          </Navbar.Brand>
        </NavLink>

        {/* Navbar Toggle for mobile view */}
        <Navbar.Toggle
          ref={ref}
          onClick={() => setExpanded(!expanded)}
          aria-controls="basic-navbar-nav"
        />

        {/* Navbar items aligned to the right */}
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {currentUser ? loggedInIcons : loggedOutIcons}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
