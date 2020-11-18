import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './App.css';
import Home from './pages/Home'
import Count from './pages/Count'
import ControlledForm from './pages/ControlledForm';
import UncontrolledForm from './pages/UncontrolledForm';
import UseDebounceThrottle from './pages/UseDebounceThrottle';

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <nav>
            <Link to='/'> Home </Link>
            <Link to='/count'> Count </Link>
            <Link to='/controlled-form'> controlled-form </Link>
            <Link to='/uncontrolled-form'> Uncontrolled-form </Link>
            <Link to='/debounce-throttle'> debounce-throttle </Link>
          </nav>
        </div>

        <Switch>
          <Route path='/debounce-throttle'>
            <UseDebounceThrottle />
          </Route>
          <Route path='/uncontrolled-form'>
            <UncontrolledForm />
          </Route>
          <Route path='/controlled-form'>
            <ControlledForm />
          </Route>
          <Route path='/count'>
            <Count />
          </Route>
          <Route path='/'>
            <Home />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;