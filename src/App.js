import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import SignInForm from './pages/auth/SignInForm';
import SignUpForm from './pages/auth/SignUpForm';
import Navbar from './components/NavBar';
import Home from './pages/expenses/Home';

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/signin" component={SignInForm} />
        <Route exact path="/signup" component={SignUpForm} />
        <Route path="/home" component={Home} />
        {/* Add other routes here */}
      </Switch>
    </Router>
  );
}

export default App;