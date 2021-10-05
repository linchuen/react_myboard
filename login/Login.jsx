import React, { Component } from 'react';
import './signin.css';
import bootstraplogo from './bootstrap-logo.svg';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <div class="form-signin text-center pos-r">
                <form class="center" style={{top:'150px'}}>
                    <img class="mb-4" src={bootstraplogo} alt="" width="72" height="57"></img>
                    <h1 class="h3 mb-3 fw-normal">Please sign in</h1>

                    <div class="form-floating">
                        <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com"></input>
                        <label style={{color:'black'}}>Email address</label>
                    </div>
                    <div class="form-floating">
                        <input type="password" class="form-control" id="floatingPassword" placeholder="Password"></input>
                        <label style={{color:'black'}}>Password</label>
                    </div>

                    <div class="checkbox mb-3">
                        <label>
                            <input type="checkbox" value="remember-me"></input>
                            <label className="form-label"> Remember me</label>
                        </label>
                    </div>
                    <button class="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
                    <p class="mt-5 mb-3 text-muted" style={{color:'#D9D9D9'}}>&copy; 2017–2021</p>
                </form>
            </div>
        )
    }
}
export default Login;