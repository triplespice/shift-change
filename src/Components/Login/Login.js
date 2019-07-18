import React, { Component } from "react";
import "./Login.css";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      isValid: true
    };
  }

  handleForm = e => {
    e.preventDefault();
    let t = e.target;
    if (!t.email.value || !t.password.value) {
      this.setState({ isValid: false });
    } else {
      let returnedObj = {
        email: t.email.value,
        password: t.password.value
      };
      this.props.handleLogin(returnedObj);
      this.setState({ isValid: true });
      this.props.history.push("/");
    }
  };

  render() {
    return (
      <div className="Login">
        <div className="login-info-container">
          <div className="login-text-container">
            <h3>Fill out the form below!</h3>
            {!this.state.isValid && (
              <p className="login-error">fill out all the fields!</p>
            )}
          </div>
          <form className="login-form" onSubmit={this.handleForm}>
            Email:
            <input className="login-input" type="text" name="email" />
            Password:
            <input className="login-input" type="password" name="password" />
            <input className="submit" type="submit" value="Login" />
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
