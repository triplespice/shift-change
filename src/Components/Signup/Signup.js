import React, { Component } from "react";
import "./Signup.css";

class Signup extends Component {
  constructor() {
    super();
    this.state = {
      isValid: true,
      text: ""
    };
  }

  handleForm = e => {
    e.preventDefault();

    let t = e.target;
    if (
      !t.firstName.value ||
      !t.lastName.value ||
      !t.email.value ||
      !t.password.value ||
      !t.passwordConfirm.value
    ) {
      this.setState({ isValid: false });
    } else {
      let returnedObj = {
        firstName: t.firstName.value,
        lastName: t.lastName.value,
        email: t.email.value,
        password: t.password.value
      };
      this.props.handleSignup(returnedObj);
      this.setState({ isValid: true });
      this.props.history.push("/login");
    }
  };

  render() {
    return (
      <div className="Signup">
        <div className="signup-info-container">
          <div className="signup-text-container">
            <h3>Fill out the form below!</h3>
            {!this.state.isValid && (
              <p className="signup-error">fill out all the fields!</p>
            )}
          </div>
          <form onSubmit={this.handleForm} className="signup-form">
            First Name:
            <input className="signup-input" type="text" name="firstName" />
            Last Name:
            <input className="signup-input" type="text" name="lastName" />
            Email:
            <input className="signup-input" type="text" name="email" />
            Password:
            <input className="signup-input" type="password" name="password" />
            Confirm Password:
            <input
              className="signup-input"
              type="password"
              name="passwordConfirm"
            />
            <input type="submit" className="submit" value="Signup" />
          </form>
        </div>
      </div>
    );
  }
}

export default Signup;
