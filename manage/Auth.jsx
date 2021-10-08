import React, { Component } from 'react';
import Error403 from './Error403';
import FileController from './FileController';

class Auth extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isAuthorized: true,
            username: 'Admin'
        }
    }

    componentDidMount() {
        fetch('/auth/parse', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token: window.localStorage.getItem('token') })
        })
            .then(res => res.json())
            .then((data) => {
                if (data['username']) {
                    this.setState({ isAuthorized: true, username: data['username'] })
                } else {
                    this.setState({ isAuthorized: false });
                }
                console.log(data)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    render() {
        if (this.state.isAuthorized) {
            return <FileController username={this.state.username} />
        } else {
            return <Error403 />
        }

    }
}

export default Auth;