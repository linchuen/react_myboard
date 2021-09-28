import React, { Component } from 'react';

class Picture extends Component {
   constructor(props){
      super(props);
      this.state={
         carousel_items:[]
      }
   }

   componentDidMount() {
      fetch('/picture', {
         method: 'GET'
      })
       .then((response) => {
        return response.json()
     })
      .then((data) => {
         let firsttime=true;
         const  carousel=[];
         Object.values(data).forEach(pic => {
            if(firsttime){
               carousel.push(<div className='carousel-item active'><img key={pic.id} src={pic.filename} width='100%' height='820px'></img></div>);
               firsttime=false;
            }else{
               carousel.push(<div className='carousel-item'><img key={pic.id} src={pic.filename} width='100%' height='820px'></img></div>);
            }
         });
         this.setState({
            carousel_items:carousel
         });
    })
    .catch((error) => {
      console.log(error);
    })
 }
  render() {
    const piclist=this.piclist;

   return(
            <div className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-inner">
                    {this.state.carousel_items}
                </div>
            </div>
            );
    }
}

export default Picture;