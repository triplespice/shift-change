import React, { Component } from "react";
import "./User.css";
import axios from "axios";

class User extends Component {
  constructor() {
    super();
    this.state = {
      user: {}
    };
  }

  componentDidMount() {
    let url = "https://shift-change-api.herokuapp.com";
    let extension = localStorage.userID;
    axios
      .get(url + "/api/users/id" + extension)
      .then(res => this.setState({ user: res.data }))
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <div className="User">
        {this.state.user.firstName && (
          <div className="user-container">
            {this.state.user.firstName && (
              <div className="user-info-container">
                <div>
                  <h1>
                    {this.state.user.firstName} {this.state.user.lastName}
                  </h1>
                </div>
                <div>
                  <h3>{this.state.user.email}</h3>
                </div>
              </div>
            )}
            <div className="user-agendas-container">
              <div className="user-agendas-list">
                <h3 className="agenda-dates">Your Agendas:</h3>
                {this.state.user.myAgendas.map(user => {
                  return <div className="user-myAgendas-list">{user.date}</div>;
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default User;
