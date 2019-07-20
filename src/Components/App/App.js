import React, { Component } from "react";
import { Link, Route, Switch } from "react-router-dom";
import "./App.css";
import logo from "./clipboard.png";
import Home from "../Home/Home";
import Lessons from "../Lessons/Lessons";
import ViewLesson from "../ViewLesson/ViewLesson";
import BuildAgenda from "../BuildAgenda/BuildAgenda";
import Agendas from "../Agendas/Agendas";
import ViewAgenda from "../ViewAgenda/ViewAgenda";
import SubmitLesson from "../SubmitLesson/SubmitLesson";
import Login from "../Login/Login";
import Signup from "../Signup/Signup";
import User from "../User/User";
import axios from "axios";
// import Search from "../Search/Search";

import { runInContext } from "vm";

let url = "https://shift-change-api.herokuapp.com";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lessons: [],
      agendas: [],
      userID: localStorage.userID,
      isLoggedIn: false,
      name: localStorage.name
    };
  }
  componentDidMount() {
    if (localStorage.token) {
      this.setState({ isLoggedIn: true });
    }

    axios
      .get(url + "/api/lessons")
      .then(res => {
        this.setState({ lessons: res.data });
      })
      .catch(err => {
        console.log(err);
      });
  }

  handleSignup = obj => {
    axios
      .post(url + "/api/users/signup", obj)
      .then(res => {
        localStorage.token = res.data.token;
        localStorage.userID = res.data.userID;
        this.setState({
          userID: res.data.userID,
          name: res.data.name
        });
      })
      .then(_ => {});
  };

  handleLogin = obj => {
    axios
      .post(url + "/api/users/login", obj)
      .then(res => {
        localStorage.token = res.data.token;
        localStorage.userID = res.data.userID;
        localStorage.name = res.data.name;
        this.setState({
          isLoggedIn: true,
          userID: res.data.userID,
          name: res.data.name
        });
      })
      .catch(err => console.log(err));
  };

  handleLogout = e => {
    e.preventDefault();
    this.setState({
      isLoggedIn: false,
      userID: ""
    });
    localStorage.clear();
    this.props.history.push("/");
  };

  render() {
    return (
      <div className="App">
        <nav className="nav-bar">
          <div className="nav-logo-container">
            <Link to="/">
              <img src={logo} alt="Logo" className="nav-logo" />
            </Link>
            <Link to="/">
              <span className="title">ShiftChange</span>
            </Link>
          </div>
          <div className="nav-buttons-container">
            <Link
              to={this.state.isLoggedIn ? "/build-agenda" : "/login"}
              className="nav-links"
            >
              Build Agenda
            </Link>
            <Link to="/search/agendas" className="nav-links">
              View Agendas
            </Link>
            <Link to="/search/lessons" className="nav-links">
              Lessons
            </Link>
            <Link
              to={this.state.isLoggedIn ? "/submit-lesson" : "/login"}
              className="nav-links"
            >
              Submit Lesson
            </Link>

            {!this.state.isLoggedIn && (
              <Link to="/login" className="nav-buttons">
                Login
              </Link>
            )}
            {!this.state.isLoggedIn && (
              <Link to="/signup" className="nav-buttons">
                Signup
              </Link>
            )}
            {this.state.isLoggedIn && (
              <Link to={"/user/" + localStorage.userID}>
                <span className="nav-greeting">
                  {"Hello, " + this.state.name}
                </span>
              </Link>
            )}
            {this.state.isLoggedIn && (
              <Link onClick={this.handleLogout} to="/" className="nav-buttons">
                Logout
              </Link>
            )}
          </div>
        </nav>
        <Switch>
          {this.state.lessons.length !== 0 && (
            <Route
              path="/"
              exact
              render={props => <Home lessons={this.state.lessons} {...props} />}
            />
          )}
          {/* <Route
            path="/search/agendas"
            exact
            render={props => (
              <Search data={this.state.agendas} type="agendas" {...props} />
            )}
          />
          <Route
            path="/search/lessons"
            exact
            render={props => (
              <Search data={this.state.lesssons} type="lessons" {...props} />
            )}
          /> */}
          <Route
            path="/build-agenda"
            exact
            render={props => (
              <BuildAgenda
                agendas={this.state.agendas}
                {...props}
                isLoggedIn={this.state.isLoggedIn}
              />
            )}
          />
          <Route
            path="/search/lessons"
            exact
            render={props => <Lessons {...props} />}
          />
          <Route
            path="/search/lessons/:id"
            exact
            render={props => <ViewLesson {...props} />}
          />
          <Route
            path="/search/agendas/"
            exact
            render={props => (
              <Agendas
                lessons={this.state.lessons}
                isLoggedIn={this.state.isLoggedIn}
                {...props}
              />
            )}
          />
          <Route path="/agendas/:id" exact component={Agendas} />
          <Route
            path="/submit-lesson"
            exact
            render={props => <SubmitLesson {...props} />}
          />
          <Route
            path="/login"
            exact
            render={props => (
              <Login
                handleLogin={this.handleLogin}
                isLoggedIn={this.state.isLoggedIn}
                {...props}
              />
            )}
          />
          <Route
            path="/signup"
            exact
            render={props => (
              <Signup handleSignup={this.handleSignup} {...props} />
            )}
          />
          <Route
            path="/submit-lesson"
            exact
            render={props => <SubmitLesson {...props} />}
          />
          <Route
            path="/login"
            exact
            render={props => (
              <Login
                handleLogin={this.handleLogin}
                isLoggedIn={this.state.isLoggedIn}
                {...props}
              />
            )}
          />
          <Route
            path="/signup"
            exact
            render={props => (
              <Signup handleSignup={this.handleSignup} {...props} />
            )}
          />
          {this.state.lessons.length !== 0 && (
            <Route
              path="/"
              exact
              render={props => <Home lessons={this.state.lessons} {...props} />}
            />
          )}
          <Route
            path="/user/:id"
            exact
            render={props => (
              <User
                games={this.state.userID}
                {...props}
                isLoggedIn={this.state.isLoggedIn}
              />
            )}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
