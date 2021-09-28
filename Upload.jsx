import React, { Component } from 'react';
import DateTimePicker from 'react-datetime-picker';
import 'react-datetime-picker/dist/DateTimePicker.css';
var classNames = require('classnames');

class Upload extends Component {
  constructor(props) {
    super(props);
    const today = new Date();
    this.state = {
      isVaild: false,
      text: '',
      video:null,
      picture:null,
      startAt: new Date(today.getFullYear(), today.getMonth(), today.getDate()),
      expiredAt: new Date(today.getFullYear(), today.getMonth(), today.getDate())
    }
    this.submitForm = this.submitForm.bind(this);
    this.renderInputType = this.renderInputType.bind(this);
    this.handleText=this.handleText.bind(this);
    this.handleVideo=this.handleVideo.bind(this);
    this.handlePicture=this.handlePicture.bind(this);
  }

  renderInputType() {
    switch (this.props.type) {
      case '建立跑馬燈':
        return (
          <div className="input-group has-validation">
            <input type="text" className="form-control" placeholder='跑馬燈內容' value={this.state.text}
              onChange={(event) => { this.setState({ text: event.target.value }) }}></input>
            <div className='invalid-feedback font30' id='invaildresponse'><h6>跑馬燈內容不得為空</h6></div>
          </div>);
      case '上傳影片':
        return (
          <div className="input-group has-validation">
            <input type="file" className="form-control" accept="video/mp4, video/webm, video/ogg" value={this.state.text}
              onChange={(event) => { this.setState({ text: event.target.value,video: event.target.files[0] }) }}></input>
            <div className='invalid-feedback font30' id='invaildresponse'><h6>影片內容不得為空</h6></div>
          </div>);
      case '上傳圖片':
        return (
          <div className="input-group has-validation">
            <input type="file" className="form-control" accept="image/png, image/jpeg, image/gif" value={this.state.text}
              onChange={(event) => { this.setState({ text: event.target.value,picture: event.target.files[0] }) }}></input>
            <div className='invalid-feedback font30' id='invaildresponse'><h6>圖片內容不得為空</h6></div>
          </div>);

      default:
        break;
    }
  }
  handleText() {
    fetch('/text',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 'filename': this.state.text, 'startAt': this.state.startAt, 'expiredAt': this.state.expiredAt })
    })
    .then((response) => { return response.json() })
    .then((data) => {
      if (data['id'] !== null) { alert(data['filename'] + ' created at' + data['createAt'] + ' successfully') }
    })
    .catch((error) => { alert(error);console.log(error) })
  }

  handleVideo() {
    const fromdata=new FormData()
    fromdata.append('video',this.state.video)
    fetch('/video',
    {
      method: 'POST',
      body: fromdata
    })
    .then((response) => { return response.json() })
    .then((data) => {
      if (data['id'] !== null) { alert(data['filename'] + ' created at' + data['createAt'] + ' successfully') }
    })
    .catch((error) => { alert(error);console.log(error) })
  }

  handlePicture() {
    const fromdata=new FormData()
    fromdata.append('image',this.state.picture)
    fetch('/picture',
    {
      method: 'POST',
      body: fromdata
    })
    .then((response) => { return response.json() })
    .then((data) => {
      if (data['id'] !== null) { alert(data['filename'] + ' created at' + data['createAt'] + ' successfully') }
    })
    .catch((error) => { alert(error);console.log(error) })
  }

  submitForm(e) {
    if (this.state.text === '') {
      document.getElementById('invaildresponse').style['display'] = 'block';
    } else {
      this.setState({ isVaild: true });
      document.getElementById('invaildresponse').style['display'] = 'none';
      switch (this.props.type) {
        case '建立跑馬燈':
          this.handleText()
          break;
        case '上傳影片':
          this.handleVideo()
          break;
        case '上傳圖片':
          this.handlePicture()
          break;
        default:
          this.handleText()
          break;
      }
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