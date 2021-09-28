import React, { Component } from 'react';
import DateTimePicker from 'react-datetime-picker';
import 'react-datetime-picker/dist/DateTimePicker.css';

class Item extends Component{
    constructor(props) {
        super(props)
        this.state = ({
            id: this.props.id,
            filename: this.props.filename,
            startAt: this.props.startAt,
            expiredAt: this.props.expiredAt,
            newFilename: this.props.filename,
            newStartAt: this.props.startAt,
            newExpiredAt: this.props.expiredAt,
        })
        this.typeMap = new Map();
        this.typeMap.set('跑馬燈管理', 'text');
        this.typeMap.set('圖片管理', 'picture');
        this.typeMap.set('影片管理','video');
        console.log(this.typeMap);
        this.timeFormat=this.timeFormat.bind(this);
        this.updateItem=this.updateItem.bind(this);
        this.deleteItem=this.deleteItem.bind(this);
    }
    updateItem(id){
        console.log(this.props.type);
        fetch('/'+this.typeMap.get(this.props.type)+'/'+id,{
            method:'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 'text': this.state.newFilename, 'startAt': this.state.newStartAt, 'expiredAt': this.state.newExpiredAt })
        })
        .then(res=>res.json)
        .then((data)=>{
            alert(data['id']+' update successfully');
            this.setState({
                filename: this.state.newFilename, 
                startAt: this.state.newStartAt, 
                expiredAt: this.state.newExpiredAt})})
        .catch(error=>console.log(error))
    }

    deleteItem(id){
        fetch('/'+this.typeMap.get(this.props.type)+'/'+id,{
            method:'DELETE',
        })
        .then(res=>res.json)
        .then((data)=>{alert(id+' delete successfully')})
        .catch(error=>console.log(error))
    }

    timeFormat(DateObject){
        return DateObject.getFullYear()+'/'+DateObject.getMonth()+'/'+DateObject.getDate()+' '+DateObject.getHours()+':'+DateObject.getMinutes()+':'+DateObject.getSeconds()
    }

    render(){
        return (
            <form className="needs-validation" noValidate>
                <div className="row g-3">
                    <div className="col-12">
                        <label className="form-label">ID:{this.state.id}</label>
                        <table width='100%'>
                            <thead>
                                <tr>
                                    <th>檔案名稱</th>
                                    <th>開始日期</th>
                                    <th>結束日期</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        {this.state.filename}
                                    </td>
                                    <td>
                                        {this.timeFormat(this.state.startAt)}
                                    </td>
                                    <td>
                                        {this.timeFormat(this.state.expiredAt)}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="col-12">
                        <label className="form-label">檔案名稱</label>
                        <div className="input-group has-validation">
                            <input type="text" className="form-control" value={this.state.newFilename} onChange={(event) => { this.setState({ newFilename : event.target.value })}}></input>
                            <div className="invalid-feedback">Your username is required.</div>
                        </div>
                    </div>

                    <div className="col-sm-6">
                        <label className="form-label">開始時間</label>
                        <DateTimePicker className='bg-w' value={new Date(this.state.newStartAt)} onChange={(value) => { this.setState({ newStartAt : new Date(value) }) }} />
                        <div className="invalid-feedback">Valid first name is required.</div>
                    </div>

                    <div className="col-sm-6">
                        <label className="form-label">結束時間</label>
                        <DateTimePicker className='bg-w' value={new Date(this.state.newExpiredAt)} onChange={(value) => { this.setState({ newExpiredAt : new Date(value) }) }} />
                        <div className="invalid-feedback">Valid last name is required.</div>
                    </div>
                </div>
                <button className="btn btn-primary btn-lg" onClick={()=>this.updateItem(this.state.id)} >更新</button>
                <button className="btn btn-primary btn-lg" onClick={()=>this.deleteItem(this.state.id)}>刪除</button>
            </form>
        );
    }
}


class UpdateAndDelete extends Component {
    constructor(props) {
        super(props)
        this.state = ({
            list: [],
        })
    }

    componentDidMount() {
        fetch('/text', { method: 'GET' })
            .then((response) => { return response.json() })
            .then((data) => {
                console.log(typeof (data), data);
                const list = []
                Object.values(data).forEach(text => {
                    list.push(<Item id={text['id']} key={text['id']} filename={text['text']} 
                    startAt={new Date(text['startAt'])} expiredAt={new Date(text['expiredAt'])} type={this.props.type}></Item>)
                });
                this.setState({ list: list })
            })
            .catch((error) => {console.log(error);})
    }

    render() {
        return (
            <div>
                {this.state.list}
            </div>
        )
    }
}
export default UpdateAndDelete