import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import SignInForm from './pages/auth/SignInForm';
import SignUpForm from './pages/auth/SignUpForm';
import Navbar from './components/NavBar';
import Home from './pages/expenses/Home';

import { useCurrentUser } from "./contexts/CurrentUserContext"

function App() {
  const currentUser = useCurrentUser();
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/signin" component={SignInForm} />
        <Route exact path="/signup" component={SignUpForm} />
        {/* <Route exact path="/home" render={()=><Home/>}/> */}
        <Route exact path="/home" component={Home} />
        {/* Add other routes here */}
      </Switch>
    </Router>
  );
}

export default App;