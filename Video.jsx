import React, { Component } from 'react';

class Video extends Component {
   constructor(props) {
      super(props);
      this.state = {
         vidoesoource: ''
      }
      this.playorder = 0;
      this.playlist = [];
      this.handleOnended = this.handleOnended.bind(this);
   }

   componentDidMount() {
      fetch('/video', {
         method: 'GET'
      })
         .then((response) => response.json())
         .then((data) => {
            console.log('Video:',typeof (data), data);
            Object.values(data).forEach(video => {
               this.playlist.push(video.filename);
            });
            this.setState({ vidoesoource: data[0].filename });
            document.getElementById('myvideo').load();
            document.getElementById('myvideo').play();
         })
         .catch((error) => {
            console.log(error);
         })
   }

   handleOnended(e) {
      this.playorder++
      console.log(this.playlist[this.playorder % this.playlist.length]);
      this.setState({ vidoesoource: this.playlist[this.playorder % this.playlist.length] });
      document.getElementById('myvideo').load();
      document.getElementById('myvideo').play();
   }

   render() {
      return (
         <video id="myvideo" autoPlay muted height="100%" onEnded={this.handleOnended}>
            <source src={this.state.vidoesoource} type="video/mp4"></source>
            <source src={this.state.vidoesoource} type="video/webm"></source>
            <source src={this.state.vidoesoource} type="video/ogg"></source>
         </video>
      );
   }
}

export default Video;