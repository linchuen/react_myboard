import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import './index.css';
import App from './App';
import Auth from './manage/Auth';
import Login from './login/Login';
import Signup from './login/Signup';


ReactDOM.render(<Router>
  <Switch>
    <Route path='/signup'>
      <Signup />
    </Route>
    <Route path='/login'>
      <Login />
    </Route>
    <Route path='/manage'>
      <Auth />
    </Route>

    <Route path='/'>
      <App />
    </Route>
  </Switch>
</Router>, document.getElementById('root'));
