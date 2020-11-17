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

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <nav>
            <Link to='/'>Home</Link>
            <Link to='count'>Count</Link>
          </nav>
        </div>

        <Switch>
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