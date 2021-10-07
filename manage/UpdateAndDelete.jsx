import React, { Component } from 'react';
import DateTimePicker from 'react-datetime-picker';
import 'react-datetime-picker/dist/DateTimePicker.css';
var classNames = require('classnames');
import { Accordion } from 'react-bootstrap';

class Item extends Component {
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
            enabled: this.props.enabled,
            deleted: false
        })
        this.typeMap = new Map();
        this.typeMap.set('跑馬燈管理', 'text');
        this.typeMap.set('圖片管理', 'picture');
        this.typeMap.set('影片管理', 'video');
        this.timeFormat = this.timeFormat.bind(this);
        this.updateItem = this.updateItem.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
    }
    updateItem(id) {
        fetch('/' + this.typeMap.get(this.props.type) + '/' + id, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' ,'Authorization': 'Bearer '+ window.localStorage.getItem('token')},
            body: JSON.stringify({ 'filename': this.state.newFilename, 'startAt': this.state.newStartAt, 'expiredAt': this.state.newExpiredAt, 'enabled': this.state.enabled })
        })
            .then(res => res.json())
            .then((data) => {
                alert(data['id'] + '成功更新');
                this.setState({
                    filename: this.state.newFilename,
                    startAt: this.state.newStartAt,
                    expiredAt: this.state.newExpiredAt,
                    enabled: this.state.enabled
                })
            })
            .catch(error => {alert(error);console.log(error)})
    }

    deleteItem(id) {
        fetch('/' + this.typeMap.get(this.props.type) + '/' + id, {
            method: 'DELETE',
            headers: {'Authorization': 'Bearer '+ window.localStorage.getItem('token')}
        })
            .then(res => res.json())
            .then((data) => { alert(id + '成功刪除');this.setState({ deleted: true }) })
            .catch(error => {alert(error);console.log(error)})
        
    }

    timeFormat(DateObject) {
        return DateObject.getFullYear() + '/' + (DateObject.getMonth()+1) + '/' + DateObject.getDate() + ' ' + DateObject.getHours() + ':' + DateObject.getMinutes() + ':' + DateObject.getSeconds()
    }

    render() {
        let formClass = classNames({ 'needs-validation': true, 'd_none': this.state.deleted });
        return (
            <form className={formClass} noValidate onSubmit={(e) => { e.preventDefault(); }}>
                <div className="row g-3">
                    <Accordion>
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>
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
                            </Accordion.Header>
                            <Accordion.Body>
                                    <div className="col-12 d_inlineblock">
                                        <label className="form-label">檔案名稱</label>
                                        <div className="input-group has-validation">
                                            <input type="text" className="form-control" value={this.state.newFilename} onChange={(event) => { this.setState({ newFilename: event.target.value }) }}></input>
                                            <div className="invalid-feedback">Your username is required.</div>
                                        </div>
                                    </div>

                                    <div className="col-6 d_inlineblock">
                                        <label className="form-label">開始時間</label>
                                        <DateTimePicker className='bg-w' value={new Date(this.state.newStartAt)} onChange={(value) => { this.setState({ newStartAt: new Date(value) }) }} />
                                    </div>

                                    <div className="col-6 d_inlineblock">
                                        <label className="form-label">結束時間</label>
                                        <DateTimePicker className='bg-w' value={new Date(this.state.newExpiredAt)} onChange={(value) => { this.setState({ newExpiredAt: new Date(value) }) }} />
                                    </div>

                                    <div className="col-sm-2 d_inlineblock">
                                        <input type="checkbox" checked={this.state.enabled ? 'checked' : ''} onChange={(event) => { this.setState({ enabled: event.target.checked }) }}></input>
                                        <label className="form-label">啟用</label>
                                    </div>
                                    <div className="col-sm-2 offset-sm-6 d_inlineblock">
                                        <button className="btn btn-primary btn-lg left-50" type="submit" onClick={() => this.updateItem(this.state.id)} >更新</button>
                                    </div>
                                    <div className="col-sm-2 d_inlineblock">
                                        <button className="btn btn-primary btn-lg left-50" type="submit" onClick={() => this.deleteItem(this.state.id)}>刪除</button>
                                    </div>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </div>
            </form>
        );
    }
}


class UpdateAndDelete extends Component {
    constructor(props) {
        super(props)
        this.state = ({
            list: [],
            type: this.props.type,
        })
        this.typeMap = new Map();
        this.typeMap.set('跑馬燈管理', 'text');
        this.typeMap.set('圖片管理', 'picture');
        this.typeMap.set('影片管理', 'video');
    }

    componentDidMount() {
        const type = this.typeMap.get(this.props.type)
        fetch('/' + type + '/all', { method: 'GET' })
            .then((response) => { return response.json() })
            .then((data) => {
                console.log(typeof (data), data);
                const list = []
                Object.values(data).forEach(item => {
                    list.push(<Item id={item['id']} key={item['id']} filename={item['filename']} enabled={item['enabled']}
                        startAt={new Date(item['startAt'])} expiredAt={new Date(item['expiredAt'])} type={this.props.type}></Item>)
                });
                this.setState({ list: list })
            })
            .catch((error) => { console.log(error); })
    }

    componentDidUpdate() {
        const type = this.typeMap.get(this.props.type)
        if (this.props.type !== this.state.type) {
            this.setState({ type: this.props.type })
            fetch('/' + type + '/all', { method: 'GET' })
                .then((response) => { return response.json() })
                .then((data) => {
                    console.log(typeof (data), data);
                    const list = []
                    Object.values(data).forEach(item => {
                        list.push(<Item id={item['id']} key={item['id']} filename={item['filename']} enabled={item['enabled']}
                            startAt={new Date(item['startAt'])} expiredAt={new Date(item['expiredAt'])} type={this.props.type}></Item>)
                    });
                    this.setState({ list: list })
                })
                .catch((error) => { console.log(error); })
        }
    }

    render() {
        return (
            <div>
                <label className="form-label font30">{this.state.type}</label>
                {this.state.list}
            </div>
        )
    }
}
export default UpdateAndDelete