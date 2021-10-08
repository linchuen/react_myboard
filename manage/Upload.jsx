import React, { Component } from 'react';
import DateTimePicker from 'react-datetime-picker';
import 'react-datetime-picker/dist/DateTimePicker.css';
var classNames = require('classnames');
import { validFilename, validVideoType, validPicType } from '../regex.js';

class Upload extends Component {
  constructor(props) {
    super(props);
    const today = new Date();
    this.state = {
      type: this.props.type,
      isVaild: false,
      text: '',
      filetext: '',
      video: null,
      picture: null,
      startAt: new Date(today.getFullYear(), today.getMonth(), today.getDate()),
      expiredAt: new Date(today.getFullYear(), today.getMonth(), today.getDate())
    }
    this.submitForm = this.submitForm.bind(this);
    this.renderInputType = this.renderInputType.bind(this);
    this.handleText = this.handleText.bind(this);
    this.handleVideo = this.handleVideo.bind(this);
    this.handlePicture = this.handlePicture.bind(this);
  }
  componentDidUpdate() {
    if (this.props.type !== this.state.type) {
      this.setState({ type: this.props.type, text: '', filetext: '' })
    }
  }

  renderInputType() {
    switch (this.state.type) {
      case '建立跑馬燈':
        return (
          <div className="input-group has-validation">
            <input type="text" className="form-control" placeholder='跑馬燈內容' value={this.state.text}
              onChange={(event) => {
                if (validFilename.test(event.target.value)) {
                  this.setState({ text: event.target.value, isVaild: true })
                } else {
                  this.setState({ text: event.target.value, isVaild: false })
                }
              }} required maxLength='100' pattern='[^\s]+'></input>
            <div className='invalid-feedback font30' id='invaildresponse'><h6>跑馬燈內容不得包含空白字元</h6></div>
          </div>);
      case '上傳影片':
        return (
          <div className="input-group has-validation">
            <input type="file" className="form-control" accept="video/mp4, video/webm, video/ogg" value={this.state.filetext}
              onChange={(event) => { this.setState({ filetext: event.target.value, video: event.target.files }) }} required multiple></input>
            <div className='invalid-feedback font30' id='invaildresponse'><h6>影片內容不得為空</h6></div>
          </div>);
      case '上傳圖片':
        return (
          <div className="input-group has-validation">
            <input type="file" className="form-control" accept="image/png, image/jpeg, image/gif" value={this.state.filetext}
              onChange={(event) => { this.setState({ filetext: event.target.value, picture: event.target.files }) }} required multiple></input>
            <div className='invalid-feedback font30' id='invaildresponse'><h6>圖片內容不得為空</h6></div>
          </div>);
      default:
        break;
    }
  }
  handleText() {
    if (validFilename.test(this.state.text)) {
      fetch('/text',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + window.localStorage.getItem('token') },
          body: JSON.stringify({ 'filename': this.state.text, 'startAt': this.state.startAt, 'expiredAt': this.state.expiredAt })
        })
        .then((response) => { return response.json() })
        .then((data) => {
          alert(data['filename'] + ' 建立於 ' + data['createAt'])
          console.log(data)
        })
        .catch((error) => { alert(error); console.log(error) })
    }
  }

  handleVideo() {
    for (const element of this.state.video) {
      const fromdata = new FormData()
      fromdata.append('video', element)
      fromdata.append('startAt', this.state.startAt)
      fromdata.append('expiredAt', this.state.expiredAt)
      fetch('/video',
        {
          method: 'POST',
          headers: { 'Authorization': 'Bearer ' + window.localStorage.getItem('token') },
          body: fromdata
        })
        .then((response) => { return response.json() })
        .then((data) => {
          alert(data['filename'] + ' 建立')
          console.log(data)
        })
        .catch((error) => { alert(error); console.log(error) })
    }
  }

  handlePicture() {
    for (const element of this.state.picture) {
      const fromdata = new FormData()
      fromdata.append('image', element)
      fromdata.append('startAt', this.state.startAt)
      fromdata.append('expiredAt', this.state.expiredAt)
      fetch('/picture',
        {
          method: 'POST',
          headers: { 'Authorization': 'Bearer ' + window.localStorage.getItem('token') },
          body: fromdata
        })
        .then((response) => { return response.json() })
        .then((data) => {
          alert(data['filename'] + ' 建立')
          console.log(data)
        })
        .catch((error) => { alert(error); console.log(error) })
    }
  }

  submitForm(e) {
    switch (this.props.type) {
      case '建立跑馬燈':
        if (validFilename.test(this.state.text)) {
          document.getElementById('invaildresponse').style['display'] = 'none';
          this.handleText()
        } else {
          document.getElementById('invaildresponse').style['display'] = 'block';
        }
        break;
      case '上傳影片':
        if (validVideoType.test(this.state.filetext)) {
          document.getElementById('invaildresponse').style['display'] = 'none';
          this.handleVideo()
        } else {
          document.getElementById('invaildresponse').style['display'] = 'block';
        }
        break;
      case '上傳圖片':
        if (validPicType.test(this.state.filetext)) {
          document.getElementById('invaildresponse').style['display'] = 'none';
          this.handlePicture()
        } else {
          document.getElementById('invaildresponse').style['display'] = 'block';
        }
        break;
      default:
        break;
    }
    e.preventDefault();
    e.stopPropagation();
  }



  render() {
    let formClass = classNames({ 'needs-validation': true, 'was-validated': this.state.isVaild });
    return (
      <form className={formClass} noValidate onSubmit={this.submitForm}>
        <div className="row g-3">
          <div className="col-12">
            <label className="form-label font30">{this.props.type}</label>
            {this.renderInputType()}
          </div>
          <div className="col-sm-6">
            <label className="form-label font30 d-block">開始時間</label>
            <DateTimePicker className='bg-w' value={this.state.startAt} onChange={(value) => { this.setState({ startAt: value }) }} />
          </div>

          <div className="col-sm-6">
            <label className="form-label font30 d-block">結束時間</label>
            <DateTimePicker className='bg-w' value={this.state.expiredAt} onChange={(value) => { this.setState({ expiredAt: value }) }} />
          </div>
          <button className="w-100 btn btn-primary btn-lg" type="submit">上傳</button>
        </div>
      </form>
    );

  }
}

export default Upload;