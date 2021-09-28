import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import './index.css';
import App from './App';
import FileController from './FileController';

ReactDOM.render(
  <Router>
    <Switch>
        <Route path='/manage'>
          <FileController />
        </Route>
        
        <Route path='/'>
          <App />
        </Route>
      </Switch>
  </Router>,
  document.getElementById('root')
);