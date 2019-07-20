import React, { Component } from "react";
import "./AddLesson.css";
import logo from "../App/clipboard.png";
import axios from "axios";
import { Link } from "react-router-dom";
import Modal from "react-modal";

const customStyles = {
  content: {
    position: "absolute",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    height: "75%",
    width: "40%"
  }
};

class AddLesson extends Component {
  constructor() {
    super();
    this.state = {
      lessons: [],
      lessonObj: {},
      modalIsOpen: false
    };
  }

  handleClick = id => {
    if (this.props.type === "lessons") {
      this.props.history.push("/lessons/" + id);
    }
  };

  openModal = e => {
    this.setState({ modalIsOpen: true, currentLesson: e.target.innerText });
  };

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  };

  componentDidMount() {
    let url = "https://shift-change-api.herokuapp.com";

    axios
      .get(url + "/api/lessons/")
      .then(res => {
        console.log(res.data);
        this.setState({ lessons: res.data });
      })
      .catch(err => {
        console.log(err);
      });
  }

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
      <div className="Lessons">
        <div className="lessons-div-container">
          {this.state.lessons
            ? topArray.map((array, index) => {
                return (
                  <div className={"category"}>
                    <button class="accordion">
                      {array[0] ? array[0].category : ""}
                    </button>
                    <div class="panel">
                      {array.map(lesson => {
                        return (
                          <Link to={"/search/lessons/" + lesson._id}>
                            <div id="titles" className={lesson}>
                              {lesson.title}
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                );
              })
            : ""}
        </div>
        <Modal
          className="modal"
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          style={customStyles}
        >
          <span>Lesson:</span>
          {this.state.lessonObj.title && (
            <div className="lesson-details-text">
              {this.state.lessonObj.details}
            </div>
          )}
          <button className="submit" onClick={this.closeModal}>
            Add to Agenda
          </button>
          <button className="submit" onClick={this.closeModal}>
            Close
          </button>
        </Modal>
      </div>
    );
  }
}

export default AddLesson;
