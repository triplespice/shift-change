import React, { Component } from "react";
import { Link, Route } from "react-router-dom";
import "./Home.css";
import image from "./group11.png";

class Home extends Component {
  render() {
    return (
      <div className="Home">
        <div className="top">
          <div className="home-info-container">
            <div className="home-text-container">
              <span className="home-intro-title">
                Maximize
                <br />
                the Morning Meeting
              </span>
              <span className="home-intro-text">
                Access training lessons and build agendas
                <br />
                to get the most out of your retail staff and every work shift.
              </span>
            </div>
            <div className="home-buttons-container">
              <Link className="nav-buttons" to="/build-agenda">
                Build An Agenda Now
              </Link>
            </div>
          </div>
          <div className="hero-image">
            <img className="hero-image-image" src={image} alt="staff-meeting" />
          </div>
        </div>
        <div className="footer" />
      </div>
    );
  }
}

export default Home;
