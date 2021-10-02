import React, { Component } from 'react';

class Footer extends Component {
   marquee = {
      color: 'white',
      fontSize: '50px'
   }
   constructor(props) {
      super(props);
      this.state = {
         marquee: '這是跑馬燈的內容',
         scrollamount: 5,
         scrolldelay: 100
      }
      this.index = 0
      this.textlist = [];
      this.changetext = this.changetext.bind(this);
   }
   changetext() {
      if (this.textlist.length > 0) {
         this.index++
         this.setState({ marquee: this.textlist[this.index % this.textlist.length] })
      }
   }

   componentDidMount() {
      fetch('/text', {
         method: 'GET'
      })
         .then((response) => response.json())
         .then((data) => {
            console.log('Marquee:', typeof (data), data);
            Object.values(data).forEach(item => {
               if (this.props.compareDate(item['startAt'], item['expiredAt'])) {
                  this.textlist.push(item['filename']);
               }
            });
            this.setState({ marquee: this.textlist[this.index]})
         })
         .catch((error) => {
            console.log(error);
         })
      this.needtime = (document.getElementById('mtext').offsetHeight*2) / this.state.scrollamount * this.state.scrolldelay
      this.timeID = setInterval(this.changetext, this.needtime)
   }

   componentWillUnmount() {
      clearInterval(this.timeID)
   }


   render() {
      return (
         <div>
            <marquee scrollamount={this.state.scrollamount} scrolldelay={this.state.scrolldelay} style={this.marquee} direction='up'>
               <div id='mtext' className='d_inlineblock'>
                  {this.state.marquee}
               </div>
            </marquee>
         </div>);
   }
}

export default Footer;