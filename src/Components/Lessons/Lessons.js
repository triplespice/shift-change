import React, { Component } from "react";
import "./Lessons.css";
import logo from "../App/clipboard.png";
import { create } from "istanbul-reports";
import axios from "axios";

class Lessons extends Component {
  handleClick = id => {
    if (this.props.type === "lessons") {
      this.props.history.push("/lessons/" + id);
    }
  };

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
    //     let topArray = [[], [], []];

    //     for (let i = 0; i < array.length; i++) {
    //       if (array[i].category == "Sales Techniques") {
    //         topArray[0].push(array[i]);
    //       } else if (array[i].category == "Customer Service") {
    //         topArray[1].push(array[i]);
    //       } else if (array[i].category == "Team Building Activity") {
    //         topArray[2].push(array[i]);
    //       }
    //     }

    // toparray.map((arrays, index) => {
    //   return (<div className={'category'}>
    //     <h2>{arrays[0].category}</h2>
    //   {arrays.map(lessons => {
    //     return <div className={lesson}>lessons.title<div>
    //   })}</div>)
    // })

    return (
      <div className="Lessons">
        <div className="lessons-div-container">
          {this.props.data.map((data, index) => {
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
          })}
        </div>
      </div>
    );
  }
}

export default Lessons;
