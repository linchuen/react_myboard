import React, { Component } from 'react';
import './login.css';
import bootstraplogo from './bootstrap-logo.svg';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        }
        this.handleSignin = this.handleSignin.bind(this)
    }
    handleSignin(e) {
        fetch('/auth', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ username: this.state.username, password: this.state.password }) })
            .then((res) => { return res.json() })
            .then((data) => {
                console.log(data['token'])
                window.localStorage.setItem('token',data['token'])
                window.location.replace('/')
            })
            .catch((error) => { alert(error); console.log(error) })
        e.preventDefault()
        e.stopPropagation()
    }
    render() {
        return (
            <div className="form-signin text-center pos-r">
                <form className="center" style={{ top: '150px' }} onSubmit={this.handleSignin}>
                    <img className="mb-4" src={bootstraplogo} alt="" width="72" height="57"></img>
                    <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

                    <div className="form-floating">
                        <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" value={this.state.username} onChange={(e) => this.setState({ username: e.target.value })}></input>
                        <label style={{ color: 'black' }}>Email address</label>
                    </div>
                    <div className="form-floating">
                        <input type="password" className="form-control" id="floatingPassword" placeholder="Password" value={this.state.password} onChange={(e) => this.setState({ password: e.target.value })}></input>
                        <label style={{ color: 'black' }}>Password</label>
                    </div>

                    <div className="checkbox mb-3">
                        <label>
                            <a href='/signup' className="form-label"> I wanna sign up!!</a>
                        </label>
                    </div>
                    <button className="w-100 btn btn-lg btn-primary" type="submit" >Sign in</button>
                    <p className="mt-5 mb-3 text-muted" style={{ color: '#D9D9D9' }}>&copy; 2017–2021</p>
                </form>
            </div>
        )
    }
}
export default Login;