import React, { Component } from 'react';

class Footer extends Component {
   marquee = {
      color: 'white',
      whiteSpace: 'normal',
      fontSize: '50px'
   }
   constructor(props) {
      super(props);
      this.state = {
         marquee: '這是跑馬燈的內容',
      }
      this.textlist = [];
   }

   componentDidMount() {
      fetch('/text', {
         method: 'GET'
      })
         .then((response) => {
            return response.json()
         })
         .then((itemlist) => {
            console.log(typeof (itemlist), itemlist);
            Object.values(itemlist).forEach(item => {
               this.textlist.push(item.text + '     ');
            });
            this.setState({ marquee: this.textlist });
            console.log(this.textlist);
         })
         .catch((error) => {
            console.log(error);
         })
   }


   render() {
      return (<div><marquee scrollamount="8" style={this.marquee}>{this.state.marquee}</marquee></div>);
   }
}

export default Footer;