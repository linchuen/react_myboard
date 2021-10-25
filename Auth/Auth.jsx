import React, { Component } from 'react';
import Error403 from './Error403';
import FileController from '../manage/FileController';
import AdminPage from '../admin/AdminPage';

class Auth extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isAuthorized: true,
            username: 'Admin',
            role: 'USER',
            authpage: 'FileController'
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
                    this.setState({ isAuthorized: true, username: data['username'],role: data['role'] })
                } else {
                    this.setState({ isAuthorized: false });
                }
                console.log(data)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    componentDidUpdate() {
        if (this.props.authpage !== this.state.authpage) {
          this.setState({ authpage: this.props.authpage })
        }
      }

    render() {
        if (this.state.isAuthorized) {
            if(this.state.authpage=='FileController'){
                return <FileController username={this.state.username} />
            }
            else if(this.state.authpage=='AdminPage' && this.state.role=='ADMIN'){
                return <AdminPage username={this.state.username} />
            }else{
                return <Error403 />
            }
        } else {
            return <Error403 />
        }

    }
}

export default Auth;