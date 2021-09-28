import logo from './logo.svg';
import './App.css';
import Header from './Header';
import Picture from './Picture';
import Video from './Video';
import Footer from './Footer';
import React, { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <div className="App">
        <Header ></Header>
        <div className='row' style={{ '--bs-gutter-x': 0, 'height': '820px' }}>
          <div className='col-8' >
            <Video></Video>
          </div>
          <div className='col-4' >
            <Picture></Picture>
          </div>
        </div>
        <Footer></Footer>
      </div>
    );

  }
}

export default App;