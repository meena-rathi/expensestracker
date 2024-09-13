import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import SignInForm from './pages/auth/SignInForm';
import SignUpForm from './pages/auth/SignUpForm';
import Navbar from './components/NavBar';
import Home from './pages/expenses/Home';
import Container from "react-bootstrap/Container";
import styles from "./App.module.css";
// import { useCurrentUser } from "./contexts/CurrentUserContext";
import ExpenseEditForm from './components/ExpenseEditForm';

import PieChartDisplay from './pages/expenses/PieChartDisplay';

import ProfilePage from './pages/profiles/ProfilePage';
import ProfileEditForm from "./pages/profiles/ProfileEditForm";
import UsernameForm from "./pages/profiles/UsernameForm";
import UserPasswordForm from "./pages/profiles/UserPasswordForm";

function App() {
  // const currentUser = useCurrentUser();
  return (
    <div className={styles.App}>
      <Router>
        <Navbar />
        <Container className={styles.Main}>
          <Switch>
            <Route exact path="/signin" component={SignInForm} />
            <Route exact path="/signup" component={SignUpForm} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/piechart" component={PieChartDisplay} />
            <Route exact path="/expenses/:id/edit" component={ExpenseEditForm} />
            {/* <Route exact path="/profiles/:id" render={() => <ProfilePage />} /> */}
            {/* <Route exact path="/profiles/:id/edit" render={() => <ProfileEditForm />} />
            <Route exact path="/profiles/:id/edit/username" render={() => <UsernameForm />} /> */}
            <Route exact path="/profiles" component={ProfilePage} />
            <Route path="/profile-edit-form/" component={ProfileEditForm} />
            
            <Route path="/change-username" component={UsernameForm} />
            {/* <Route path="/change-password/" component={UserPasswordForm} /> */}
            <Route path="/change-password/:id" component={UserPasswordForm} />

        
            {/* <Route exact path="/expenses/:id/edit" render={() => <ExpenseEditForm />} /> */}
           
            {/* Add other routes here */}
          </Switch>
        </Container>
      </Router>
    </div>
  );
}

export default App;