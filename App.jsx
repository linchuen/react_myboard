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
    this.dateInRange=this.dateInRange.bind(this);
  }

  dateInRange(startAtstr,expiredAtstr){
    const now=new Date()
    const startAt=new Date(startAtstr)
    const expiredAt=new Date(expiredAtstr)
    if (now.getTime()>=startAt.getTime() && now.getTime()<=expiredAt.getTime()) {
        return true
    }
    return false
  }

  render() {
    return (
      <div className="App">
        <Header ></Header>
        <div className='row' style={{ '--bs-gutter-x': 0, 'height': '820px' }}>
          <div className='col-8' >
            <Video compareDate={this.dateInRange}></Video>
          </div>
          <div className='col-4' >
            <Picture compareDate={this.dateInRange}></Picture>
          </div>
        </div>
        <Footer compareDate={this.dateInRange}></Footer>
      </div>
    );

  }
}

export default App;