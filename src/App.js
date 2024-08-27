import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import SignInForm from './pages/auth/SignInForm';
import SignUpForm from './pages/auth/SignUpForm';
import Navbar from './components/NavBar';
import Home from './pages/expenses/Home';
import Container from "react-bootstrap/Container";
import styles from "./App.module.css";
import { useCurrentUser } from "./contexts/CurrentUserContext";
import ViewExpenses from './pages/expenses/ViewExpenses';

function App() {
  const currentUser = useCurrentUser();

  return (
    <div className={styles.App}>
      <Router>
        <Navbar />
        <Container className={styles.Main}>
          <Switch>
            <Route exact path="/signin" component={SignInForm} />
            <Route exact path="/signup" component={SignUpForm} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/view-expenses" component={ViewExpenses}/>
            {/* Add other routes here */}
          </Switch>
        </Container>
      </Router>
    </div>
  );
}

export default App;