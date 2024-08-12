import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import SignInForm from './pages/auth/SignInForm';
import SignUpForm from './pages/auth/SignUpForm';
import Welcome from './pages/auth/Welcome';
import Navbar from './components/NavBar';

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/signin" component={SignInForm} />
        <Route exact path="/signup" component={SignUpForm} />
        <Route path="/welcome" component={Welcome} />
        {/* Add other routes here */}
      </Switch>
    </Router>
  );
}

export default App;