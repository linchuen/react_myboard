import React, { Component } from 'react';
import './login.css';
import bootstraplogo from './bootstrap-logo.svg';

class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email:'',
            password: '',
            retypepassword:''
        }
        this.handleSignup = this.handleSignup.bind(this)
    }
    handleSignup(e) {
        if(this.state.password===this.state.retypepassword){
            fetch('/register', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ username: this.state.username,email: this.state.email, password: this.state.password }) })
            .then((res) => { return res.text() })
            .then((data) => {
                alert(data)
                window.location.replace('/')
            })
            .catch((error) => { alert(error); console.log(error) })
        }else{
            alert('請確認密碼是否輸入正確')
        }
        e.preventDefault()
        e.stopPropagation()
    }
    render() {
        return (
            <div className="form-signin text-center pos-r">
                <form className="center needs-validation" style={{ top: '150px' }} onSubmit={this.handleSignup}>
                    <img className="mb-4" src={bootstraplogo} alt="" width="72" height="57"></img>
                    <h1 className="h3 mb-3 fw-normal">Welcome to join us~</h1>

                    <div className={'form-floating '+(this.state.username!=''?'was-validated':'')+' has-validation'}>
                        <input type="text" className="form-control" placeholder="user" value={this.state.username} onChange={(e) => this.setState({ username: e.target.value })} required></input>
                        <label style={{ color: 'black' }}>User Name</label>
                    </div>
                    <div className={'form-floating '+(this.state.email!=''?'was-validated':'')+' has-validation'}style={{marginTop:'10px'}}>
                        <input type="email" className="form-control" placeholder="name@example.com" value={this.state.email} onChange={(e) => this.setState({ email: e.target.value })} required pattern='^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$'></input>
                        <label style={{ color: 'black' }}>Email address</label>
                    </div>
                    <div className={'form-floating '+(this.state.password!=''?'was-validated':'')+' has-validation'}style={{marginTop:'10px'}}>
                        <input type="password" className="form-control"  placeholder="Password" value={this.state.password} onChange={(e) => this.setState({ password: e.target.value })} required pattern='[A-Za-z0-9]{6,}'></input>
                        <label style={{ color: 'black' }}>Password</label>
                    </div>
                    <div className={'form-floating '+(this.state.retypepassword!=''?'was-validated':'')+' has-validation'} style={{marginTop:'10px'}}>
                        <input type="password" className="form-control"  placeholder="Password" value={this.state.retypepassword} onChange={(e) => this.setState({ retypepassword: e.target.value })} required  pattern='[A-Za-z0-9]{6,}'></input>
                        <label style={{ color: 'black' }}>Retype Password</label>
                    </div>

                    <button className="w-100 btn btn-lg btn-primary" type="submit" >Confirm</button>
                    <p className="mt-5 mb-3 text-muted" style={{ color: '#D9D9D9' }}>&copy; 2017–2021</p>
                </form>
            </div>
        )
    }
}
export default Signup;