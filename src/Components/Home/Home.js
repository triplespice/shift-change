import React, { Component } from "react";
import { Link, Route } from "react-router-dom";
import "./Home.css";

class Home extends Component {
  render() {
    return (
      <div className="Home">
        <div className="home-info-container">
          <div className="home-text-container">
            <span className="home-intro-title">
              Maximize the Morning Meeting
            </span>
            <span className="home-intro-text">
              Access training lessons, build agendas, and get the most out of
              your retail staff.
            </span>
          </div>
        </div>
        <div className="home-buttons-container">
          <Link className="nav-buttons" to="/build-agenda">
            Build An Agenda Now
          </Link>
        </div>
      </div>
    );
  }
}

export default Home;
