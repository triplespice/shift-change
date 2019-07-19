import React, { Component } from "react";
import "./BuildAgenda.css";
import axios from "axios";

class BuildAgenda extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      lessons: props.lesssons,
      isValid: true
    };
  }

  componentDidMount() {
    if (!this.props.isLoggedIn) {
      this.props.history.push("/login");
    }
  }

  handleForm = e => {
    e.preventDefault();
    let t = e.target;
    if (
      !t.date.value ||
      !t.announcements.value ||
      !t.shoutOuts.value ||
      !t.tasks.value ||
      !t.lessonlist.value
    ) {
      this.setState({ isValid: false });
    } else {
      let returnedForm = {
        date: t.date.value,
        author: localStorage.userID,
        announcements: t.announcements.value,
        shoutOuts: t.shoutOuts.value,
        tasks: t.tasks.value,
        lesson: t.lessonlist.value
      };
      let url = "https://shift-change-api.herokuapp.com/api/lessons";

      axios
        .post(url, returnedForm, {
          headers: { Authorization: "bearer " + localStorage.token }
        })
        .catch(err => console.log(err));
    }
    this.props.history.push("/search/lessons");
  };

  render() {
    return (
      <div className="BuildAgenda">
        <div className="build-agenda-container">
          <div className="build-agenda-header-container">
            <h2>Build a New Meeting Agenda</h2>
            <h3>Fill Out the Form Below</h3>
            {!this.state.isValid && (
              <p className="create-error">Fill Out All the Fields!</p>
            )}
          </div>
          <form className="build-agenda-form" onSubmit={this.handleForm}>
            Date:
            <input type="text" className="create-input" name="date" />
            Announcements:
            <textarea className="create-input" name="announcements" />
            ShoutOuts:
            <textarea className="create-input" name="shoutOuts" />
            Tasks:
            <textarea className="create-input" name="tasks" />
            Lesson:
            <textarea className="create-input" name="lesson" />
          </form>
        </div>
        <div className="select-lesson-container" />
        <div className="choose-lesson-header">
          <h2>Choose a Lesson to Add to Your Agenda</h2>
        </div>
        <div className="choose-lesson-list" />
      </div>
    );
  }
}

export default BuildAgenda;
