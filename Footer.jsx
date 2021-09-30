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
         .then((response) => response.json())
         .then((data) => {
            console.log('Marquee:',typeof (data), data);
            Object.values(data).forEach(item => {
               if(this.props.compareDate(item['startAt'],item['expiredAt'])){
                  this.textlist.push(<div className="m-r30 d_inlineblock">{item['filename']}</div>);
               }
            });
            this.setState({ marquee: this.textlist });
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