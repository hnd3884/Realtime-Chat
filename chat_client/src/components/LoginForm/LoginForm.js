import React, { Component } from 'react';
import '../../styles/LoginForm.css';

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: ""
        }
    }

    ChangeUserName(event) {
        this.setState({ username: event.target.value });
    }

    ChangePassword(event) {
        this.setState({ password: event.target.value });
    }

    render() {
        return (
            <div>
                <div className="sidenav">
                    <div className="login-main-text">
                        <h2>RealTimeChat<br /> Login Page</h2>
                        <p>Login or register from here to access.</p>
                    </div>
                </div>
                <div className="main">
                    <div className="col-md-6 col-sm-12">
                        <div className="login-form">
                            <form>
                                <div className="form-group">
                                    <label>User Name</label>
                                    <input type="text" className="form-control"
                                        onChange={this.ChangeUserName.bind(this)} placeholder="User Name" />
                                </div>
                                <div className="form-group">
                                    <label>Password</label>
                                    <input type="password" className="form-control"
                                        onChange={this.ChangePassword.bind(this)} placeholder="Password" />
                                </div>
                                <button type="submit" className="btn btn-black"
                                    onClick={(e) => this.props.login(e, this.state.username, this.state.password)}>
                                        Login
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default LoginForm;
