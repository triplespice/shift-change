import React, { Component } from "react";
import "./Lessons.css";
import logo from "../App/clipboard.png";
import { create } from "istanbul-reports";
import axios from "axios";
import { Link } from "react-router-dom";

class Lessons extends Component {
  constructor() {
    super();
    this.state = {
      lessons: []
    };
  }

  handleClick = id => {
    if (this.props.type === "lessons") {
      this.props.history.push("/lessons/" + id);
    }
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

  //   go through list
  //   every caetgory you find push into array
  //   array of arrays and every index is an array of one caetgory

  //   if category a b or c  push to one specific arry in that array of arrays
  //   then map through top array
  //   and map through each one and create

  //   get if from backend store in state
  //   array is this.state.array
  //   // 7

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

    return (
      <div className="Lessons">
        <div className="lessons-div-container">
          {this.state.lessons
            ? topArray.map((array, index) => {
                return (
                  <div className={"category"}>
                    <h2>{array[0] ? array[0].category : ""}</h2>
                    {array.map(lesson => {
                      return (
                        <Link to={"/search/lessons/" + lesson._id}>
                          <div className={lesson}>{lesson.title}</div>
                        </Link>
                      );
                    })}
                  </div>
                );
              })
            : ""}
          {/* {this.props.data.map((data, index) => {
            if (this.props.type === "lessons") {
              if (data.hidden === false) {
                return (
                  <div
                    onClick={() => this.handleClick(data._id)}
                    className="lessons-div-lesson"
                    key={index}
                  >
                    <span className="lessons-lesson-caption">{data.title}</span>
                  </div>
                );
              }
            }
          })} */}
        </div>
      </div>
    );
  }
}

export default Lessons;
