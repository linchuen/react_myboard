import React, { Component } from 'react';
import Header from '../Header';

class AdminPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userlist: []
        }
        this.deleteUser=this.deleteUser.bind(this);
    }

    deleteUser(id,email){
        fetch('/admin/'+email,{
            method: 'DELETE',
            headers: {'Authorization': 'Bearer '+window.localStorage.getItem('token')}
        })
        .then((response)=>response.text())
        .then(data=>{
            alert(data)
            document.getElementById(id).style.display='none'
        })
        .catch((error) => { console.log(error); })
    }

    componentDidMount() {
        fetch('/admin', {
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + window.localStorage.getItem('token') }
        })
            .then((response) => { return response.json() })
            .then((data) => {
                console.log(typeof (data), data);
                const list = []
                Object.values(data).forEach(item => {
                    list.push(
                        <a id={item['id']} className="list-group-item list-group-item-action d-flex gap-3 py-3" aria-current="true" onClick={()=>this.deleteUser(item['id'],item['email'])}>
                            <div style={{ writingMode: 'vertical-lr' }}>刪 除</div>
                            <div>
                                <h6 className="mb-0">使用者名稱:{item['username']}</h6>
                                <p className="mb-0 opacity-75">EMAIL:{item['email']}</p>
                                <p className="mb-0 opacity-75">使用者角色:{item['webUserRole']}</p>
                                <p className="mb-0 opacity-75">是否啟用:{item['enabled'].toString()}</p>
                            </div>
                        </a>)
                })
                this.setState({ userlist: list })
            })
            .catch((error) => { console.log(error); })
    }

    render() {
        return (
            <div className="container">
                <Header></Header>
                <div className="col-md-8 col-lg-10" style={{ marginTop: '20px' }}>
                    <h4 className="mb-3">Hi {this.props.username}管理者</h4>
                    <div className="list-group">
                        {this.state.userlist}
                    </div>
                </div>
            </div>

        );
    }
}

export default AdminPage;