import React, { Component } from "react";
import "./BuildAgenda.css";
import axios from "axios";
import AddLesson from "../AddLesson/AddLesson";

class BuildAgenda extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      lessons: this.props.lessons,
      isValid: true
    };
  }

  componentDidMount() {
    console.log(this.state.lessons);
    if (!this.props.isLoggedIn) {
      this.props.history.push("/login");
    }
  }

  handleForm = e => {
    e.preventDefault();
    console.log("e", e.target.lessonCheckbox);
    let array = [];
    for (let i = 0; i < e.target.lessonCheckbox.length; i++) {
      if (e.target.lessonCheckbox[i].checked === true) {
        array.push(e.target.lessonCheckbox[i].value);
      }
    }

    // to get which boxes were checked, loop through e.target.lessonChecbox
    // if e.target.lessonChecked[i].checked === true, add e.target.lessonChecked.value to some array
    // use that array in the req.body you pass in to the axios post request

    let t = e.target;
    if (
      !t.date.value ||
      !t.announcements.value ||
      !t.shoutOuts.value ||
      !t.tasks.value
      //   ||
      //   array.length === 0
    ) {
      this.setState({ isValid: false });
    } else {
      let returnedForm = {
        date: t.date.value,
        author: localStorage.userID,
        announcements: t.announcements.value,
        shoutOuts: t.shoutOuts.value,
        tasks: t.tasks.value
        // lesson: array
      };
      let url = "https://shift-change-api.herokuapp.com/api/lessons";
      console.log(returnedForm);
      axios
        .post(url, returnedForm, {
          headers: { Authorization: "bearer " + localStorage.token }
        })
        .then(res => console.log(res.data))
        .catch(err => console.log(err));
    }
    // this.props.history.push("/search/lessons");
  };

  render() {
    let topArray = [[], [], []];

    for (let i = 0; i < this.state.lessons.length; i++) {
      if (this.state.lessons[i].category == "Sales Techniques") {
        topArray[0].push(this.state.lessons[i]);
      } else if (this.state.lessons[i].category == "Customer Service") {
        topArray[1].push(this.state.lessons[i]);
      } else if (this.state.lessons[i].category == "Team Building Activity") {
        topArray[2].push(this.state.lessons[i]);
      }
    }
    console.log(topArray);

    var acc = document.getElementsByClassName("accordion");
    var i;
    console.log(acc);
    for (i = 0; i < acc.length; i++) {
      acc[i].addEventListener("click", function() {
        this.classList.toggle("active");
        var panel = this.nextElementSibling;
        if (panel.style.display === "block") {
          panel.style.display = "none";
        } else {
          panel.style.display = "block";
        }
      });
    }

    return (
      <div className="BuildAgenda">
        <form className="build-agenda-form" onSubmit={this.handleForm}>
          <div className="build-agenda-headers-container">
            <div className="build-agenda-header-container">
              <h2>Build a New Meeting Agenda</h2>

              {!this.state.isValid && (
                <p className="create-error">Fill Out All the Fields!</p>
              )}
            </div>
            <div className="choose-lesson-header">
              <h2>Add One or More Lessons</h2>
            </div>
            <div className="submit-header">
              <input className="submit" type="submit" value="Save Agenda" />
            </div>
          </div>

          <div className="form-container">
            <div className="left-form-container">
              Date:
              <input
                type="date"
                id="date"
                className="create-input"
                name="date"
              />
              Announcements:
              <textarea className="create-input" name="announcements" />
              ShoutOuts:
              <textarea className="create-input" name="shoutOuts" />
              Tasks:
              <textarea className="create-input" name="tasks" />
            </div>
            <div className="select-lesson-container">
              <div className="choose-lesson-list">
                {this.state.lessons
                  ? topArray.map((array, index) => {
                      return (
                        <div id="accordions" className={"category"}>
                          <a href="#" class="accordion" type="button">
                            <span>{array[0] ? array[0].category : ""}</span>
                          </a>

                          {/* <button
                            type="button"
                            class="accordion"
                          > */}
                          {/* </button> */}
                          <div class="panel">
                            {array.map(lesson => {
                              return (
                                <span className="listitem">
                                  <input
                                    type="checkbox"
                                    value={lesson._id}
                                    name="lessonCheckbox"
                                  />
                                  <label htmlFor="lessonCheckbox" value>
                                    {lesson.title}
                                  </label>
                                </span>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })
                  : ""}
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default BuildAgenda;
