import React from 'react';
import { Home } from './components/Home';
import { Lyrics } from './components/tracks/Lyrics';
import { Navbar } from './components/Navbar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import { GlobalContext } from './context/GlobalContext';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <GlobalContext>
      <Router>
        <>
          <Navbar />
          <div className='container'>
            <Switch>
              <Route path='/' exact component={Home} />
              <Route
                path='/lyrics/track/:artist/:songTitle/:id'
                exact
                component={Lyrics}
              />
            </Switch>
          </div>
        </>
      </Router>
    </GlobalContext>
  );
}

export default App;
