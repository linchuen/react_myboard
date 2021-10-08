import React , { Component }from 'react';

class ControllList extends Component{
    constructor(props){
        super(props);
        this.state={}
     }

     render(){
         return(
            <ul className="list-group mb-3">
                <li className="list-group-item d-flex justify-content-between lh-sm">
                    <div className='eventbtn' onClick={()=>{this.props.handleClick('建立跑馬燈')}}>
                        <h6 className="my-0">Upload</h6>
                        <div className="text-muted">建立跑馬燈</div>
                    </div>
                </li>
                <li className="list-group-item d-flex justify-content-between lh-sm">
                    <div className='eventbtn' onClick={()=>{this.props.handleClick('上傳影片')}}>
                        <div className="text-muted">上傳影片</div>
                    </div>
                </li>
                <li className="list-group-item d-flex justify-content-between lh-sm">
                    <div className='eventbtn' onClick={()=>{this.props.handleClick('上傳圖片')}}>
                        <div className="text-muted">上傳圖片</div>
                    </div>
                </li>
                <li className="list-group-item d-flex justify-content-between lh-sm">
                    <div  className='eventbtn'onClick={()=>{this.props.handleClick('跑馬燈管理')}}>
                        <h6 className="my-0">File management</h6>
                        <div className="text-muted">跑馬燈管理</div>
                    </div>
                </li>
                <li className="list-group-item d-flex justify-content-between lh-sm">
                    <div className='eventbtn' onClick={()=>{this.props.handleClick('影片管理')}}>
                        <div className="text-muted">影片管理</div>
                    </div>
                </li>
                <li className="list-group-item d-flex justify-content-between lh-sm">
                    <div className='eventbtn' onClick={()=>{this.props.handleClick('圖片管理')}}>
                        <div className="text-muted">圖片管理</div>
                    </div>
                </li>
            </ul>
         )
     }

}
export default ControllList;