import './FileController.css';
import Header from '../Header';
import Upload from './Upload';
import ControllList from './ControllList';
import UpdateAndDelete from './UpdateAndDelete';
import React, { Component } from 'react';

class FileController extends Component {
  constructor(props) {
    super(props);
    this.state = {
      event: '建立跑馬燈',
      sayhello: 'Hi Admin,Welcome to Myboard',
      isAuthorized: false
    }
    this.bodyheight = screen.height - 125
    this.handleClickEvent = this.handleClickEvent.bind(this);
    this.renderClickItem = this.renderClickItem.bind(this);
    this.redirectOrNot = this.redirectOrNot.bind(this);
  }

  handleClickEvent(event) {
    this.setState({ event: event })
    console.log(event);
  }

  renderClickItem() {
    switch (this.state.event) {
      case '建立跑馬燈': return <Upload type='建立跑馬燈'></Upload>
      case '上傳影片': return <Upload type='上傳影片'></Upload>
      case '上傳圖片': return <Upload type='上傳圖片'></Upload>
      case '跑馬燈管理': return <UpdateAndDelete type='跑馬燈管理'></UpdateAndDelete>
      case '影片管理': return <UpdateAndDelete type='影片管理'></UpdateAndDelete>
      case '圖片管理': return <UpdateAndDelete type='圖片管理'></UpdateAndDelete>
      default: return <Upload></Upload>
    }
  }

  redirectOrNot() {
    if (this.state.isAuthorized) {
      return (
        <div className="container">
          <Header></Header>
          <div className="row g-5" style={{ 'height': this.bodyheight }}>
            <div className="col-md-5 col-lg-4 order-md-last">
              <ControllList handleClick={this.handleClickEvent}></ControllList>
            </div>
            <div className="col-md-7 col-lg-8">
              <h4 className="mb-3">{this.state.sayhello}</h4>
              {this.renderClickItem()}
            </div>
          </div>
        </div>)
    } else {
      return (
        <div className="forbidden" style={{ height: screen.availHeight }}>
          <h1>403</h1>
          <p>access not granted</p>
          <span className="support">
            <a href="/login">redirect login in 3s</a>
          </span>
        </div>
      )
    }
  }

  componentWillMount() {
    fetch('/auth/parse', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: window.localStorage.getItem('token') })
    })
      .then(res => res.json())
      .then((data) => {
        if (data['username']) {
          this.setState({ isAuthorized: true, sayhello: 'Hi ' + data['username'] + ',Welcome to Myboard' })
        } else {
          this.setState({ isAuthorized: false });
          setTimeout(() => { window.location.replace('/login') }, 3000);
        }
        console.log(data)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  render() {
    return (
      this.redirectOrNot()
    );
  }
}

export default FileController;