import React, { Component } from 'react';

class Picture extends Component {
   constructor(props) {
      super(props);
      this.state = {
         carousel_items: []
      }
   }

   componentDidMount() {
      fetch('/picture', {
         method: 'GET'
      })
         .then((response) => response.json())
         .then((data) => {
            let firsttime = true;
            const carousel = [];
            console.log('Picture:',typeof (data), data);
            Object.values(data).forEach(pic => {
               if (firsttime) {
                  if(this.props.compareDate(pic['startAt'],pic['expiredAt'])){
                     carousel.push(<div key={pic.id} className='carousel-item active'><img src={pic.filename} width='100%' style={{'height': this.props.height-20,'padding':'10px'}}></img></div>);
                     firsttime = false;
                  }
               } else {
                  if(this.props.compareDate(pic['startAt'],pic['expiredAt'])){
                     carousel.push(<div key={pic.id} className='carousel-item'><img src={pic.filename} width='100%' style={{'height': this.props.height-20,'padding':'10px'}}></img></div>);
                  }
               }
            });
            this.setState({ carousel_items: carousel });
         })
         .catch((error) => {
            console.log(error);
         })
   }
   render() {
      return (
         <div className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner">
               {this.state.carousel_items}
            </div>
         </div>
      );
   }
}

export default Picture;