import React, { Component } from 'react';

class Error403 extends Component {
    componentDidMount() {
        setTimeout(() => {
            window.location.replace('/login')
        }, 3000);
    }

    render() {
        return (
            <div className="forbidden" style={{ height: screen.availHeight }}>
                <h1>403</h1>
                <p>access not granted</p>
                <span className="support">
                    <a href="/login">redirect login in 3s</a>
                </span>
            </div>
        );
    }
}

export default Error403;