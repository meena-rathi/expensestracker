import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import SignInForm from './pages/auth/SignInForm';
import SignUpForm from './pages/auth/SignUpForm';
import h from './pages/auth/h';
import { CurrentUserProvider } from './contexts/CurrentUserContext';
import Welcome from './pages/auth/Welcome'
import Navbar from './components/Navbar';

function App() {
  return (

    <Router>
      <Navbar />
      <CurrentUserProvider>
        <Switch>
          <Route exact path="/signin" component={SignInForm} />
          <Route exact path="/signup" component={SignUpForm} />

   
          <Route path="/welcome" component={Welcome} />

          <Route exact path="/h" component={h}/>
          {/* Add other routes here */}
        </Switch>
      </CurrentUserProvider>
    </Router>
  );
}

export default App;