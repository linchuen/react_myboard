import React, { Component } from 'react';

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
          today: today.getFullYear()+'年'+(today.getMonth()+1)+'月'+today.getDate()+'日 '+today.getHours()+':'+today.getMinutes()+':'+today.getSeconds()
      }
      this.tick=this.tick.bind(this);
   }
    tick(){
        const today=new Date();
        this.setState({
            today: today.getFullYear()+'年'+(today.getMonth()+1)+'月'+today.getDate()+'日 '+today.getHours()+':'+today.getMinutes()+':'+today.getSeconds()
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
                        <img src='logo.png' width='150px'></img>
                </div>
                <div style={this.clock}>{this.state.today}</div>
            </div>
        </div>
    );
   }
            
}

export default Header;