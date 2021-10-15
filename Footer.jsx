import React, { Component } from 'react';

class Footer extends Component {
   constructor(props) {
      super(props);
      this.state = {
         marquee: '這是跑馬燈的內容',
         marqueeDuration: 40
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
            this.setState({ marquee: this.textlist[this.index] })
         })
         .catch((error) => {
            console.log(error);
         })
      this.timeID = setInterval(this.changetext, this.state.marqueeDuration*1000)
   }

   componentWillUnmount() {
      clearInterval(this.timeID)
   }


   render() {
      return (
         <div className='marquee'>
            <p style={{animationDuration:this.state.marqueeDuration+'S'}}>{this.state.marquee}</p>
         </div>);
   }
}

export default Footer;