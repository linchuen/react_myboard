import React, { Component } from 'react';
import logo from './logo.svg';

class Header extends Component {
    logobackground = {
		width: '210px',
		height: '125px',
        padding:'30px'
	};
    clock = {
		position: 'absolute',
        top: '30px',
        right: '30px',
        fontSize:'50px'
	};
   constructor(props){
      super(props);
      const today=new Date();
      this.state={
          today: today.toLocaleString()
      }
      this.tick=this.tick.bind(this);
   }
    tick(){
        const today=new Date();
        this.setState({
            today: today.toLocaleString()
        });
    }

   componentDidMount() {
       this.timerID=setInterval(this.tick,1000);
   }
   componentWillUnmount() {
       clearInterval(this.timerID);
  }
   
   render() {
    return(
        <div className="container" >
            <div className="mb-auto">
                <div style={this.logobackground}>
                    <a href='/'><img src="./logo.png" width='150px'></img></a>
                </div>
                <div style={this.clock} onClick={()=>window.location.replace('/manage')}>{this.state.today}</div>
            </div>
        </div>
    );
   }
            
}

export default Header;